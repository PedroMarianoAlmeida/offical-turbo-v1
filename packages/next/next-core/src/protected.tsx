import { redirect } from "next/navigation";
import { CoreSession, UserData } from "@repo/core-main/types";

interface ProtectedWithRedirectProps {
  redirectTo?: string;
  children: ((userData: UserData) => React.ReactNode) | React.ReactNode;
  forceRedirect?: boolean;
  auth: CoreSession;
}
export const ProtectedWithRedirect = async ({
  children,
  redirectTo = "/",
  forceRedirect = false,
  auth,
}: ProtectedWithRedirectProps) => {
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
  fallback: React.ReactNode;
  children: ((userData: UserData) => React.ReactNode) | React.ReactNode;
  forceFallback?: boolean;
  auth: CoreSession;
}
export const ProtectedWithFallback = async ({
  children,
  fallback,
  forceFallback = false,
  auth,
}: ProtectedWithFallbackProps) => {
  if (!forceFallback && auth.hasUser) {
    const { userData } = auth;
    if (typeof children === "function") {
      return <>{children(userData)}</>;
    }
    return <>{children}</>;
  }
  return <>{fallback}</>;
};
