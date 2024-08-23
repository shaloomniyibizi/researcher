"use server";

import db from "@/lib/db";

export const getProjectMessageByUserId = async (userId: string) => {
  const promessage = await db.promessages.findMany({
    where: {
      userId,
    },
  });
  return promessage;
};
export const deleteProjectMessageByUserId = async (userId: string) => {
  const del = await db.promessages.deleteMany({
    where: {
      userId,
    },
  });
  if (!del) return { error: "Fail to delete user !" };
  return { success: "User deleted successfully!" };
};
