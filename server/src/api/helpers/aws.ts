import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SKEY,
  },
  region: process.env.AWS_REGION,
});

export async function AWSUploader(createReadStream: any, filename: any) {
  try {
    const fUpload = new Upload({
      client,
      params: {
        Bucket: process.env.BUCKET,
        Key: filename,
        Body: createReadStream(),
        ACL: "public-read",
      },
    });

    fUpload.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    await fUpload.done();

    return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
  } catch (err) {
    console.error(err);
  }
}
