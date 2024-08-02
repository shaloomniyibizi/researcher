import { z } from "zod";

export const CommentSchema = z.object({
  projectId: z.string(),
  authorId: z.string(),
  text: z.string(),
  replyToId: z.string().optional(),
});

export type CommentSchemaType = z.infer<typeof CommentSchema>;

export const CommentVoteSchema = z.object({
  commentId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});

export type CommentVoteSchemaType = z.infer<typeof CommentVoteSchema>;

export const VoteSchema = z.object({
  projectId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});

export type VoteSchemaType = z.infer<typeof VoteSchema>;
