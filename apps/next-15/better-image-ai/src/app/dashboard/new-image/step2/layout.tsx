import { WithChildren } from "@repo/core-main/types";
import { ProgressBar } from "@repo/shadcn/progress-bar";

export default function Step2Layout({ children }: WithChildren) {
  return (
    <>
      <ProgressBar currentStep={2} numberOfSteps={4}>
        <h1>Refine Prompt</h1>
      </ProgressBar>
      {children}
    </>
  );
}
