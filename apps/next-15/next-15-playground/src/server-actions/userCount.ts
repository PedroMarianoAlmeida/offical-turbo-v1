"use server";
import { database } from "../../firebaseConfig";
import { incrementUserCountUsage } from "@repo/firebase/userCount";
import { projectName } from "@/constants";

export const appIncrementUserCountUsage = async (userId: string) => {
  const res = await incrementUserCountUsage({
    database,
    userId,
    project: projectName,
  });
  return res;
};
