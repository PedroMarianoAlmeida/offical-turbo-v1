import { redirect } from "next/navigation";
import { WithChildren } from "@repo/core-main/types";
import { getCoreServerSession } from "./session-adapters";

interface ProtectedProps extends WithChildren {
  redirectTo?: string;
}
export const Protected = async ({
  children,
  redirectTo = "/",
}: ProtectedProps) => {
  const auth = await getCoreServerSession();
  if (auth.hasUser) {
    return <>{children}</>;
  }
  redirect(redirectTo);
};
