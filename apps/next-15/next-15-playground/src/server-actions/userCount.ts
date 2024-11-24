"use server";
import { database } from "../miscellaneous/firebaseConfig";
import { incrementUserCountUsage } from "@repo/firebase/userCount";
import { projectName } from "@/miscellaneous/constants";

export const appIncrementUserCountUsage = async (userId: string) => {
  const res = await incrementUserCountUsage({
    database,
    userId,
    project: projectName,
  });
  return res;
};
