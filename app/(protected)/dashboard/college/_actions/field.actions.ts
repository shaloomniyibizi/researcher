"use server";

import db from "@/lib/db";
import { currentUser } from "@/lib/userAuth";
import { fieldSchema, fieldSchemaType } from "@/lib/validations/college";
import { redirect } from "next/navigation";

export async function CreateField(form: fieldSchemaType) {
  const parsedBody = fieldSchema.safeParse(form);

  if (!parsedBody.success) throw new Error(parsedBody.error.message);

  const user = await currentUser();

  if (!user) redirect("/login");

  const { name, departmentId } = parsedBody.data;

  return await db.field.create({
    data: {
      name,
      departmentId,
    },
  });
}

export async function DeleteField(id: string) {
  return await db.field.delete({
    where: {
      id,
    },
  });
}
export const getFields = async () => {
  try {
    const field = await db.field.findMany();

    return field;
  } catch {
    return null;
  }
};
export const getFieldsDepartmentId = async (departmentId: string) => {
  try {
    const field = await db.field.findMany({
      where: {
        departmentId,
      },
    });

    return field;
  } catch {
    return null;
  }
};

export type GetFieldsType = Awaited<ReturnType<typeof getFields>>;
