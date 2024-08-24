import db from "@/lib/db";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { LangChainStream, StreamingTextResponse } from "ai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { NextResponse } from "next/server";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;
    const id = body.id;
    const _chats = await db.chats.findFirst({
      where: {
        id,
      },
    });
    if (!_chats) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }
    const lastMessage = messages[messages.length - 1];

    const { stream, handlers } = LangChainStream({
      onStart: async () => {
        // save user message into db
        await db.messages.create({
          data: {
            content:
              lastMessage.role !== "assistant" ? lastMessage.content! : "",
            role: "user",
            chatId: _chats.id,
          },
        });
      },
      onCompletion: async (completion) => {
        // save ai message into db
        await db.messages.create({
          data: {
            content: completion,
            role: "assistant",
            chatId: _chats.id,
          },
        });
      },
    });

    const chatModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      streaming: true,
      callbacks: [handlers],
      verbose: true,
    });

    const fileName = _chats.fileName;
    const loader = new PDFLoader(fileName!);
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splits = await textSplitter.splitDocuments(docs);

    const vectorstore = await MemoryVectorStore.fromDocuments(
      splits,
      new OpenAIEmbeddings(),
    );

    const retriever = vectorstore.asRetriever();

    // const currentMessageContent = messages[messages.length - 1].content;

    const systemTemplate = [
      `You're an AI assistant who answers questions about documents.
        You're a chat bot, so keep your replies succinct.
        You're only allowed to use the documents below to answer the question.
        If the question isn't related to these documents, say:
        "Sorry, I can't find information that not related to your document."
        If the information isn't available in the below documents, say:
        "Sorry, I couldn't find any information on that."
        Do not go off topic.
        Documents:\n\n
      {context}`,
    ].join("");
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "{input}"],
    ]);

    const questionAnswerChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
    });
    const retrievalChain = await createRetrievalChain({
      retriever,
      combineDocsChain: questionAnswerChain,
    });

    retrievalChain.invoke({
      input: lastMessage.content!,
    });
    return new StreamingTextResponse(stream);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
