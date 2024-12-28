"use server";
import { getCoreServerSession } from "@repo/next-auth/session-adapters";
import { asyncWrapper } from "@repo/core-main/asyncWrapper";

import { getUserCountUsageForToday } from "@/prisma/userCount";

export const getDailyUsageWithoutUser = async () => {
  return asyncWrapper(async () => {
    const session = await getCoreServerSession();
    if (!session.hasUser) return null;
    const count = await getUserCountUsageForToday({
      userId: String(session.userData.id),
    });
    if (!count.success) throw Error("Error getting count");
    return count.result
  });
};
