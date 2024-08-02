"use server";

import { getProjectByTitle } from "@/lib/data/project";
import db from "@/lib/db";
import { currentUser } from "@/lib/userAuth";
import { ProjectSchema, ProjectSchemaType } from "@/lib/validations/project";

export const addProject = async (values: ProjectSchemaType) => {
  const validatedFields = ProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();

  const {
    challenges,
    codeLink,
    description,
    methodology,
    objective,
    pdf,
    results,
    technologies,
    title,
    image,
  } = validatedFields.data;

  const existingProject = await getProjectByTitle(title);

  if (existingProject) {
    return { error: "Title already in use!" };
  }

  const std = await db.student.findFirst({
    where: { userId: user?.id },
  });

  if (!std) return { error: "You are not allowed to add project" };

  await db.project.create({
    data: {
      title,
      description,
      challenges,
      codeLink,
      methodology,
      objective,
      pdf,
      results,
      technologies,
      image,
      studentId: std.id,
    },
  });

  return { success: "New project added successfully!" };
};
export const getProjectDetails = async () => {
  const projects = await db.project.findMany({
    include: {
      comments: {
        include: {
          votes: true,
          author: true,
          replies: {
            include: {
              votes: true,
              author: true,
            },
          },
        },
      },
      student: {
        include: {
          user: true,
        },
      },
    },
  });

  return projects;
};
export const getProjectById = async (id: string) => {
  const project = await db.project.findFirst({
    where: {
      id,
    },
    include: {
      comments: {
        include: {
          votes: true,
          author: true,
          replies: {
            include: {
              votes: true,
              author: true,
            },
          },
        },
      },
      student: {
        include: {
          user: true,
        },
      },
    },
  });

  return project;
};
