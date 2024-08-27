import db from "@/lib/db";
import { getS3 } from "@/lib/s3";
import { downloadFromS3 } from "@/lib/s3-server";
import { currentUser } from "@/lib/userAuth";
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

      const chat = await db.chats.create({
        data: {
          fileKey: file_key, 
          fileName: fileName, 
          pdfName: file_name, 
          pdfUrl: getS3(file_key),
          userId: user.id!,
        },
      });
      const chat_id = chat.id;

    return NextResponse.json({ chat_id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
