import { redirect } from "next/navigation";
import { UserData } from "@repo/core-main/types";
import { getCoreServerSession } from "./session-adapters";

interface ProtectedWithRedirectProps {
  redirectTo?: string;
  children: ((userData: UserData) => React.ReactNode) | React.ReactNode;
  forceRedirect?: boolean;
}
export const ProtectedWithRedirect = async ({
  children,
  redirectTo = "/",
  forceRedirect = false,
}: ProtectedWithRedirectProps) => {
  const auth = await getCoreServerSession();
  if (!forceRedirect && auth.hasUser) {
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
  forceFallback?: boolean;
}
export const ProtectedWithFallback = async ({
  children,
  fallback,
  forceFallback = false,
}: ProtectedWithFallbackProps) => {
  const auth = await getCoreServerSession();
  if (!forceFallback && auth.hasUser) {
    const { userData } = auth;
    if (typeof children === "function") {
      return <>{children(userData)}</>;
    }
    return <>{children}</>;
  }
  return <>{fallback}</>;
};
