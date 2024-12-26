"use server";

import { setServerSideCookie } from "@/server-actions/cookies";
import { getCoreServerSession } from "@repo/next-auth/session-adapters";
import { asyncWrapper } from "@repo/core-main/asyncWrapper";

import prisma from "@/config/prisma";

export const startFlowWithPrompt = async ({
  originalPrompt,
}: {
  originalPrompt: string;
}) => {
  return asyncWrapper(async () => {
    const session = await getCoreServerSession();
    if (!session.hasUser) throw Error("No user");

    const { id } = await prisma.flow.create({
      data: { userId: String(session.userData.id), originalPrompt },
    });

    await setServerSideCookie({ key: "flowId", value: id });
  });
};
