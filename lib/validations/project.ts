import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  image: z.string().optional(),
  objective: z
    .string()
    .min(2, {
      message: 'objective must be at least 2 characters.',
    })
    .optional(),
  technologies: z.string().min(2, {
    message: 'technologies must be at least 2 characters.',
  }),
  methodology: z
    .string()
    .min(2, {
      message: 'methodology must be at least 2 characters.',
    })
    .optional(),
  challenges: z.string().min(2, {
    message: 'challenges must be at least 2 characters.',
  }),
  results: z.string().min(2, {
    message: 'results must be at least 2 characters.',
  }),
  pdf: z.string().optional(),
  codeLink: z.string().url('Must be a valid URL').optional(),
});
export type ProjectSchemaType = z.infer<typeof ProjectSchema>;
