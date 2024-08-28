import db from "@/lib/db";
import { projectIndex } from "@/lib/newPinecone";
import openai, { getEmbeddings } from "@/lib/openai";
import { currentUser } from "@/lib/userAuth";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id!;
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesTruncated = messages.slice(-6);

    const lastMessage = messages[messages.length - 1];

    const embedding = await getEmbeddings(
      messagesTruncated.map((message) => message.content).join("\n"),
    );

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
      content:
        "You are an intelligent project-store app. you answer the user's question based on their existing projects" +
        "the existing projects:\n" +
        relativeProjects
          .map(
            (project) =>
              `Title: ${project.title}\n\nDescription:\n${project.description}\n\nProblemStatement:\n${project.challenges}\n\nPossibleSolution:\n${project.results}\n\nObjectives:\n${project.objective}\n\nMethodology:\n${project.methodology}\n\nTechnologies:\n${project.technologies}`,
          )
          .join("\n\n"),

      // `You're an AI assistant who answers questions about provided content.
      // You're a chat bot, so keep your replies succinct.
      // You're only allowed to use the content below to answer the question.
      // If the question isn't related to content, say:
      // "Sorry, I can't find information! ansk any question that related to the stored projects."
      // If the information isn't available in the below projects, say:
      // "Sorry, I couldn't find any information in all projects."
      // Do not go off topic.
      // content:\n\n
      // ${relativeProjects
      //   .map(
      //     (project) =>
      //       `Title: ${project.title}\n\nDescription:\n${project.description}\n\nProblemStatement:\n${project.challenges}\n\nPossibleSolution:\n${project.results}\n\nObjectives:\n${project.objective}\n\nMethodology:\n${project.methodology}\n\nTechnologies:\n${project.technologies}`,
      //   )
      //   .join("\n\n")}`,
      refusal: null,
      role: "assistant",
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messagesTruncated],
    });

    const stream = OpenAIStream(response, {
      onStart: async () => {
        // save user message into db
        await db.promessages.create({
          data: {
            content:
              lastMessage.role !== "assistant" ? lastMessage.content! : "",
            role: "user",
            userId,
          },
        });
      },
      onCompletion: async (completion) => {
        // save ai message into db
        await db.promessages.create({
          data: {
            content: completion,
            role: "assistant",
            userId,
          },
        });
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
