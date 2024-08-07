import { getContext } from "@/lib/context";
import db from "@/lib/db";
import openai from "@/lib/openai";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  try {
    const { messages, id } = await req.json();
    const _chats = await db.chats.findFirst({
      where: { id: id },
    });
    if (!_chats) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }
    const fileKey = _chats.fileKey;
    const lastMessage = messages[messages.length - 1];
    const context = await getContext(lastMessage.content, fileKey);
    const prompt: ChatCompletionMessage = {
      role: "assistant",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
  The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
  AI is a well-behaved and well-mannered individual.
  AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
  AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
  AI assistant is a big fan of Pinecone and Vercel.
  START CONTEXT BLOCK
  ${context}
  END OF CONTEXT BLOCK
  AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
  If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
  AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
  AI assistant will not invent anything that is not drawn directly from the context.
  `,
    };
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(
      response,
      // , {
      // onStart: async () => {
      //   //save user message into db
      //   await db.messages.create({
      //     data: {
      //       chatId: id,
      //       content: messages,
      //       role: "USER",
      //     },
      //   });
      // },
      // onCompletion: async (completion) => {
      //   // save AI message into db
      //   await db.messages.create({
      //     data: {
      //       chatId: id,
      //       content: completion,
      //       role: "SYSTEM",
      //     },
      //   });
      // },
      // }
    );
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (e) {
    throw e;
  }
}
