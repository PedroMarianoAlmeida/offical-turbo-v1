import { WithChildren } from "@repo/core-main/types";
import { ProgressBar } from "@repo/shadcn/progress-bar";

import { en } from "@/i18n/en";

export default function Step1Layout({ children }: WithChildren) {
  return (
    <>
      <ProgressBar currentStep={4} numberOfSteps={4}>
        <h1>{en.steps.step4.title}</h1>
      </ProgressBar>
      {children}
    </>
  );
}
