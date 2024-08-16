import db from "@/lib/db";

export async function getChatsByUserId(userId: string) {
  const _chats = await db.chats.findFirst({
    where: {
      userId,
    },
  });
  return _chats;
}
