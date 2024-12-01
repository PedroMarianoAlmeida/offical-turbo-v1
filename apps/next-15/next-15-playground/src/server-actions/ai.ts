"use server";
import { z, ZodTypeAny } from "zod";
import { openai } from "@/miscellaneous/openaiConfig";
import { textOutput } from "@repo/openai/textGeneration";
import { generateImage as generateImageOpenai } from "@repo/openai/imageGeneration";
import {
  objectGeneration,
  GeneratePromptProps,
} from "@repo/openai/objectGeneration";
import { actionWithDailyRateLimit } from "@repo/firebase/userCount";
import { type asyncWrapperResponse } from "@repo/core-main/asyncWrapper";

import { projectName, dailyLimit } from "@/miscellaneous/constants";
import { database } from "@/miscellaneous/firebaseConfig";

export const generateResponse = async ({
  userId,
}: {
  userId: string;
}): Promise<asyncWrapperResponse<string>> => {
  const data = await actionWithDailyRateLimit({
    project: projectName,
    database,
    rateLimit: dailyLimit,
    userId,
    callback: () => textOutput({ openai, userPrompt: "ping" }),
  });
  if (!data.success) {
    return { success: false, message: data.message };
  }

  return { success: true, result: data.result };
};

export const generateImage = async ({
  userId,
}: {
  userId: string;
}): Promise<asyncWrapperResponse<string>> => {
  const data = await actionWithDailyRateLimit({
    project: projectName,
    database,
    rateLimit: dailyLimit,
    userId,
    callback: () =>
      generateImageOpenai({ openai, imageDescription: "5 balls" }),
  });
  if (!data.success) {
    return { success: false, message: data.message };
  }

  const { url } = data.result;
  if (!url) return { success: false, message: "No photo on response" };

  return { success: true, result: url };
};

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
  // userPrompt,
  zodFormat,
  // systemPrompt,
}: GenerateObjectProps<T>): Promise<asyncWrapperResponse<z.infer<T>>> => {
  const data = await actionWithDailyRateLimit({
    project: projectName,
    database,
    rateLimit: dailyLimit,
    userId,
    callback: () =>
      objectGeneration({
        openai,
        userPrompt: "Alice and Bob are going to a science fair on Friday.",
        systemPrompt: "Extract the event information.",
        zodFormat,
      }),
  });
  if (!data.success) {
    return { success: false, message: data.message };
  }

  const { result } = data;

  return { success: true, result };
};
