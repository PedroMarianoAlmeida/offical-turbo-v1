import { z } from "zod";
import { formSchema } from "@/app/dashboard/new-image/step2/Step2Form";

export const maxCharacters = { step1: 300, step3: 500 };

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
    
    The answer should have the following format:
    - suggestedStyles: If the prompt doesn't suggest a specific style, suggest a few that will be a good fit for the prompt
    - suggestedReference: Based in the prompt, there is some world famous  art with similar image? Listed it in a array of strings... separate the art name and artist name
    - size: Retrieve if the prompt has some resolution that can be fit one of the options: Square: 1024 x 1024, Tall (portrait): 1024 x 1792, Wide (landscape): 1792 x 1024), if not add the value notDefined
    - questions: Extra questions that were not on the other topics... around 5 and 10, provide also an possible answer
`;

export const sendStep2AnswersSystemPrompt = `
  You will act like a Prompt Engineer, you will receive a structured data and your function is compile all the information in a new prompt that will make sense for the user and for the image generator
  - Do not include info related to resolution (size)
  - The answer should have only the new prompt in plain text without any extra data (no need of "Prompt:")
  - The prompt should be in ENGLISH and in a max of ${maxCharacters.step3} characters
`;

interface GenerateStep2AnswersUserPromptProps
  extends z.infer<typeof formSchema> {
  originalPrompt: string;
}
export const generateStep2AnswersUserPrompt = ({
  questions,
  extraInformation,
  suggestedStyle,
  originalPrompt,
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
  ${suggestedStyle ? "Style: " + suggestedStyle : null}
  ${extraInformation ? "Extra Information: " + extraInformation : null}
  `;
};
