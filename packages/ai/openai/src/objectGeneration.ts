import { zodResponseFormat } from "openai/helpers/zod";
import { z, type ZodTypeAny } from "zod";
import { type OpenAI } from "openai";
import { asyncWrapper } from "@repo/core-main/asyncWrapper";

interface GeneratePromptProps {
  openai: OpenAI;
  userPrompt: string;
  zodFormat: ZodTypeAny;
  systemPrompt?: string;
}

// When use it is necessary to type on APP side
export const objectGeneration = async ({
  openai,
  userPrompt,
  zodFormat,
  systemPrompt,
}: GeneratePromptProps) => {
  return asyncWrapper(async () => {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: systemPrompt || "You are a helpful assistant.",
        },
        { role: "user", content: userPrompt },
      ],
      response_format: zodResponseFormat(zodFormat, "event"),
    });

    const event = completion.choices[0].message.parsed;

    return event;
  });
};
