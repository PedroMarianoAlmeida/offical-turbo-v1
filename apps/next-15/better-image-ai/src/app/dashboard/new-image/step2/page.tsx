import { cookies } from "next/headers";

import { getCoreServerSession } from "@repo/next-auth/session-adapters";

import { generateObject } from "@/server-actions/ai";
import { receivingStep1Format, receivingStep1Prompt } from "@/prompts";

export default async function Step2() {
  const { userData } = await getCoreServerSession();
  if (!userData) {
    return <p>Error, go back to Step 1</p>;
  }

  const cookieStore = await cookies();
  const userPrompt = cookieStore.get("step1")?.value;
  if (userPrompt === undefined) {
    return <p>Error, go back to Step 1</p>;
  }

  const responseAi = await generateObject({
    userPrompt,
    userId: String(userData.id),
    zodFormat: receivingStep1Format,
    systemPrompt: receivingStep1Prompt,
  });

  const { success } = responseAi;
  if (!success) return <p>Error generating response, try refresh the page</p>;
  const {
    result: {
      hasSize,
      isValidPrompt,
      questions,
      suggestedReference,
      suggestedStyles,
    },
  } = responseAi;

  if (!isValidPrompt)
    return (
      <p>
        This prompt cannot generate an Image because is not following the model
        policies, go back to step 1
      </p>
    );

  console.log(responseAi);
  return <>{userPrompt}</>;
}
