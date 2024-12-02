import React from "react";

export function ProgressBar({
  currentStep,
  numberOfSteps,
  children,
  className,
  ...props
}: {
  currentStep: number;
  numberOfSteps: number;
  children?: React.ReactNode;
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
        {Array.from({ length: numberOfSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`w-6 h-6 rounded-full flex justify-center items-center ${activeColor(
                index - 1
              )}`}
            >
              <div
                className={`w-4 h-4 rounded-full ${activeColor(index)}`}
              ></div>
            </div>
            {isFinalStep(index) ? null : (
              <div className={`w-12 h-1 ${activeColor(index)}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      {children}
    </div>
  );
}
