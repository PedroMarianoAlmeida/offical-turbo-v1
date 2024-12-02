export const maxDuration = 60;
import { cookies } from "next/headers";
// import { z } from "zod";

import { getCoreServerSession } from "@repo/next-auth/session-adapters";

import { generateImage } from "@/server-actions/ai";
import { ErrorWrapper } from "@/components/layout-related/ErrorAndLoadingWrapper";
// import { formSchema } from "@/app/dashboard/new-image/step2/Step2Form";
import { Result } from "./result";

export default async function Step4() {
  // This is not suppose to be necessary, the dashboard layout already verify if the user is logged, but I don't know how to retrieve this data here
  const { userData } = await getCoreServerSession();
  if (!userData) {
    return (
      <ErrorWrapper>
        <p>Error, go back to Step 3</p>
      </ErrorWrapper>
    );
  }

  const cookieStore = await cookies();
  const userPromptStep1 = cookieStore.get("step1Question")?.value;
  const userAnswersStep2 = cookieStore.get("step2Question")?.value;
  const lastPromptStep3 = cookieStore.get("step3Question")?.value;

  if (
    userPromptStep1 === undefined ||
    lastPromptStep3 === undefined ||
    userAnswersStep2 === undefined
  ) {
    return (
      <ErrorWrapper>
        <p>Error, go back to Step 3</p>
      </ErrorWrapper>
    );
  }

  // const { size } = JSON.parse(userAnswersStep2) as z.infer<typeof formSchema>;

  const imageOriginalPrompt = generateImage({
    userPrompt: userPromptStep1,
    userId: String(userData.id),
    // size,
  });

  const imageFinalPrompt = generateImage({
    userPrompt: lastPromptStep3,
    userId: String(userData.id),
    //size,
  });

  const [originalRes, finalRes] = await Promise.all([
    imageOriginalPrompt,
    imageFinalPrompt,
  ]);

  if (!originalRes.success || !finalRes.success) {
    return (
      <ErrorWrapper>
        <p>Error generating response, try refresh the page</p>
      </ErrorWrapper>
    );
  }

  return (
    <Result
      finalPrompt={lastPromptStep3}
      finalSrc={finalRes.result}
      originalPrompt={userPromptStep1}
      originalSrc={originalRes.result}
    />
  );
}
