export const maxDuration = 60;

import { getCoreServerSession } from "@repo/next-auth/session-adapters";

import { ErrorWrapper } from "@/components/layout-related/ErrorAndLoadingWrapper";
import { Step3Form } from "./Step3Form";
import { getQuestionsAndGenerateNewPrompt } from "@/server-actions/flow";

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

  const res = await getQuestionsAndGenerateNewPrompt();
  if (!res.success) {
    return (
      <ErrorWrapper>
        <p>
          {res.message === "User reached daily usage limit"
            ? res.message
            : "Error, go back to Step 1"}
        </p>
      </ErrorWrapper>
    );
  }

  const { aiGeneratedPrompt, originalPrompt, userModifiedPrompt } = res.result;
  return (
    <Step3Form
      aiGeneratedPrompt={aiGeneratedPrompt}
      originalIdea={originalPrompt}
      userModifiedPrompt={userModifiedPrompt}
    />
  );
}
