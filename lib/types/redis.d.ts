import { Vote } from "@prisma/client";

export type CachedProject = {
  id: string;
  title: string;
  userName: string;
  description: string;
  currentVote: Vote["type"] | null;
  createdAt: Date;
};
