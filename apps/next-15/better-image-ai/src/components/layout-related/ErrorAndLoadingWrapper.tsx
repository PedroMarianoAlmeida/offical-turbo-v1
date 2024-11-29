import { WithChildren } from "@repo/core-main/types";

export const ErrorWrapper = ({ children }: WithChildren) => {
  return (
    <>
      <p>Error, message:</p>
      {children}
    </>
  );
};

export const LoadingWrapper = ({ children }: WithChildren) => {
  return (
    <>
      <p>Loading...</p>
      {children}
    </>
  );
};
