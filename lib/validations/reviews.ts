import { z } from 'zod';

export const reviewSchema = z.object({
  review: z
    .string()
    .min(10, {
      message: 'review must be at least 10 characters.',
    })
    .max(160, {
      message: 'review must not be longer than 30 characters.',
    }),
  name: z.string().min(3, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
});
