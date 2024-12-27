import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

import {
  asyncWrapper,
  AsyncWrapperResponse,
} from "@repo/core-main/asyncWrapper";

interface AddImageInS3BucketProps {
  config: {
    region: string;
    bucketName: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
  imageUrl: string;
}
export const addImageInS3Bucket = async ({
  config: { bucketName, region },
  imageUrl,
}: AddImageInS3BucketProps) => {
  return asyncWrapper(async () => {
    const s3Client = new S3Client({ region });

    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch the image. Status: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    const arrayBuffer = await response.arrayBuffer();

    const key = `${uuidv4()}.jpg`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: contentType || "image/jpeg",
    });

    await s3Client.send(putObjectCommand);

    const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    return { publicUrl };
  });
};

interface AddImageInS3BucketPropsWithCallback<T> {
  config: AddImageInS3BucketProps["config"];
  callback(): Promise<AsyncWrapperResponse<T>>;
}
export const addImageInS3BucketWithCallback = async ({
  callback,
  config,
}: AddImageInS3BucketPropsWithCallback<string>) => {
  return asyncWrapper(async () => {
    const image = await callback();
    if (!image.success) throw Error(image.message);
    const awsImage = await addImageInS3Bucket({
      config,
      imageUrl: image.result,
    });
    if (!awsImage.success) throw Error(awsImage.message);
    const {
      result: { publicUrl },
    } = awsImage;
    return { publicUrl };
  });
};
