"use server";

import db from "@/lib/db";
import { currentUser } from "@/lib/userAuth";
import { SettingsSchema, SettingsSchemaType } from "@/lib/validations/user";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./user.actions";

export const settings = async (values: SettingsSchemaType) => {
  const validatedFields = SettingsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    departmentId,
    fieldId,
    bio,
    email,
    phoneNumber,
    image,
    name,
    onboarded,
    collegeId,
    role,
    password,
    isTwoFactorEnabled,
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password!, 10);
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized Action" };
  }
  if (user.role === "STUDENT") {
    return { error: "you can't perform this Action as student" };
  }

  const dbUser = await getUserByEmail(email!);

  if (!dbUser) {
    await db.user.create({
      data: {
        departmentId,
        collegeId,
        bio,
        email: email!,
        image,
        name: name!,
        phoneNumber,
        onboarded,
        fieldId,
        password: hashedPassword,
        role,
        isTwoFactorEnabled,
        emailVerified: new Date(), // manual email verification
      },
    });
    return { success: "User Added Successfully" };
  }

  if (user.isOAuth) {
    values.email = user.email!;
  }

  // update user
  await db.user.update({
    where: { id: dbUser.id },
    data: {
      departmentId,
      collegeId,
      bio,
      email,
      image,
      name,
      phoneNumber,
      onboarded,
      fieldId,
      role,
      password: hashedPassword,
      isTwoFactorEnabled,
      emailVerified: new Date(), // manual email verification
    },
  });

  return { success: "User Updated Successfully !" };
};
