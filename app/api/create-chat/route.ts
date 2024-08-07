import db from "@/lib/db";
import { pdfIndex } from "@/lib/newPinecone";
import { getEmbeddings } from "@/lib/openai";
import { getS3 } from "@/lib/s3";
import { downloadFromS3 } from "@/lib/s3-server";
import { currentUser } from "@/lib/userAuth";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "unouthorized" }, { status: 401 });
  }
  try {
    const { file_key, file_name } = await req.json();
    console.log(file_key, file_name);

    const fileName = await downloadFromS3(file_key);
    const loader = new PDFLoader(fileName!);
    const docs = await loader.load();

    console.log(docs.length);

    const embedding = await getEmbeddings(docs[0].pageContent);
    const addChat = await db.$transaction(async (txt) => {
      const chat = await txt.chats.create({
        data: {
          fileKey: file_key,
          pdfName: file_name,
          pdfContent: docs[0].pageContent,
          pdfUrl: getS3(file_key),
          userId: user.id!,
        },
      });
      const chat_id = chat.id;
      await pdfIndex.upsert([
        {
          id: chat.id,
          values: embedding,
          metadata: { userId: user?.id! },
        },
      ]);

      return chat_id;
    });
    const chat_id = addChat;
    return NextResponse.json({ chat_id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
