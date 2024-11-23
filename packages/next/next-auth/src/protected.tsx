import { redirect } from "next/navigation";
import { CoreSession, UserData } from "@repo/core-main/types";
import { getCoreServerSession } from "./session-adapters";

interface ProtectedProps {
  redirectTo?: string;

  children: ((userData: UserData) => React.ReactNode) | React.ReactNode;
}
export const Protected = async ({
  children,
  redirectTo = "/",
}: ProtectedProps) => {
  const auth = await getCoreServerSession();
  if (auth.hasUser) {
    const { userData } = auth;
    if (typeof children === "function") {
      return <>{children(userData)}</>;
    }
    return <>{children}</>;
  }
  redirect(redirectTo);
};
