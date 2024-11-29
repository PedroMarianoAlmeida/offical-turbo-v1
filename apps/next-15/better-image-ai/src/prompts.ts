import { z } from "zod";

export const receivingStep1Format = z.object({
  isValidPrompt: z.boolean(),
  questions: z.array(z.string()),
  suggestedStyles: z.array(z.string()),
  suggestedReference: z.array(
    z.object({
      artistName: z.string(),
      artName: z.string(),
    })
  ),
  hasSize: z.boolean(),
  ambiguitySolve: z.array(z.string()),
});

export const receivingStep1Prompt = `
    You will act like a Prompt Engineer, you will receive a text to generate an image, and make some question to get a better prompt for the image. The questions should be in the same language that it is on the user prompt
    The answer should have the following format:
    isValidPrompt: If the prompt contains content that cannot be generated according the guidelines of DALL·E 3 policies, keep all the other fields empty (since they are arrays, an empty array)
    suggestedStyles: If the prompt doesn't suggest a specific style, suggest a few that will be a good fit for the prompt
    suggestedReference: Based in the prompt, there is some world famous  art with similar image? Listed it in a array of strings... separate the art name and artist name
    hasSize: Check if in the prompt has specific size (like 1080x 1080) or at least "square", "facebook cover format", something like that
    ambiguitySolve: The prompt can lead to ambiguity result? If yes provide questions to solve the ambiguity... if not return an empty array
    questions: Extra questions that were not on the other topics... around 5 and 10
`;
