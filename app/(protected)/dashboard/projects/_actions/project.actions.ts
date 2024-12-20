"use server";

import db from "@/lib/db";
import { projectIndex } from "@/lib/newPinecone";
import { getEmbeddings } from "@/lib/openai";
import { currentUser } from "@/lib/userAuth";
import { ProjectSchema, ProjectSchemaType } from "@/lib/validations/project";
import { redirect } from "next/navigation";

export const addProject = async (values: ProjectSchemaType) => {
  const validatedFields = ProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();

  if (!user || user.role !== "STUDENT")
    return { error: "Unauthorized to do this action !" };

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

  const existingProject = await db.project.findFirst({ where: { title } });

  if (existingProject) {
    return { error: "Title already in use!" };
  }

  if (!user) return { error: "You are not allowed to add project" };

  const addProject = await db.$transaction(async (txt) => {
    const project = await txt.project.create({
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
        userId: user.id!,
      },
    });
    //Add notification
    await txt.notification.create({
      data: {
        type: "Message",
        message: `Your project ${project.title} added successfully and is waiting for approval`,
        title: "Project added",
        projectId: project.id,
        userId: user.id!,
      },
    });
    return project;
  });
  if (!addProject) return { error: "Fail to add New project !" };

  return { success: "New project added successfully!" };
};

export const getAllProjects = async () => {
  const projects = await db.project.findMany({
    include: {
      user: {
        include: {
          College: true,
          Department: true,
          Field: true,
        },
      },
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
    },
  });

  return projects;
};
export type GetAllProjectsType = Awaited<ReturnType<typeof getAllProjects>>;
export const getAllProjectsByDate = async (
  from: Date,
  to: Date,
  collegeId: string,
) => {
  const projects = await db.project.findMany({
    where: {
      AND: {
        createdAt: {
          gte: from,
          lte: to,
        },
        user: {
          collegeId,
        },
      },
    },
    include: {
      user: {
        include: {
          College: true,
          Department: true,
          Field: true,
        },
      },
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
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return projects;
};
export const getProjectById = async (id: string) => {
  const project = await db.project.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        include: {
          College: true,
          Department: true,
          Field: true,
        },
      },
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
    },
  });

  return project;
};
export const getProjectByUserId = async (userId: string) => {
  const project = await db.project.findMany({
    where: {
      userId: userId,
    },
    include: {
      user: {
        include: {
          College: true,
          Department: true,
          Field: true,
        },
      },
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
    },
  });

  return project;
};

export async function DeleteProject(id: string) {
  const user = await currentUser();

  if (!user) redirect("/login");

  const project = await db.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) throw new Error("Bad request");

  const delproject = await db.$transaction(async (txt) => {
    //Delete project from db
    const delproject = await txt.project.delete({
      where: {
        id,
      },
    });

    //Delete project from pinecone
    await projectIndex.deleteOne(id);

    return delproject;
  });
  if (!delproject) return { error: "Fail to delete project !" };
  return { success: "Project deleted successfully!" };
}
export async function AcceptProject(id: string) {
  const user = await currentUser();

  if (!user) redirect("/login");

  const project = await db.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) return { error: "Bad request" };

  const embedding = await getEmbeddingsForProject(
    project.title,
    project.description,
    project.objective!,
    project.challenges,
    project.results,
    project.technologies,
    project.methodology!,
  );
  //Accept project from db
  const acceptproject = await db.$transaction(async (txt) => {
    const acceptproject = await txt.project.update({
      where: {
        id,
      },
      data: {
        status: "accepted",
      },
    });

    await projectIndex.upsert([
      {
        id: acceptproject.id,
        values: embedding,
        metadata: { userId: user?.id! },
      },
    ]);

    await txt.notification.create({
      data: {
        type: "ProjectUpdate",
        message: `Your project ${acceptproject.title} accepted`,
        title: "Project accepted",
        projectId: acceptproject.id,
        userId: user.id!,
      },
    });

    return acceptproject;
  });

  if (!acceptproject) return { error: "Fail to accept project !" };
  return { success: "Project accepted successfully!" };
}
export async function RejectProject(id: string) {
  const user = await currentUser();

  if (!user) redirect("/login");

  const project = await db.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) throw new Error("Bad request");

  const rejectproject = await db.$transaction(async (txt) => {
    //reject project from db
    const rejeproject = await txt.project.update({
      where: {
        id,
      },
      data: {
        status: "rejected",
      },
    });

    //Delete project from pinecone
    await projectIndex.deleteOne(id);

    //Add notification
    await txt.notification.create({
      data: {
        type: "ProjectUpdate",
        message: `Your project ${rejeproject.title} Rejected`,
        title: "Project Rejected",
        projectId: rejeproject.id,
        userId: user.id!,
      },
    });

    return rejeproject;
  });
  if (!rejectproject) return { error: "Fail to reject project !" };
  return { success: "Project rejected successfully!" };
}

export async function GetaNumberOfProjects() {
  const user = await currentUser();

  if (!user) redirect("/login");

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
  });
  const count = await db.project.count({
    where: {
      user: {
        collegeId: dbUser?.collegeId,
      },
    },
  });
  return count;
}
export async function GetaNumberOfAcceptedProjects() {
  const user = await currentUser();
  if (!user) redirect("/login");

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
  });
  const count = await db.project.count({
    where: {
      AND: {
        status: "accepted",
        user: {
          collegeId: dbUser?.collegeId,
        },
      },
    },
  });
  return count;
}
export async function GetaNumberOfRejectedProjects() {
  const user = await currentUser();
  if (!user) redirect("/login");

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
  });
  const count = await db.project.count({
    where: {
      AND: {
        status: "rejected",
        user: {
          collegeId: dbUser?.collegeId,
        },
      },
    },
  });
  return count;
}
export async function GetaNumberOfPendingProjects() {
  const user = await currentUser();
  if (!user) redirect("/login");

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
  });
  const count = await db.project.count({
    where: {
      AND: {
        status: "accepted",
        user: {
          collegeId: dbUser?.collegeId,
        },
      },
    },
  });
  return count;
}

async function getEmbeddingsForProject(
  title: string,
  description: string | undefined,
  objective: string | undefined,
  challenges: string | undefined,
  results: string | undefined,
  technologies: string | undefined,
  methodology: string | undefined,
) {
  return getEmbeddings(
    title +
      "\n\n" +
      description +
      "\n\n" +
      objective +
      "\n\n" +
      challenges +
      "\n\n" +
      results ??
      +"\n\n" + technologies! ??
      +"\n\n" + methodology! ??
      "",
  );
}
