"use server";
import { cookies } from "next/headers";

export const setServerSideCookie = async ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
  return { success: true, result: null };
};
