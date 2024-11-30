import { cookies } from "next/headers";
import { z } from "zod";

import { getCoreServerSession } from "@repo/next-auth/session-adapters";

import { generateResponse } from "@/server-actions/ai";
import { ErrorWrapper } from "@/components/layout-related/ErrorAndLoadingWrapper";
import { formSchema } from "@/app/dashboard/new-image/step2/Step2Form";
import {
  generateStep2AnswersUserPrompt,
  sendStep2AnswersSystemPrompt,
} from "@/prompts";
import { Step3Form } from "./Step3Form";

export default async function Step3() {
  // This is not suppose to be necessary, the dashboard layout already verify if the user is logged, but I don't know how to retrieve this data here
  const { userData } = await getCoreServerSession();
  if (!userData) {
    return (
      <ErrorWrapper>
        <p>Error, go back to Step 1</p>
      </ErrorWrapper>
    );
  }

  const cookieStore = await cookies();
  const userPromptStep1 = cookieStore.get("step1Question")?.value;
  const userAnswersStep2 = cookieStore.get("step2Question")?.value;

  if (userPromptStep1 === undefined || userAnswersStep2 === undefined) {
    return (
      <ErrorWrapper>
        <p>Error, go back to Step 2</p>
      </ErrorWrapper>
    );
  }
  const userAnswersStep2Parsed = JSON.parse(userAnswersStep2) as z.infer<
    typeof formSchema
  >;

  const responseAi = await generateResponse({
    userPrompt: sendStep2AnswersSystemPrompt,
    userId: String(userData.id),
    systemPrompt: generateStep2AnswersUserPrompt({
      ...userAnswersStep2Parsed,
      originalPrompt: userPromptStep1,
    }),
  });

  const { success } = responseAi;
  if (!success)
    return (
      <ErrorWrapper>
        <p>Error generating response, try refresh the page</p>
      </ErrorWrapper>
    );

  return (
    <Step3Form
      aiGeneratedPrompt={responseAi.result}
      originalIdea={userPromptStep1}
    />
  );
}
