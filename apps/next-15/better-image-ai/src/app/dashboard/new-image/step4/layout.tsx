import Link from "next/link";

import { WithChildren } from "@repo/core-main/types";
import { ProgressBar } from "@repo/shadcn/progress-bar";

import { en } from "@/i18n/en";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${en.steps.step4.title} | Better Image AI`,
};

export default function Step4Layout({ children }: WithChildren) {
  return (
    <>
      <ProgressBar
        currentStep={4}
        numberOfSteps={4}
        steps={[
          ({ children }) => (
            <Link href="/dashboard/new-image/step1">{children}</Link>
          ),
          ({ children }) => (
            <Link href="/dashboard/new-image/step2">{children}</Link>
          ),
          ({ children }) => (
            <Link href="/dashboard/new-image/step3">{children}</Link>
          ),
        ]}
      >
        <h1>{en.steps.step4.title}</h1>
      </ProgressBar>
      {children}
      <p className="mt-10 text-center">
        Need help? Check the{" "}
        <Link href="/tutorial" className="underline">
          tutorial page
        </Link>
      </p>
    </>
  );
}
