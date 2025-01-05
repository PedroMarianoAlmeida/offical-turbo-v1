import { z } from "zod";
import type { Question, Flow } from "@prisma/client";

export const maxCharacters = { step1: 300, step3: 1000 };

export const receivingStep1Format = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
  suggestedStyles: z.array(z.string()),
});

export const receivingStep1Prompt = `
    You will act like a Prompt Engineer, you will receive a text to generate an image, and make some questions to get a better prompt for the image.
    Attention for the following:
    - The questions should be in ENGLISH
    - If there is some ambiguity on the text, make question for clarification
    - Around 5 and 10 questions, provide also an possible answer
    - suggestedStyles: If the prompt doesn't suggest a specific style, suggest a few that will be a good fit for the prompt
`;

export const sendStep2AnswersSystemPrompt = `
  You are a Prompt Engineer. Your sole task is to generate a single, plain text prompt based on the provided structured data. 
  - The response must strictly be the new prompt in English.
  - Do not include explanations, acknowledgments, or any text other than the compiled prompt itself.
  - The compiled prompt must not exceed ${maxCharacters.step3} characters.
  - Ensure the prompt is meaningful, concise, and designed for an image generator.
  - Any deviation from this format will be considered incorrect. Only return the new prompt.
`;

interface GenerateStep2AnswersUserPromptProps {
  questions: Question[];
  originalPrompt: Flow["originalPrompt"];
  suggestedStyles: Question | null;
  extraThought: Question | null;
  loading?: true;
}

export const generateStep2AnswersUserPrompt = ({
  questions,
  extraThought,
  originalPrompt,
  suggestedStyles,
}: GenerateStep2AnswersUserPromptProps) => {
  const questionAnswersTreated = questions
    .filter(({ answer }) => answer)
    .map(
      ({ question, answer }) => `
    Question: ${question}
    Answer: ${answer}`
    );

  const questionsTreated =
    questionAnswersTreated.length > 0
      ? `Questions: ${questionAnswersTreated}`
      : null;

  return `
  Original Prompt: ${originalPrompt}
  ${questionsTreated}
  ${suggestedStyles ? "Style: " + suggestedStyles.answer : null}
  ${extraThought ? "Extra Information: " + extraThought.answer : null}
  `;
};
