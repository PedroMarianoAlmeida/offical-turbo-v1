"use server";
import { z, ZodTypeAny } from "zod";

import {
  objectGeneration,
  GeneratePromptProps,
} from "@repo/openai/objectGeneration";
import {
  generateImage as generateImageOpenai,
  // SizeKey,
} from "@repo/openai/imageGeneration";
import { textOutput } from "@repo/openai/textGeneration";
import { actionWithDailyRateLimit } from "@repo/firebase/userCount";
import { type AsyncWrapperResponse } from "@repo/core-main/asyncWrapper";

import { openai } from "@/config/openai";
import { database } from "@/config/firebaseConfig";

const project = process.env.PROJECT_NAME;
const rateLimit = Number(process.env.DAILY_LIMIT);

interface GenerateObjectProps<T extends ZodTypeAny>
  extends Pick<
    GeneratePromptProps,
    "systemPrompt" | "userPrompt" | "zodFormat"
  > {
  userId: string;
  zodFormat: T;
}

export const generateObject = async <T extends ZodTypeAny>({
  userId,
  userPrompt,
  zodFormat,
  systemPrompt,
}: GenerateObjectProps<T>): Promise<AsyncWrapperResponse<z.infer<T>>> => {
  const data = await actionWithDailyRateLimit({
    project,
    database,
    rateLimit,
    userId,
    callback: () =>
      objectGeneration({
        openai,
        userPrompt,
        systemPrompt,
        zodFormat,
      }),
  });

  if (!data.success) {
    return { success: false, message: data.message };
  }

  const { result } = data;

  return { success: true, result };
};

interface GenerateTextProps
  extends Pick<GeneratePromptProps, "systemPrompt" | "userPrompt"> {
  userId: string;
}
export const generateResponse = async ({
  userId,
  userPrompt,
  systemPrompt,
}: GenerateTextProps): Promise<AsyncWrapperResponse<string>> => {
  const data = await actionWithDailyRateLimit({
    project,
    database,
    rateLimit,
    userId,
    callback: () => textOutput({ openai, userPrompt, systemPrompt }),
  });
  if (!data.success) {
    return { success: false, message: data.message };
  }

  return { success: true, result: data.result };
};

interface GenerateImageProps extends Pick<GeneratePromptProps, "userPrompt"> {
  userId: string;
  // size: SizeKey;
}

export const generateImage = async ({
  userId,
  // size,
  userPrompt,
}: GenerateImageProps): Promise<AsyncWrapperResponse<string>> => {
  const data = await actionWithDailyRateLimit({
    project,
    database,
    rateLimit,
    userId,
    callback: () =>
      generateImageOpenai({ openai, imageDescription: userPrompt /*size*/ }),
  });
  if (!data.success) {
    return { success: false, message: data.message };
  }

  const { url } = data.result;
  if (!url) return { success: false, message: "No photo on response" };

  return { success: true, result: url };
};
