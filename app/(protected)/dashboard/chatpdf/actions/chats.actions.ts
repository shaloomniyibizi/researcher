"use server";

import db from "@/lib/db";
import { currentUser } from "@/lib/userAuth";

export async function getChatsByUserId(userId: string) {
  const _chats = await db.chats.findFirst({
    where: {
      userId,
    },
  });
  return _chats;
}
export async function getManyChatsByUserId(userId: string) {
  const user = await currentUser();
  const _chats = await db.chats.findMany({
    where: {
      userId: user?.id!,
    },
  });
  return _chats;
}
export async function getChatsById(id: string) {
  const chat = await db.chats.findFirst({
    where: {
      id,
    },
  });
  return chat;
}
