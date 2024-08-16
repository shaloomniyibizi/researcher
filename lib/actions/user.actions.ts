"use server";

import db from "../db";

export const getUsers = async () => {
  const user = await db.user.findMany({
    include: {
      College: true,
      Department: true,
      Field: true,
    },
  });

  return user;
};
export const getUsersByColleId = async (
  from: Date,
  to: Date,
  collegeId: string,
) => {
  const users = await db.user.findMany({
    where: {
      AND: {
        createdAt: {
          gte: from,
          lte: to,
        },
        collegeId,
      },
    },
    include: {
      College: true,
      Department: true,
      Field: true,
    },
  });
  return users;
};

export async function DeleteUser(id: string) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) return { error: "This user does not exit any more !" };

  //Delete user from db
  const deluser = await db.user.delete({
    where: {
      id,
    },
  });

  if (!deluser) return { error: "Fail to delete user !" };
  return { success: "User deleted successfully!" };
}

export type GetUsersType = Awaited<ReturnType<typeof getUsers>>;
