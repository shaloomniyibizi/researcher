import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;
if (!apiKey) throw Error("PINECONE_API_KEY is not defined");

const pinecone = new Pinecone({ apiKey });

export const projectIndex = pinecone.Index("smartreseach");
export const pdfIndex = pinecone.Index("smartreseach");

// const embeddings = new OpenAIEmbeddings({
//   model: "text-embedding-3-small",
// });

// export async function getVectorStore() {
//   return await PineconeStore.fromExistingIndex(embeddings, {
//     pineconeIndex: projectIndex, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
//     maxConcurrency: 5,
//     // You can pass a namespace here too
//     // namespace: "foo",
//   });
// }
