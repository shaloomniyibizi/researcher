"use server";

import db from "@/lib/db";

export const addCollege = async () => {
  try {
    const collage = await db.college.create({
      data: {
        name: "",
      },
    });

    return collage;
  } catch {
    return null;
  }
};

export const getColleges = async () => {
  try {
    const collage = await db.college.findMany();

    return collage;
  } catch {
    return null;
  }
};
export const getCollegesByUserId = async (userId: string) => {
  try {
    const collage = await db.college.findMany({
      where: {
        user: { some: { id: userId } },
      },
    });

    return collage;
  } catch {
    return null;
  }
};

export type GetCollegesType = Awaited<ReturnType<typeof getColleges>>;
