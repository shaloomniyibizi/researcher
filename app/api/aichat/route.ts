import db from "@/lib/db";
import { projectIndex } from "@/lib/newPinecone";
import openai, { getEmbeddings } from "@/lib/openai";
import { currentUser } from "@/lib/userAuth";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesTruncated = messages.slice(-6);

    const embedding = await getEmbeddings(
      messagesTruncated.map((message) => message.content).join("\n"),
    );
    const user = await currentUser();
    const userId = user?.id!;
    const vectorQueryResponse = await projectIndex.query({
      vector: embedding,
      topK: 4,
      filter: { userId },
    });

    const relativeProjects = await db.project.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });
    console.log("Relavante project found:", relativeProjects);

    const systemMessage: ChatCompletionMessage = {
      role: "assistant",
      content:
        "You are intelligent for answering quetion to the project. you answer the user's question based on the existing project" +
        "The relavante project for this query are:\n" +
        relativeProjects
          .map(
            (project) =>
              `Title: ${project.title}\n\nDescription:\n${project.description}`,
          )
          .join("\n\n"),
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messagesTruncated],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
