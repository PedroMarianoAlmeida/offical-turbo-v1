export const maxDuration = 60;

import { cookies } from "next/headers";

import { getCoreServerSession } from "@repo/next-auth/session-adapters";

import { generateObject } from "@/server-actions/ai";
import { receivingStep1Format, receivingStep1Prompt } from "@/prompts";
import { ErrorWrapper } from "@/components/layout-related/ErrorAndLoadingWrapper";
import { Step2Form } from "./Step2Form";

export default async function Step2() {
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
  const userPrompt = cookieStore.get("step1Question")?.value;
  if (userPrompt === undefined) {
    return (
      <ErrorWrapper>
        <p>Error, go back to Step 1</p>
      </ErrorWrapper>
    );
  }

  const responseAi = await generateObject({
    userPrompt,
    userId: String(userData.id),
    zodFormat: receivingStep1Format,
    systemPrompt: receivingStep1Prompt,
  });

  const { success } = responseAi;
  if (!success)
    return (
      <ErrorWrapper>
        <p>Error generating response, try refresh the page</p>
      </ErrorWrapper>
    );

  const {
    result: { questions },
  } = responseAi;

  return <Step2Form questions={questions} step1Prompt={userPrompt} />;
}
