import db from "@/lib/db";
import { pdfIndex } from "@/lib/newPinecone";
import openai, { getEmbeddings } from "@/lib/openai";
import { currentUser } from "@/lib/userAuth";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;
    const chatId = body.id;
    const _chats = await db.chats.findFirst({
      where: {
        id: chatId,
      },
    });
    if (!_chats) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }
    const lastMessage = messages[messages.length - 1];
    const messagesTruncated = messages.slice(-6);

    const embedding = await getEmbeddings(
      messagesTruncated.map((message) => message.content).join("\n"),
    );
    const user = await currentUser();
    const userId = user?.id!;
    const vectorQueryResponse = await pdfIndex.query({
      vector: embedding,
      topK: 4,
      filter: { userId },
    });

    const relativeChats = await db.chats.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });
    console.log("Relavante project found:", relativeChats);
    const systemMessage: ChatCompletionMessage = {
      role: "assistant",
      content:
        "You are an assistant for question-answering tasks." +
        "Use the following pieces of retrieved context to answer ," +
        "the question. If you don't know the answer, say that you ," +
        "don't know. Use three sentences maximum and keep the ," +
        "answer concise." +
        "The relavante context for this query are:\n" +
        relativeChats.map((chat) => `Content: ${chat.pdfContent}`).join("\n\n"),
    };
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messagesTruncated],
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onStart: async () => {
        // save user message into db
        await db.messages.create({
          data: {
            content:
              lastMessage.role !== "assistant" ? lastMessage.content! : "",
            role: "USER",
            chatId: _chats.id,
          },
        });
      },
      onCompletion: async (completion) => {
        // save ai message into db
        await db.messages.create({
          data: {
            content: completion,
            role: "SYSTEM",
            chatId: _chats.id,
          },
        });
      },
    });
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (e) {
    throw e;
  }
}
