// import AWS from 'aws-sdk';

// export async function uploadToS3(file: File) {
//   try {
//     AWS.config.update({
//       accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
//       secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
//     });

//     const s3 = new AWS.S3({
//       params: {
//         Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
//       },
//       region: 'us-east-2',
//     });

//     const file_key =
//       'upload/' + Date.now().toString() + file.name.replaceAll(' ', '-');

//     const params = {
//       Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
//       Key: file_key,
//       Body: file,
//     };
//     const upload = s3
//       .putObject(params)
//       .on('httpUploadProgress', (evt) => {
//         console.log(
//           'uploading ....',
//           parseInt(((evt.loaded * 100) / evt.total).toString()) + '%'
//         );
//       })
//       .promise();
//     await upload.then((data) => {
//       console.log('Successfully uploaded to s3', file_key);
//     });
//     return Promise.resolve({ file_key, file_name: file.name });
//   } catch (error) {}
// }

// export function getS3(file_key: string) {
//   const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${file_key}`;
//   return url;
// }



import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function uploadToS3(file: File) {
  try {
    const s3Client = new S3Client({
      region: "us-east-2",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    const file_key =
      "upload/" + Date.now().toString() + file.name.replaceAll(" ", "-");

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: file,
    };

    const command = new PutObjectCommand(params);

    const upload = s3Client.send(command);

    // Progress tracking isn't directly supported in the SDK v3 S3Client.
    // You can achieve this with an external library or manually chunk the file.

    await upload;
    console.log("Successfully uploaded to S3", file_key);

    return Promise.resolve({ file_key, file_name: file.name });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return Promise.reject(error);
  }
}

export function getS3(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${file_key}`;
  return url;
}
