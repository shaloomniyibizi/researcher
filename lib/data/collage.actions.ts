"use server";

import db from "../db";

export const getAllColleges = async () => {
  try {
    const collage = await db.college.findMany();

    return collage;
  } catch {
    return null;
  }
};

export type GetAllCollegesType = Awaited<ReturnType<typeof getAllColleges>>;

export const getAllDepartments = async () => {
  try {
    const department = await db.department.findMany();

    return department;
  } catch {
    return null;
  }
};

export type GetAllDepartmentsType = Awaited<
  ReturnType<typeof getAllDepartments>
>;

export const getAllFields = async () => {
  try {
    const field = await db.field.findMany();

    return field;
  } catch {
    return null;
  }
};

export type GetAllFieldsType = Awaited<ReturnType<typeof getAllFields>>;
