import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { Pinecone } from "@pinecone-database/pinecone";
import { Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/data";
import md5 from "md5";
import { getEmbeddings } from "./embeddings";
import { downloadFromS3 } from "./s3-server";

let pinecone: Pinecone | null = null;

export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    // await pinecone.createIndex({
    //   name: 'chatpdf',
    //   dimension: 1536,
    //   spec: {
    //     serverless: {
    //       cloud: 'aws',
    //       region: 'us-east-2',
    //     },
    //   },
    // });
  }
  return pinecone;
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
  const loader = new PDFLoader(fileName);
  const pages = (await loader.load()) as PDFPage[];

  // 2. split and segment the pdf
  const documents = await Promise.all(pages.map(prepareDocument));

  // 3. vectorize and embed individual documents
  const vectors = await Promise.all(documents.flat().map(embedDocument));

  // 4. Upload to pinecone db
  const client = await getPineconeClient();
  const pineconeIndex = client.Index("smartreseach");
  console.log("inserting vector into pinecone");
  // const namespace = convertToAscii(fileKey);
  vectors.map(
    async (v) =>
      await pineconeIndex.upsert([
        {
          id: v.id,
          values: v.values,
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
    } as Vector;
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
