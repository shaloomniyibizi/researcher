import OpenAI from "openai";


const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) throw Error("OPENAI_API_KEY is not defined");

const openai = new OpenAI({ apiKey });

export default openai;

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text.replaceAll(/\n/g, ""),
    });

    const embedding = response.data[0].embedding;

    if (!embedding) throw Error("Error generating embedding");

    console.log(embedding);

    return embedding;
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}
