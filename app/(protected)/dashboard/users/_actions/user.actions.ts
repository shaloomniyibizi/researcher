"use server";

import db from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/emails";
import { generatePasswordResetToken } from "@/lib/tokens";
import {
  RegisterSchema,
  RegisterSchemaType,
  ResetSchema,
} from "@/lib/validations/user";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const register = async (values: RegisterSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, phoneNumber, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      email,
      phoneNumber,
      name,
      password: hashedPassword,
      emailVerified: new Date(), // manual email verification
    },
  });

  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(verificationToken.email, verificationToken.token);
  // if (user) redirect("/onboarding");

  return {
    success: "User Registered Successfully 👍",
  };
};

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset email sent!" };
};

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

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        College: true,
        Department: true,
        Field: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });

    return account;
  } catch {
    return null;
  }
};

export type GetUsersType = Awaited<ReturnType<typeof getUsers>>;
export type GetUserByIdType = Awaited<ReturnType<typeof getUserById>>;
export type RegisterType = Awaited<ReturnType<typeof register>>;
