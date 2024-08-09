"use server";

import { getUserById } from "@/lib/data/user.actions";
import db from "@/lib/db";
import { CachedProject } from "@/lib/types/redis";
import { currentUser } from "@/lib/userAuth";
import {
  CommentSchema,
  CommentSchemaType,
  VoteSchema,
  VoteSchemaType,
} from "@/lib/validations/comments";
import { z } from "zod";

const CACHE_AFTER_UPVOTES = 1;

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const addComment = async (values: CommentSchemaType) => {
  const validatedFields = CommentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { authorId, projectId, replyToId, text } = validatedFields.data;

  const user = await getUserById(authorId);

  if (!user) {
    return { error: "Please login in other to add comment!" };
  }

  await db.comment.create({
    data: {
      authorId,
      projectId,
      replyToId,
      text,
    },
  });

  return { success: "Comment added successfull!" };
};

export const getCommentByProjectId = async (projectId: string) => {
  const comments = await db.comment.findMany({
    where: {
      projectId: projectId,
      replyToId: null, // only fetch top-level comments
    },
    include: {
      author: true,
      votes: true,
      replies: {
        // first level replies
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  return comments;
};

export const addVote = async (values: VoteSchemaType) => {
  try {
    const { projectId, voteType } = VoteSchema.parse(values);

    const session = await currentUser();

    if (!session) {
      return { error: "Unauthorized" };
    }

    // check if user has already voted on this project
    const existingVote = await db.vote.findFirst({
      where: {
        userId: session?.id,
        projectId,
      },
    });

    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        user: true,
        votes: true,
      },
    });

    if (!project) {
      return { error: "Project not found" };
    }

    if (existingVote) {
      // if vote type is the same as existing vote, delete the vote
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            userId_projectId: {
              projectId,
              userId: session?.id!,
            },
          },
        });

        // Recount the votes
        const votesAmt = project.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);

        if (votesAmt >= CACHE_AFTER_UPVOTES) {
          const cachePayload: CachedProject = {
            userName: project.user.name ?? "",
            description: JSON.stringify(project.description),
            id: project.id,
            title: project.title,
            currentVote: null,
            createdAt: project.createdAt,
          };

          await redis.hset(`project:${projectId}`, cachePayload); // Store the project data as a hash
        }

        return { success: "OK" };
      }

      // if vote type is different, update the vote
      await db.vote.update({
        where: {
          userId_projectId: {
            projectId,
            userId: session?.id!,
          },
        },
        data: {
          type: voteType,
        },
      });

      // Recount the votes
      const votesAmt = project.votes.reduce((acc, vote) => {
        if (vote.type === "UP") return acc + 1;
        if (vote.type === "DOWN") return acc - 1;
        return acc;
      }, 0);

      if (votesAmt >= CACHE_AFTER_UPVOTES) {
        const cachePayload: CachedProject = {
          userName: project.user.name ?? "",
          description: JSON.stringify(project.description),
          id: project.id,
          title: project.title,
          currentVote: voteType,
          createdAt: project.createdAt,
        };

        await redis.hset(`project:${projectId}`, cachePayload); // Store the project data as a hash
      }

      return { success: "OK" };
    }

    // if no existing vote, create a new vote
    await db.vote.create({
      data: {
        type: voteType,
        userId: session?.id!,
        projectId,
      },
    });

    // Recount the votes
    const votesAmt = project.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1;
      if (vote.type === "DOWN") return acc - 1;
      return acc;
    }, 0);

    if (votesAmt >= CACHE_AFTER_UPVOTES) {
      const cachePayload: CachedProject = {
        userName: project.user.name ?? "",
        description: JSON.stringify(project.description),
        id: project.id,
        title: project.title,
        currentVote: voteType,
        createdAt: project.createdAt,
      };

      await redis.hset(`project:${projectId}`, cachePayload); // Store the project data as a hash
    }

    return { success: "OK" };
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not project to subreddit at this time. Please try later",
      { status: 500 },
    );
  }
};

export const commentVote = async (values: VoteSchemaType) => {
  try {
    const { projectId, voteType } = VoteSchema.parse(values);

    const session = await currentUser();

    if (!session) {
      return { error: "Unauthorized" };
    }

    // check if user has already voted on this project
    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.id,
        projectId,
      },
    });

    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        user: true,
        votes: true,
      },
    });

    if (!project) {
      return new Response("Project not found", { status: 404 });
    }

    if (existingVote) {
      // if vote type is the same as existing vote, delete the vote
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            userId_projectId: {
              projectId,
              userId: session?.id!,
            },
          },
        });

        // Recount the votes
        const votesAmt = project.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);

        if (votesAmt >= CACHE_AFTER_UPVOTES) {
          const cachePayload: CachedProject = {
            userName: project.user.name ?? "",
            description: JSON.stringify(project.description),
            id: project.id,
            title: project.title,
            currentVote: null,
            createdAt: project.createdAt,
          };

          await redis.hset(`project:${projectId}`, cachePayload); // Store the project data as a hash
        }

        return { success: "OK" };
      }

      // if vote type is different, update the vote
      await db.vote.update({
        where: {
          userId_projectId: {
            projectId,
            userId: session?.id!,
          },
        },
        data: {
          type: voteType,
        },
      });

      // Recount the votes
      const votesAmt = project.votes.reduce((acc, vote) => {
        if (vote.type === "UP") return acc + 1;
        if (vote.type === "DOWN") return acc - 1;
        return acc;
      }, 0);

      if (votesAmt >= CACHE_AFTER_UPVOTES) {
        const cachePayload: CachedProject = {
          userName: project.user.name ?? "",
          description: JSON.stringify(project.description),
          id: project.id,
          title: project.title,
          currentVote: voteType,
          createdAt: project.createdAt,
        };

        await redis.hset(`project:${projectId}`, cachePayload); // Store the project data as a hash
      }

      return { success: "OK" };
    }

    // if no existing vote, create a new vote
    await db.vote.create({
      data: {
        type: voteType,
        userId: session?.id!,
        projectId,
      },
    });

    // Recount the votes
    const votesAmt = project.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1;
      if (vote.type === "DOWN") return acc - 1;
      return acc;
    }, 0);

    if (votesAmt >= CACHE_AFTER_UPVOTES) {
      const cachePayload: CachedProject = {
        userName: project.user.name ?? "",
        description: JSON.stringify(project.description),
        id: project.id,
        title: project.title,
        currentVote: voteType,
        createdAt: project.createdAt,
      };

      await redis.hset(`project:${projectId}`, cachePayload); // Store the project data as a hash
    }

    return { success: "OK" };
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not project to subreddit at this time. Please try later",
      { status: 500 },
    );
  }
};
