import {
  get,
  set,
  ref,
  type DataSnapshot,
  type Database,
} from "firebase/database";
import {
  asyncWrapper,
  asyncWrapperResponse,
} from "@repo/core-main/asyncWrapper";
import { areInTheSameDay } from "@repo/core-main/dates";

const sanitizeUserCount = (
  user: DataSnapshot
): { lastUsage: number; dailyUsage: number } => {
  const lastUsage = user.child("lastUsage").val();
  const dailyUsage = user.child("dailyUsage").val();

  if (typeof lastUsage !== "number") throw new Error();
  if (typeof dailyUsage !== "number") throw new Error();

  return { lastUsage, dailyUsage };
};
interface UserAndDatabase {
  project?: string;
  userId: string;
  database: Database;
}

const getQuery = ({
  userId,
  project,
}: {
  userId: string;
  project?: string;
}) => {
  return `${project ? project + "-" : ""}user-count/${userId}`;
};

export const getUserCountUsageForToday = async ({
  database,
  userId,
  project,
}: UserAndDatabase) => {
  return asyncWrapper(async () => {
    const userRef = ref(database, getQuery({ userId, project }));
    const existentUser = await get(userRef);
    if (!existentUser.exists()) {
      return 0;
    }

    const { dailyUsage, lastUsage } = sanitizeUserCount(existentUser);

    if (lastUsage && !areInTheSameDay(new Date(lastUsage), new Date())) {
      return 0;
    }

    return dailyUsage;
  });
};

export const incrementUserCountUsage = async ({
  database,
  userId,
  project,
}: UserAndDatabase) => {
  return asyncWrapper(async () => {
    const currentUsage = await getUserCountUsageForToday({
      database,
      userId,
      project,
    });

    if (!currentUsage.success) return new Error();
    const { result: dailyUsage } = currentUsage;
    set(ref(database, getQuery({ userId, project })), {
      dailyUsage: dailyUsage + 1,
      lastUsage: Number(new Date()),
    });
  });
};

interface ActionWithDailyRateLimitProps<T> extends UserAndDatabase {
  rateLimit: number;
  callback(): Promise<T>;
}
export const actionWithDailyRateLimit = async <T>({
  database,
  rateLimit,
  userId,
  project,
  callback,
}: ActionWithDailyRateLimitProps<T>): Promise<asyncWrapperResponse<T>> => {
  return asyncWrapper(async () => {
    const count = await getUserCountUsageForToday({
      database,
      userId,
      project,
    });

    if (!count.success) throw new Error("Error to reach count");
    if (rateLimit <= count.result)
      throw new Error("User reached daily usage limit");

    const callbackResult = await asyncWrapper(callback);
    if (!callbackResult.success) throw new Error("Callback error");
    await incrementUserCountUsage({ database, userId, project });
    return callbackResult.result;
  });
};
