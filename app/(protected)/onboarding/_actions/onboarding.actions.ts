"use server";

import { getUserByEmail, getUserById } from "@/lib/data/user";
import db from "@/lib/db";
import { sendVerificationEmail } from "@/lib/emails";
import { generateVerificationToken } from "@/lib/tokens";
import { currentUser } from "@/lib/userAuth";
import {
  OnboardingSchema,
  OnboardingSchemaType,
} from "@/lib/validations/onboarding";

export const onboarding = async (values: OnboardingSchemaType) => {
  const validatedFields = OnboardingSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { department, year, bio, email, image, name, onboarded } =
    validatedFields.data;
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Verification email sent!" };
  }

  if (user.isOAuth) {
    values.email = user.email!;
  }

  await db.$transaction([
    // update user
    db.user.update({
      where: { id: dbUser.id },
      data: {
        bio,
        email,
        image,
        name,
        onboarded,
      },
    }),

    // create student
    db.student.create({
      data: {
        department,
        year,
        userId: dbUser.id,
      },
    }),
  ]);

  return { success: "Successfully onboarded !" };
};
