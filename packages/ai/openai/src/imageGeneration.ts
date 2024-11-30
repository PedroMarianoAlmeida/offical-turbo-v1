import { type OpenAI } from "openai";

import { asyncWrapper } from "@repo/core-main/asyncWrapper";

export const sizeToResolution = {
  Square: "1024x1024",
  Tall: "1024x1792",
  Wide: "1792x1024",
  notDefined: null,
} as const;
export type SizeKey = keyof typeof sizeToResolution;
interface GenerateImageProps {
  openai: OpenAI;
  imageDescription: string;
  size?: SizeKey;
}

export const generateImage = async ({
  imageDescription,
  openai,
  size,
}: GenerateImageProps) => {
  return asyncWrapper(async () => {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: imageDescription,
      size: size && sizeToResolution[size],
    });

    return image.data[0];
  });
};
