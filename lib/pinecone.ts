import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import md5 from "md5";
import "pdf-parse"; // Peer dep
import { projectIndex } from "./newPinecone";
import { getEmbeddings } from "./openai";
import { downloadFromS3 } from "./s3-server";

const apiKey = process.env.PINECONE_API_KEY;
if (!apiKey) throw Error("PINECONE_API_KEY is not defined");

export const getPineconeClient = () => {
  return new Pinecone({
    apiKey,
  });
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  // 1. optian the pdf => download and read from pdf
  console.log("downloading s3 into file file system ");
  const fileName = await downloadFromS3(fileKey);
  if (!fileName) {
    throw new Error("Could not download from s3");
  }
  console.log("loading pdf into memory" + fileName);

  const loader = new PDFLoader(fileName);
  const pages = (await loader.load()) as PDFPage[];

  // 2. split and segment the pdf
  const documents = await Promise.all(pages.map(prepareDocument));

  // 3. vectorize and embed individual documents
  const vectors = await Promise.all(documents.flat().map(embedDocument));

  // 4. Upload to pinecone db
  console.log("inserting vector into pinecone");
  // const namespace = convertToAscii(fileKey);
  vectors.map((v) =>
    projectIndex.upsert([
      {
        id: v.id,
        values: v.values,
        metadata: { fileKey },
      },
    ]),
  );

  return documents[0];
}

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("Error embedding document", error);
    throw error;
  }
}
export const truncateStringByBytes = (str: string, byte: number) => {
  const enc = new TextEncoder();

  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, byte));
};

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replaceAll(/\n/g, "");

  // split the the document
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
