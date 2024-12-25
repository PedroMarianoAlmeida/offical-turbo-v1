import {
  type AsyncWrapperResponse,
  asyncWrapper,
} from "@repo/core-main/asyncWrapper";

import { reachLimit } from "@repo/core-main/numbers";
import { areInTheSameDay } from "@repo/core-main/dates";

import prisma from "@/config/prisma";

export const getUserCountUsageForToday = async ({
  userId,
}: {
  userId: string;
}) => {
  return asyncWrapper(async () => {
    let dailyCount = 0;
    const usage = await prisma.dailyUsage.findUnique({
      where: { userId },
    });

    if (usage) {
      const { count, lastUsage } = usage;
      if (lastUsage && !areInTheSameDay(new Date(lastUsage), new Date())) {
        return 0;
      }
      return count;
    } else dailyCount = 0;
    return dailyCount;
  });
};

const incrementUserCountUsage = async ({ userId }: { userId: string }) => {
  return asyncWrapper(async () => {
    const currentUsage = await getUserCountUsageForToday({
      userId,
    });

    if (currentUsage.success) {
      const upsertUser = await prisma.dailyUsage.upsert({
        where: { userId },
        update: {
          lastUsage: new Date(),
          count: currentUsage.result + 1,
        },
        create: {
          userId,
          lastUsage: new Date(),
          count: currentUsage.result + 1,
        },
      });
    }
  });
};

interface ActionWithDailyRateLimitProps<T> {
  rateLimit: number;
  callback(): Promise<AsyncWrapperResponse<T>>;
  userId: string;
}

export const actionWithDailyRateLimit = async <T>({
  rateLimit,
  userId,

  callback,
}: ActionWithDailyRateLimitProps<T>): Promise<AsyncWrapperResponse<T>> => {
  return asyncWrapper(async () => {
    const count = await getUserCountUsageForToday({
      userId,
    });

    if (!count.success) {
      throw new Error("Error reaching count");
    }

    if (reachLimit({ currentUsage: count.result, limit: rateLimit })) {
      throw new Error("User reached daily usage limit");
    }

    const callbackResult = await callback();

    if (!callbackResult.success) {
      throw new Error(callbackResult.message);
    }

    await incrementUserCountUsage({ userId });
    return callbackResult.result;
  });
};
