"use server";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "../data/user.actions";
import db from "../db";
import { RegisterSchema, RegisterSchemaType } from "../validations/user";

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

  const user = await db.user.create({
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

  return { success: "User created successfully!" };
};
