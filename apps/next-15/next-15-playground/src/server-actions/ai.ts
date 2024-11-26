"use server";
import { openai } from "@/miscellaneous/openaiConfig";
import { textOutput } from "@repo/openai/textGeneration";
import { generateImage as generateImageOpenai } from "@repo/openai/imageGeneration";
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
