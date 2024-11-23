import {
  get,
  set,
  ref,
  type DataSnapshot,
  type Database,
} from "firebase/database";
import { asyncWrapper } from "@repo/core-main/asyncWrapper";
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
  userId: string;
  database: Database;
}
export const getUserCountUsageForToday = async ({
  database,
  userId,
}: UserAndDatabase) => {
  return asyncWrapper(async () => {
    const userRef = ref(database, `users/${userId}`);
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
}: UserAndDatabase) => {
  return asyncWrapper(async () => {
    const currentUsage = await getUserCountUsageForToday({ database, userId });

    if (!currentUsage.success) return new Error();
    const { result: dailyUsage } = currentUsage;
    set(ref(database, `users/${userId}`), {
      dailyUsage: dailyUsage + 1,
      lastUsage: Number(new Date()),
    });
  });
};
