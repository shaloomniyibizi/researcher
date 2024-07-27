'use server';

import bcrypt from 'bcryptjs';
import { getUserByEmail } from '../data/user';
import db from '../db';
import { sendVerificationEmail } from '../emails';
import { generateVerificationToken } from '../tokens';
import { RegisterSchema, RegisterSchemaType } from '../validations/user';

export const register = async (values: RegisterSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name, email, phoneNumber, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await db.user.create({
    data: {
      email,
      phoneNumber,
      name,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
};
