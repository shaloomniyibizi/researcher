// import { db } from "@/lib/db";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { id } = await req.json();

  const _messages = await db.messages.findMany({
    where: {
      chatId: id,
    },
  });
  return NextResponse.json(_messages);
};
