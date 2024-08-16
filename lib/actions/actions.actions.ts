"use server";

import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateProjects(preferences: string) {
  const prompt = `User references:${preferences}\n\n Generate at least 3 project idea based on above user preferences and trends.\n The project should be feasible and have potential for real-world impact.\n the output should be in json array and each object should contain a project name field named 'title', project description and abstract with field named 'description', problem statements field named 'problemStatement', possible solution field named 'solution', project objectives named 'objectives', project features named 'feactures' with come(,) separetor and conclution field named 'conclution'.`;

  const response = await chatModel.invoke(prompt);

  return JSON.parse(response.content as string);
}
