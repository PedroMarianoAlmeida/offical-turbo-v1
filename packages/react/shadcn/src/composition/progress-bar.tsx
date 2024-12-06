import React from "react";

import { WithChildren } from "@repo/core-main/types";

export function ProgressBar({
  currentStep,
  numberOfSteps,
  children,
  className,
  steps,
  ...props
}: {
  currentStep: number;
  numberOfSteps: number;
  children?: React.ReactNode;
  steps?: React.ElementType<WithChildren>[];
} & React.HTMLAttributes<HTMLDivElement>) {
  const activeColor = (index: number) =>
    currentStep > index + 1 ? "bg-primary" : "bg-accent";
  const isFinalStep = (index: number) => index === numberOfSteps - 1;

  return (
    <div
      className={`flex flex-col gap-3 my-5 items-center${className ?? ""}`}
      {...props}
    >
      <div className="flex items-center">
        {Array.from({ length: numberOfSteps }).map((_, index) => {
          const StepWrapper =
            steps?.[index] || (({ children }) => <div>{children}</div>);

          return (
            <React.Fragment key={index}>
              <div
                className={`w-6 h-6 rounded-full flex justify-center items-center ${activeColor(
                  index - 1
                )}`}
              >
                <StepWrapper>
                  <div
                    className={`w-4 h-4 rounded-full ${activeColor(index)}`}
                  />
                </StepWrapper>
              </div>
              {isFinalStep(index) ? null : (
                <div className={`w-12 h-1 ${activeColor(index)}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {children}
    </div>
  );
}
