import { z } from "zod";

export const fieldSchema = z.object({
  name: z.string().min(3).max(20),
  departmentId: z.string(),
});
export const departmentSchema = z.object({
  name: z.string().min(3).max(20),
  collegeId: z.string(),
});

export type fieldSchemaType = z.infer<typeof fieldSchema>;
export type departmentSchemaType = z.infer<typeof departmentSchema>;
