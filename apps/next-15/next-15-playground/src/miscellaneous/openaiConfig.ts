import { initializeOpenai } from "@repo/openai/initializeOpenai";

export const { openai } =  initializeOpenai({
  organization: process.env.OPENAI_API_ORGANIZATION ?? "",
  apiKey: process.env.OPENAI_API_KEY ?? "",
});
