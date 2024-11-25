"use server";
import { openai } from "@/miscellaneous/openaiConfig";
import { textOutput } from "@repo/openai/textGeneration";

export const generateResponse = async () => {
  const res = await textOutput({ openai, userPrompt: "ping" });
  return res;
};
