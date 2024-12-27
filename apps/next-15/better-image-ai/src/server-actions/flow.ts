"use server";
import { cookies } from "next/headers";
import { z } from "zod";

import { getCoreServerSession } from "@repo/next-auth/session-adapters";
import { asyncWrapper } from "@repo/core-main/asyncWrapper";

import prisma from "@/config/prisma";

import {
  receivingStep1Format,
  receivingStep1Prompt,
  generateStep2AnswersUserPrompt,
} from "@/prompts";
import { generateObject, generateResponse } from "@/server-actions/ai";
import { formSchema } from "@/app/dashboard/new-image/step2/Step2Form";

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
const getFlowId = async () => {
  const cookieStore = await cookies();
  const flowId = cookieStore.get("flowId")?.value;
  if (!flowId) throw Error("No flowId on cookie");
  return { flowId };
};

export const receiveQuestions = async () => {
  return asyncWrapper(async () => {
    const { flowId } = await getFlowId();

    const flow = await prisma.flow.findUnique({
      where: { id: flowId },
      include: { questions: true, suggestedStyle: true, extraThought: true }, // Replace by select?
    });
    if (!flow) throw Error("Flow not found");

    const { questions, suggestedStyle, originalPrompt, userId, extraThought } =
      flow;
    if (questions.length === 0 && !suggestedStyle) {
      const responseAi = await generateObject({
        userPrompt: originalPrompt,
        userId,
        zodFormat: receivingStep1Format,
        systemPrompt: receivingStep1Prompt,
      });

      if (!responseAi.success) throw Error(responseAi.message);

      const { questions, suggestedStyle, extraThought } =
        await prisma.flow.update({
          where: { id: flowId },
          include: {
            questions: true,
            suggestedStyle: true,
            extraThought: true,
          },
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
              create: responseAi.result.questions.map(
                ({ answer, question }) => ({
                  question,
                  placeholder: answer,
                  answer: null,
                })
              ),
            },
          },
        });

      return { questions, suggestedStyle, originalPrompt, extraThought };
    }
    return { questions, suggestedStyle, originalPrompt, extraThought };
  });
};

export const saveAnswers = async ({
  questions,
  extraInformation,
  suggestedStyle,
}: z.infer<typeof formSchema>) => {
  return asyncWrapper(async () => {
    const { flowId } = await getFlowId();

    // 1. Retrieve the flow with questions, suggestedStyle, and extraThought
    const flow = await prisma.flow.findUnique({
      where: { id: flowId },
      include: {
        questions: true,
        suggestedStyle: true,
        extraThought: true,
      },
    });
    if (!flow) throw new Error("Flow not found");

    // 2. Update each question’s answer based on the user’s input
    for (const userQuestion of questions) {
      // Attempt to match based on the original question text
      const dbQuestion = flow.questions.find(
        (q) => q.question === userQuestion.question
      );
      if (!dbQuestion) continue; // skip if there’s no match

      await prisma.question.update({
        where: { id: dbQuestion.id },
        data: {
          answer: userQuestion.answer ?? "",
        },
      });
    }

    // 3. Update the suggestedStyle question if it exists
    if (flow.suggestedStyle) {
      await prisma.question.update({
        where: { id: flow.suggestedStyle.id },
        data: { answer: suggestedStyle ?? "" },
      });
    }

    // 4. Update the extraThought question if it exists
    if (flow.extraThought) {
      await prisma.question.update({
        where: { id: flow.extraThought.id },
        data: { answer: extraInformation ?? "" },
      });
    }

    return { success: true };
  });
};

export const getQuestionsAndGenerateNewPrompt = async () => {
  return asyncWrapper(async () => {
    const { flowId } = await getFlowId();

    const flow = await prisma.flow.findUnique({
      where: { id: flowId },
      select: {
        id: true,
        userId: true,
        aiGeneratedPrompt: true,
        questions: true,
        suggestedStyle: true,
        extraThought: true,
        originalPrompt: true,
        userModifiedPrompt: true,
      },
    });
    if (!flow) throw Error("Flow not found");

    const {
      questions,
      suggestedStyle,
      originalPrompt,
      extraThought,
      userModifiedPrompt,
      aiGeneratedPrompt,
      userId,
    } = flow;

    if (!aiGeneratedPrompt) {
      const responseAi = await generateResponse({
        userPrompt: originalPrompt,
        userId: userId,
        systemPrompt: generateStep2AnswersUserPrompt({
          extraThought,
          originalPrompt,
          questions,
          suggestedStyles: suggestedStyle,
        }),
      });
      if (!responseAi.success) throw Error(responseAi.message);

      await prisma.flow.update({
        where: { id: flowId },
        data: { aiGeneratedPrompt: responseAi.result },
      });

      return {
        originalPrompt,
        aiGeneratedPrompt: responseAi.result,
        userModifiedPrompt: null,
      };
    }
    return { originalPrompt, aiGeneratedPrompt, userModifiedPrompt };
  });
};
// getPromptAndGenerateImage (check if the images already exist, if not generate)
