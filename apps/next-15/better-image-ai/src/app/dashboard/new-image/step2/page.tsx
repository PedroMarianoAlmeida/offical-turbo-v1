export const maxDuration = 60;

import { getCoreServerSession } from "@repo/next-auth/session-adapters";

import { ErrorWrapper } from "@/components/layout-related/ErrorAndLoadingWrapper";
import { receiveQuestions } from "@/server-actions/flow";
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

  const res = await receiveQuestions();
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

  const {
    result: { originalPrompt, questions, suggestedStyle },
  } = res;

  return (
    <Step2Form
      questions={questions}
      step1Prompt={originalPrompt}
      suggestedStyles={suggestedStyle}
    />
  );
}
