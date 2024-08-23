"use server";

import db from "@/lib/db";
import { currentUser } from "@/lib/userAuth";
import {
  GeneratedProjectSchema,
  GeneratedProjectSchemaType,
} from "@/lib/validations/project";
import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateProjects(preferences: string) {
  const prompt = `User references:${preferences}\n\n Generate at least 3 project idea based on above user preferences and trends.\n The project should be feasible and have potential for real-world impact.\n the output should be in json array and each object should contain a project name field named 'title', project description and abstract with field named 'description', problem statements field named 'problemStatement', possible solution field named 'solution', project objectives named 'objectives' with come(,) separetor, project feactures named 'feactures' with come(,) separetor and conclution field named 'conclution'.`;

  const response = await chatModel.invoke(prompt);

  return JSON.parse(response.content as string);
}

export async function AddGeneratedProject(values: GeneratedProjectSchemaType) {
  const validatedFields = GeneratedProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const user = await currentUser();
  if (!user) {
    return { error: "You are not authorized! Login first" };
  }
  const {
    conclution,
    description,
    feactures,
    objectives,
    problemStatement,
    solution,
    title,
  } = validatedFields.data;

  await db.researchTopics.create({
    data: {
      userId: user.id!,
      conclution,
      description,
      feactures,
      objectives,
      problemStatement,
      solution,
      title,
    },
  });
  return { success: "New project added successfully!" };
}
export const getProjectByUserId = async (userId: string) => {
  const project = await db.researchTopics.findMany({
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
    },
  });

  return project;
};

export type GetProjectByUserIdType = Awaited<
  ReturnType<typeof getProjectByUserId>
>;
