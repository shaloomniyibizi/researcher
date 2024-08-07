import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;
if (!apiKey) throw Error("PINECONE_API_KEY is not defined");

const pinecone = new Pinecone({ apiKey });

export const projectIndex = pinecone.Index("smartreseach");
export const pdfIndex = pinecone.Index("smartreseach");
