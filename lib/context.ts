import { projectIndex } from "./newPinecone";
import { getEmbeddings } from "./openai";
import { currentUser } from "./userAuth";
import { convertToAscii } from "./utils";

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string,
) {
  try {
    const namespace = projectIndex.namespace(convertToAscii(fileKey));
    const user = await currentUser();
    const userId = user?.id!;
    const queryResult = await namespace.query({
      vector: embeddings,
      topK: 5,
      filter: { userId },
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (error) {
    console.log("error querying embeddings", error);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7,
  );

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  // 5 vectors
  return docs.join("\n").substring(0, 3000);
}
