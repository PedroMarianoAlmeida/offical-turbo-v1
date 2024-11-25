import { type OpenAI } from "openai";

import { asyncWrapper } from "@repo/core-main/asyncWrapper";

interface GeneratePromptProps {
  openai: OpenAI;
  userPrompt: string;
  systemPrompt?: string;
}

export const textOutput = async ({
  openai,
  userPrompt,
  systemPrompt,
}: GeneratePromptProps) => {
  return asyncWrapper(async () => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt || "You are a helpful assistant.",
        },
        { role: "user", content: userPrompt },
      ],
      model: "gpt-3.5-turbo",
    });

    const { choices } = completion;
    const { message } = choices[0];
    const { content } = message;
    if(content === null) throw new Error("No content on response");
    return content;
  });
};
