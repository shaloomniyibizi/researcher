// import { db } from "@/lib/db";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { userId } = await req.json();

  const _messages = await db.promessages.findMany({
    where: {
      userId,
    },
  });
  return NextResponse.json(_messages);
};
