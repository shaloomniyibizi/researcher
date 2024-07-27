'use server';

import { getProjectByTitle } from '@/lib/data/project';
import db from '@/lib/db';
import { currentUser } from '@/lib/userAuth';
import { ProjectSchema, ProjectSchemaType } from '@/lib/validations/project';

export const addProject = async (values: ProjectSchemaType) => {
  const validatedFields = ProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
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
    return { error: 'Title already in use!' };
  }

  const std = await db.student.findFirst({
    where: { userId: user?.id },
  });

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
      studentId: std?.id!,
    },
  });

  return { success: 'Confirmation title sent!' };
};
