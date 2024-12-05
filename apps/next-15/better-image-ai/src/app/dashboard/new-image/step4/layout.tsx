import { WithChildren } from "@repo/core-main/types";
import { ProgressBar } from "@repo/shadcn/progress-bar";

import { en } from "@/i18n/en";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${en.steps.step4.title} | Better Image AI`,
};

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
