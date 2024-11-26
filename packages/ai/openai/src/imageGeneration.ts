import { type OpenAI } from "openai";

import { asyncWrapper } from "@repo/core-main/asyncWrapper";

interface GenerateImageProps {
    openai: OpenAI;
    imageDescription: string;
  }

export const generateImage = async ({imageDescription, openai}: GenerateImageProps) => {
    return asyncWrapper(async () => {
      const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: imageDescription,
      });
  
      return image.data[0];
    });
  };
