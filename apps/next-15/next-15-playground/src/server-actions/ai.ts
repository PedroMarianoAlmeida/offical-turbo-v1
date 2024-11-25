"use server";
import { openai } from "@/miscellaneous/openaiConfig";
import { textOutput } from "@repo/openai/textGeneration";
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

  return { success: true, result: outRes.result };
};
