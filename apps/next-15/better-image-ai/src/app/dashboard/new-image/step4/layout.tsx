import { WithChildren } from "@repo/core-main/types";
import { ProgressBar } from "@repo/shadcn/progress-bar";

export default function Step1Layout({ children }: WithChildren) {
  return (
    <>
      <ProgressBar currentStep={4} numberOfSteps={4}>
        <h1>Get your Images</h1>
      </ProgressBar>
      {children}
      <p>
        Note: The goal is not to compare the &quot;best image&quot;, but the
        most aligned with your thoughts (both are generate by the same tool)
      </p>
    </>
  );
}
