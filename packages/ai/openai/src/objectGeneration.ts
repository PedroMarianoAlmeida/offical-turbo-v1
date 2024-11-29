import { zodResponseFormat } from "openai/helpers/zod";
import { z, type ZodTypeAny } from "zod";
import { type OpenAI } from "openai";
import { asyncWrapper } from "@repo/core-main/asyncWrapper";

export interface GeneratePromptProps {
  openai: OpenAI;
  userPrompt: string;
  zodFormat: ZodTypeAny;
  systemPrompt?: string;
}

export const objectGeneration = async <T extends ZodTypeAny>({
  openai,
  userPrompt,
  zodFormat,
  systemPrompt,
}: GeneratePromptProps & { zodFormat: T }): Promise<z.infer<T>> => {
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

    return zodFormat.parse(event);
  });
};
