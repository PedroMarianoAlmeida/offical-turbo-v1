"use server";
import { z, ZodTypeAny } from "zod";

import {
  objectGeneration,
  GeneratePromptProps,
} from "@repo/openai/objectGeneration";
// import { generateImage as generateImageOpenai } from "@repo/openai/imageGeneration";
import { textOutput } from "@repo/openai/textGeneration";
import { actionWithDailyRateLimit } from "@repo/firebase/userCount";
import { type asyncWrapperResponse } from "@repo/core-main/asyncWrapper";

import { openai } from "@/configs/openaiConfig";
import { database } from "@/configs/firebaseConfig";

const project = process.env.PROJECT_NAME;
const rateLimit = Number(process.env.DAILY_LIMIT);

// Maybe type this response when use it
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
}: GenerateObjectProps<T>): Promise<asyncWrapperResponse<z.infer<T>>> => {
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
}: GenerateTextProps): Promise<asyncWrapperResponse<string>> => {
  const data = await actionWithDailyRateLimit({
    project: process.env.PROJECT_NAME,
    database,
    rateLimit: Number(process.env.DAILY_LIMIT),
    userId,
    callback: () => textOutput({ openai, userPrompt, systemPrompt }),
  });
  if (!data.success) {
    return { success: false, message: data.message };
  }

  return { success: true, result: data.result };
};

// export const generateImage = async ({
//   userId,
// }: {
//   userId: string;
// }): Promise<asyncWrapperResponse<string>> => {
//   const data = await actionWithDailyRateLimit({
//     project: projectName,
//     database,
//     rateLimit: dailyLimit,
//     userId,
//     callback: () =>
//       generateImageOpenai({ openai, imageDescription: "5 balls" }),
//   });
//   if (!data.success) {
//     return { success: false, message: data.message };
//   }

//   const { url } = data.result;
//   if (!url) return { success: false, message: "No photo on response" };

//   return { success: true, result: url };
// };
