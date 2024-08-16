"use server";

import db from "@/lib/db";
import { currentUser } from "@/lib/userAuth";
import {
  departmentSchema,
  departmentSchemaType,
} from "@/lib/validations/college";
import { redirect } from "next/navigation";

export const addDepartment = async (values: departmentSchemaType) => {
  const parsedBody = departmentSchema.safeParse(values);

  if (!parsedBody.success) throw new Error(parsedBody.error.message);

  const user = await currentUser();

  if (!user) redirect("/login");

  const { name, collegeId } = parsedBody.data;
  const department = await db.department.create({
    data: {
      name,
      college: {
        connect: {
          id: collegeId,
        },
      },
    },
  });

  return department;
};
export const getDepartments = async () => {
  const department = await db.department.findMany({ include: { field: true } });
  return department;
};
export const getDepartmentById = async (id: string) => {
  const department = await db.department.findUnique({ where: { id } });
  return department;
};
export const getDepartmentsByCollegeId = async (collegeId: string) => {
  const department = await db.department.findMany({
    where: {
      college: {
        some: { id: collegeId },
      },
    },
    include: {
      field: true,
    },
  });

  return department;
};
export const DeleteDepartment = async (id: string) => {
  const department = await db.department.delete({
    where: {
      id,
    },
  });

  if (!department) return { error: "Fail to delete depatment" };
  return { success: `${department.name} Department Deleted successfully` };
};

export type GetDepartmentsType = Awaited<ReturnType<typeof getDepartments>>;
