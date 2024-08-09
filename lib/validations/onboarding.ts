import { z } from "zod";

export const OnboardingSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  collegeId: z.string(),
  departmentId: z.string(),
  fieldId: z.string(),
  onboarded: z.optional(z.boolean()),
  image: z.optional(z.string().url()),
  bio: z.optional(
    z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(1000, { message: "Maximum 1000 caracters." }),
  ),
});

export type OnboardingSchemaType = z.infer<typeof OnboardingSchema>;
