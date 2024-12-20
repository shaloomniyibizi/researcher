"use server";

import db from "@/lib/db";
import { currentUser } from "@/lib/userAuth";
import { SecuritySettingsSchemaType } from "@/lib/validations/user";
import bcrypt from "bcryptjs";
import { getUserById } from "../../users/_actions/user.actions";

export const SecuritySettings = async (values: SecuritySettingsSchemaType) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect current password!" };
    }

    if (values.newPassword !== values.confirmPassword) {
      return { error: "comfirmation password not match!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
    values.confirmPassword = undefined;
  }

  if (user.isOAuth) {
    values.password = undefined;
    values.confirmPassword = undefined;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "User Password Updated !" };
};
