import { WithChildren } from "@repo/core-main/types";
import { ProgressBar } from "@repo/shadcn/progress-bar";

export default function Step1Layout({ children }: WithChildren) {
  return (
    <>
      <ProgressBar currentStep={3} numberOfSteps={4}>
        <h1>Revise Prompt</h1>
      </ProgressBar>
      {children}
    </>
  );
}
