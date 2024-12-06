import Link from "next/link";

import { WithChildren } from "@repo/core-main/types";
import { ProgressBar } from "@repo/shadcn/progress-bar";

import { en } from "@/i18n/en";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${en.steps.step3.title} | Better Image AI`,
};

export default function Step3Layout({ children }: WithChildren) {
  return (
    <>
      <ProgressBar
        currentStep={3}
        numberOfSteps={4}
        steps={[
          ({ children }) => (
            <Link href="/dashboard/new-image/step1">{children}</Link>
          ),
          ({ children }) => (
            <Link href="/dashboard/new-image/step2">{children}</Link>
          ),
        ]}
      >
        <h1>{en.steps.step3.title}</h1>
      </ProgressBar>
      {children}
    </>
  );
}
