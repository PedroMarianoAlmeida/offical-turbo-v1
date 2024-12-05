import { UserData } from "@repo/core-main/types";
import { reachLimit } from "@repo/core-main/numbers";
import {
  ProtectedWithRedirect,
  ProtectedWithFallback,
} from "@repo/next-auth/protected";
import { getUserCountUsageForToday } from "@repo/firebase/userCount";
import { Button } from "@repo/shadcn/button";

import { database } from "@/configs/firebaseConfig";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard| Better Image AI",
};

const UserValidated = async ({
  userData,
  children,
}: {
  userData: UserData;
  children: React.ReactNode;
}) => {
  const { id } = userData;
  const usageCount = process.env.DAILY_COUNT_DEV_ONLY
    ? { success: true, result: Number(process.env.DAILY_COUNT_DEV_ONLY) }
    : await getUserCountUsageForToday({
        userId: id.toString(),
        database,
        project: process.env.PROJECT_NAME,
      });

  let forceFallback = false;
  let fallbackMessage: React.ReactNode = "";
  let dailyUsageOut = 0;

  if (!usageCount.success) {
    forceFallback = true;
    fallbackMessage = "Error fetching user limit";
  } else {
    dailyUsageOut = usageCount.result;
    if (
      reachLimit({
        currentUsage: dailyUsageOut,
        limit: Number(process.env.DAILY_LIMIT),
      })
    ) {
      forceFallback = true;
      fallbackMessage = (
        <main>
          <Button disabled>Generate New Image</Button>
          <p>
            You cannot generate more images today try tomorrow (you reach the
            daily limit)
          </p>
        </main>
      );
    }
  }

  return (
    <ProtectedWithFallback
      fallback={fallbackMessage}
      forceFallback={forceFallback}
    >
      {children}
    </ProtectedWithFallback>
  );
};

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedWithRedirect>
      {(userData) => {
        return <UserValidated userData={userData}>{children}</UserValidated>;
      }}
    </ProtectedWithRedirect>
  );
};

export default DashboardLayout;
