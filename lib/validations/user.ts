import { Role } from "@prisma/client";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
  code: z.optional(z.string()),
});

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  phoneNumber: z.string(),
  collegeId: z.string(),
  departmentId: z.string(),
  fieldId: z.string(),
  role: z.enum([Role.ADMIN, Role.FACULTY, Role.STUDENT]),
  onboarded: z.optional(z.boolean()),
  image: z.optional(z.string().url()),
  bio: z.optional(
    z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(1000, { message: "Maximum 1000 caracters." }),
  ),
  isTwoFactorEnabled: z.optional(z.boolean()),
  password: z.optional(z.string().min(6)),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, {
    message: "user name is required of atleast 3 character",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z.string().optional(),
  password: z.string().min(6, {
    message: "minimum of 6 characters required for password",
  }),
});

export const ProfileSettingSchema = z.object({
  image: z.string().optional(),

  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  phoneNumber: z.string().min(2, {
    message: "technologies must be at least 2 characters.",
  }),
  bio: z.optional(
    z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(1000, { message: "Maximum 1000 caracters." }),
  ),
});

export const SecuritySettingsSchema = z
  .object({
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    confirmPassword: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Current Password is required",
      path: ["password"],
    },
  );

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type SettingsSchemaType = z.infer<typeof SettingsSchema>;
export type ProfileSettingSchemaType = z.infer<typeof ProfileSettingSchema>;
export type SecuritySettingsSchemaType = z.infer<typeof SecuritySettingsSchema>;
