"use server";
import { cookies } from "next/headers";

import { getCoreServerSession } from "@repo/next-auth/session-adapters";
import { asyncWrapper } from "@repo/core-main/asyncWrapper";

import prisma from "@/config/prisma";
import { receivingStep1Format, receivingStep1Prompt } from "@/prompts";
import { generateObject } from "@/server-actions/ai";

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

    const cookieStore = await cookies();
    cookieStore.set("flowId", id);
  });
};

export const receiveQuestions = async () => {
  return asyncWrapper(async () => {
    const cookieStore = await cookies();
    const flowId = cookieStore.get("flowId")?.value;

    if (!flowId) throw Error("No flowId on cookie");

    const flow = await prisma.flow.findUnique({
      where: { id: flowId },
      include: { questions: true, suggestedStyle: true },
    });
    if (!flow) throw Error("Flow not found");

    const { questions, suggestedStyle, originalPrompt, userId } = flow;
    if (questions.length === 0 && !suggestedStyle) {
      const responseAi = await generateObject({
        userPrompt: originalPrompt,
        userId,
        zodFormat: receivingStep1Format,
        systemPrompt: receivingStep1Prompt,
      });

      if (!responseAi.success) throw Error(responseAi.message);

      const { questions, suggestedStyle } = await prisma.flow.update({
        where: { id: flowId },
        include: { questions: true, suggestedStyle: true },
        data: {
          suggestedStyle: {
            create: {
              question: "", // This question doesn't need a value, because is the Style question
              placeholder: responseAi.result.suggestedStyles.join(", "),
              flow: {
                connect: { id: flowId },
              },
            },
          },
          questions: {
            create: responseAi.result.questions.map(({ answer, question }) => ({
              question,
              placeholder: answer,
              answer: null,
            })),
          },
        },
      });

      return { questions, suggestedStyle, originalPrompt };
    }
    return { questions, suggestedStyle, originalPrompt };
  });
};

// export const saveAnswers
// export const getQuestionsAndGenerateNewPrompt (again check if already exist prompt, if not then generate)
// getPromptAndGenerateImage (check if the images already exist, if not generate)
