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

const updateUserCountUsage = async ({
  userId,
  newValue,
}: {
  userId: string;
  newValue: number;
}) => {
  return asyncWrapper(async () => {
    await prisma.dailyUsage.upsert({
      where: { userId },
      update: {
        lastUsage: new Date(),
        count: newValue,
      },
      create: {
        userId,
        lastUsage: new Date(),
        count: newValue,
      },
    });
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

    await updateUserCountUsage({ userId, newValue: count.result + 1 });
    return callbackResult.result;
  });
};
