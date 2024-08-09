import {
  Collage,
  Comment,
  Department,
  Field,
  Project,
  User,
} from "@prisma/client";

export type ExtendedProject = Project & {
  user: ExtendedUser;
  comments: ExtendedComment[];
};
export type ExtendedUser = User & {
  College: Collage | null;
  Department: Department | null;
  Field: Field | null;
};

export type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
  replies: ReplyComment[];
};

export type ReplyComment = Comment & {
  votes: CommentVote[];
  author: User;
};
