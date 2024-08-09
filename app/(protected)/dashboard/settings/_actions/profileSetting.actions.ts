"use server";

import { getUserByEmail, getUserById } from "@/lib/data/user.actions";
import { sendVerificationEmail } from "@/lib/emails";
import { currentUser } from "@/lib/userAuth";
import db from "../../../../../lib/db";
import { generateVerificationToken } from "../../../../../lib/tokens";
import { ProfileSettingSchemaType } from "../../../../../lib/validations/user";

export const ProfileSetting = async (values: ProfileSettingSchemaType) => {
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

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "User Account Updated !" };
};
