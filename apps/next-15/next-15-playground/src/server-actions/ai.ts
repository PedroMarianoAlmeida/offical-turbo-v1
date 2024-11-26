"use server";
import { openai } from "@/miscellaneous/openaiConfig";
import { textOutput } from "@repo/openai/textGeneration";
import { generateImage as generateImageOpenai } from "@repo/openai/imageGeneration";
import { actionWithDailyRateLimit } from "@repo/firebase/userCount";

import { projectName, dailyLimit } from "@/miscellaneous/constants";
import { database } from "@/miscellaneous/firebaseConfig";

export const generateResponse = async ({ userId }: { userId: string }) => {
  const outRes = await actionWithDailyRateLimit({
    project: projectName,
    database,
    rateLimit: dailyLimit,
    userId,
    callback: () => textOutput({ openai, userPrompt: "ping" }),
  });
  if (!outRes.success) {
    return { success: false, message: outRes.message };
  }
  const { result: innerRes } = outRes;
  if (!innerRes.success) return { success: false, message: innerRes.message };
  const { result } = innerRes;

  return { success: true, result };
};

export const generateImage = async ({ userId }: { userId: string }) => {
  const outRes = await actionWithDailyRateLimit({
    project: projectName,
    database,
    rateLimit: dailyLimit,
    userId,
    callback: () =>
      generateImageOpenai({ openai, imageDescription: "5 balls" }),
  });
  if (!outRes.success) {
    return { success: false, message: outRes.message };
  }
  const { result: innerRes } = outRes;
  if (!innerRes.success) return { success: false, message: innerRes.message };
  const { url } = innerRes.result;

  return { success: true, result: url };
};
