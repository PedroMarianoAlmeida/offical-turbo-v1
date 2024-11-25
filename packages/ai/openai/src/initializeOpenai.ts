import OpenAI from "openai";

interface OpenAiConfig {
  organization: string;
  apiKey: string;
}

export const initializeOpenai = ({ apiKey, organization }: OpenAiConfig) => {
  const openai = new OpenAI({
    organization,
    apiKey,
  });

  return { openai };
};
