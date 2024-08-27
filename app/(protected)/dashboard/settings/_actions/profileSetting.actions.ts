"use server";

import db from "@/lib/db";
import { currentUser } from "@/lib/userAuth";
import { ProfileSettingSchemaType } from "@/lib/validations/user";
import { getUserByEmail, getUserById } from "../../users/_actions/user.actions";

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

    // const verificationToken = await generateVerificationToken(values.email);
    // await sendVerificationEmail(
    //   verificationToken.email,
    //   verificationToken.token,
    // );

    // return { success: "Verification email sent!" };
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
