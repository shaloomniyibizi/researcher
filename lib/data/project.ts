import db from '../db';

export const getProjectByTitle = async (title: string) => {
  try {
    const project = await db.project.findFirst({ where: { title } });

    return project;
  } catch {
    return null;
  }
};
