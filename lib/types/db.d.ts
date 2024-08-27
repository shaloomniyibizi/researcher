import {
  Collage,
  Comment,
  Department,
  Field,
  notification,
  Project,
  User,
} from "@prisma/client";

export type ExtendedProject = Project & {
  user: DBExtendedUser;
  comments: ExtendedComment[];
};
export type DBExtendedUser = User & {
  College: Collage | null;
  Department: Department | null;
  Field: Field | null;
};
export type ExtendedNotification = notification & {
  user: User | null;
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
