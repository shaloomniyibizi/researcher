import { Comment, Project, Student, User } from "@prisma/client";

export type ExtendedProject = Project & {
  student: ExtendedStudent;
  comments: ExtendedComment[];
};
export type ExtendedStudent = Student & {
  user: User;
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
