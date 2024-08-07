"use server";

import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateProjects(interest: string, experience: string) {
  const prompt = `Generate at least 3 project idea based on my interests in ${interest} and my experience with ${experience}. The project should be feasible and have potential for real-world impact. the output should be in json array and each object should contain a project name field named 'title', project description and abstract with field named 'description', problem statements field named 'problemStatement', possible solution field named 'solution', array of project objectives named 'objectives', array of project features named 'feactures' and conclution field named 'conclution'.`;

  const response = await chatModel.invoke(prompt);

  return JSON.parse(response.content as string);
}
