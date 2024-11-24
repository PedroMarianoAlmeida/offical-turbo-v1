import { redirect } from "next/navigation";
import { UserData } from "@repo/core-main/types";
import { getCoreServerSession } from "./session-adapters";

interface ProtectedWithRedirectProps {
  redirectTo?: string;
  children: ((userData: UserData) => React.ReactNode) | React.ReactNode;
  extraProtectCondition?: boolean;
}
export const ProtectedWithRedirect = async ({
  children,
  redirectTo = "/",
  extraProtectCondition = false,
}: ProtectedWithRedirectProps) => {
  const auth = await getCoreServerSession();
  if (auth.hasUser && extraProtectCondition) {
    const { userData } = auth;
    if (typeof children === "function") {
      return <>{children(userData)}</>;
    }
    return <>{children}</>;
  }
  redirect(redirectTo);
};

interface ProtectedWithFallbackProps {
  fallback: ((userData: UserData) => React.ReactNode) | React.ReactNode;
  children: ((userData: UserData) => React.ReactNode) | React.ReactNode;
  extraProtectCondition?: boolean;
}
export const ProtectedWithFallback = async ({
  children,
  fallback,
  extraProtectCondition,
}: ProtectedWithFallbackProps) => {
  const auth = await getCoreServerSession();
  if (auth.hasUser && extraProtectCondition) {
    const { userData } = auth;
    if (typeof children === "function") {
      return <>{children(userData)}</>;
    }
    return <>{children}</>;
  }
  return <>{fallback}</>;
};
