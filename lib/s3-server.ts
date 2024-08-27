
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { writeFileSync } from "fs";

export async function downloadFromS3(file_key: string) {
  try {
    const s3Client = new S3Client({
      region: "us-east-2",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };

    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    const file_name = `./public/tmp/pdf-${Date.now()}.pdf`;
    const streamToBuffer = async (stream: any): Promise<Buffer> => {
      return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
      });
    };

    const bodyContents = await streamToBuffer(response.Body as any);
    writeFileSync(file_name, bodyContents);

    return file_name;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Usage example:
// downloadFromS3("uploads/1693568801787chongzhisheng_resume.pdf");
