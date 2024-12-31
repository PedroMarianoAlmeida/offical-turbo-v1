"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import type { Flow } from "@prisma/client";

import { getCoreServerSession } from "@repo/next-auth/session-adapters";
import { asyncWrapper } from "@repo/core-main/asyncWrapper";
import { addImageInS3BucketWithCallback } from "@repo/aws/addImageInS3Bucket";

import prisma from "@/config/prisma";

import {
  receivingStep1Format,
  receivingStep1Prompt,
  generateStep2AnswersUserPrompt,
} from "@/prompts";
import {
  generateObject,
  generateResponse,
  generateImage,
} from "@/server-actions/ai";
import { formSchema } from "@/app/dashboard/new-image/step2/Step2Form";

// Error: Cookies can only be modified in a Server Action or Route Handler.
// But startFlowWithPrompt also use cookies and there is no Next complaining
export const clearFlow = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("flowId");
};
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
interface SaveUserEditedAiPromptProps {
  userModifiedPrompt: Flow["userModifiedPrompt"];
  aiGeneratedPrompt: string;
}
export const saveUserEditedAiPrompt = async ({
  aiGeneratedPrompt,
  userModifiedPrompt,
}: SaveUserEditedAiPromptProps) => {
  return asyncWrapper(async () => {
    if (aiGeneratedPrompt === userModifiedPrompt) return; //There is nothing to update

    const { flowId } = await getFlowId();

    await prisma.flow.update({
      where: { id: flowId },
      data: { userModifiedPrompt },
    });
  });
};

export const getPromptAndGenerateImage = async () => {
  return asyncWrapper(async () => {
    const { flowId } = await getFlowId();

    const flow = await prisma.flow.findUnique({
      where: { id: flowId },
      select: {
        id: true,
        userId: true,
        aiGeneratedPrompt: true,
        originalPrompt: true,
        userModifiedPrompt: true,
        originalPromptImage: true,
        finalPromptImage: true,
      },
    });
    if (!flow) throw Error("Flow not found");

    const {
      aiGeneratedPrompt,
      finalPromptImage,
      originalPrompt,
      originalPromptImage,
      userId,
      userModifiedPrompt,
    } = flow;
    if (!aiGeneratedPrompt || !originalPrompt) throw Error("Missing prompts");

    const finalPrompt = userModifiedPrompt || aiGeneratedPrompt;
    if (!originalPromptImage || !finalPromptImage) {
      const imageOriginalPrompt = addImageInS3BucketWithCallback({
        callback: () => generateImage({ userPrompt: originalPrompt, userId }),
        config: {
          bucketName: process.env.AWS_BUCKET_NAME ?? "",
          region: process.env.AWS_REGION ?? "",
          accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
        },
      });

      const imageFinalPrompt = addImageInS3BucketWithCallback({
        callback: () => generateImage({ userPrompt: finalPrompt, userId }),
        config: {
          bucketName: process.env.AWS_BUCKET_NAME ?? "",
          region: process.env.AWS_REGION ?? "",
          accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
        },
      });

      const [originalRes, finalRes] = await Promise.all([
        imageOriginalPrompt,
        imageFinalPrompt,
      ]);

      if (!originalRes.success) throw Error(originalRes.message);
      if (!finalRes.success) throw Error(finalRes.message);

      await prisma.flow.update({
        where: { id: flowId },
        data: {
          finalPromptImage: finalRes.result.publicUrl,
          originalPromptImage: originalRes.result.publicUrl,
        },
      });

      return {
        originalPrompt,
        originalPromptImage: originalRes.result.publicUrl,
        finalPromptImage: finalRes.result.publicUrl,
        finalPrompt,
        id: flowId
      };
    }
    return {
      originalPrompt,
      originalPromptImage,
      finalPromptImage,
      finalPrompt,
      id: flowId
    };
  });
};

const elementsPerPage = 10;
export const getUserFeed = async ({
  page,
  userId,
}: {
  page: number;
  userId?: string;
}) => {
  return asyncWrapper(async () => {
    let userIdTreated: string = userId ?? "";
    if (!userIdTreated) {
      const session = await getCoreServerSession();
      if (!session.hasUser) {
        throw new Error("No user");
      }
      userIdTreated = String(session.userData.id);
    }

    const rows = await prisma.flow.findMany({
      skip: (page - 1) * elementsPerPage,
      take: elementsPerPage,
      where: {
        AND: [
          {
            finalPromptImage: {
              not: null,
            },
          },
          {
            finalPromptImage: {
              not: "",
            },
          },
          {
            originalPromptImage: {
              not: null,
            },
          },
          {
            originalPromptImage: {
              not: "",
            },
          },
        ],
      },
      select: {
        originalPrompt: true,
        originalPromptImage: true,
        finalPromptImage: true,
        aiGeneratedPrompt: true,
        userModifiedPrompt: true,
        id: true,
      },
      orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
    });

    const hasMore = rows.length >= elementsPerPage;

    return { rows, hasMore };
  });
};

export const getUserIncompleteFlow = async ({
  page,
  userId,
}: {
  page: number;
  userId?: string;
}) => {
  return asyncWrapper(async () => {
    let userIdTreated: string = userId ?? "";
    if (!userIdTreated) {
      const session = await getCoreServerSession();
      if (!session.hasUser) {
        throw new Error("No user");
      }
      userIdTreated = String(session.userData.id);
    }

    const rows = await prisma.flow.findMany({
      skip: (page - 1) * elementsPerPage,
      take: elementsPerPage,
      where: {
        userId: userIdTreated,
        OR: [
          { finalPromptImage: { isSet: false } },
          { finalPromptImage: null },
          { finalPromptImage: "" },
        ],
      },
      select: {
        originalPrompt: true,
        originalPromptImage: true,
        finalPromptImage: true,
        aiGeneratedPrompt: true,
        userModifiedPrompt: true,
        id: true,
      },
      orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
    });

    const hasMore = rows.length >= elementsPerPage;

    return { rows, hasMore };
  });
};

export const getFeed = async ({ page }: { page: number }) => {
  return asyncWrapper(async () => {
    const rows = await prisma.flow.findMany({
      skip: (page - 1) * elementsPerPage,
      take: elementsPerPage,
      where: {
        AND: [
          {
            finalPromptImage: {
              not: null,
            },
          },
          {
            finalPromptImage: {
              not: "",
            },
          },
          {
            originalPromptImage: {
              not: null,
            },
          },
          {
            originalPromptImage: {
              not: "",
            },
          },
        ],
      },
      select: {
        originalPrompt: true,
        originalPromptImage: true,
        finalPromptImage: true,
        aiGeneratedPrompt: true,
        userModifiedPrompt: true,
        id: true,
      },
      orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
    });

    const hasMore = rows.length >= elementsPerPage;

    return { rows, hasMore };
  });
};

export const resumeFlow = async ({
  flow: { aiGeneratedPrompt, id },
}: {
  flow: Pick<
    Flow,
    "aiGeneratedPrompt" | "id" | "originalPrompt" | "userModifiedPrompt"
  >;
}) => {
  const cookieStore = await cookies();
  cookieStore.set("flowId", id);

  redirect(`/dashboard/new-image/step${aiGeneratedPrompt ? 3 : 2}`);
};

export const deleteFlow = async (flowId: string) => {
  return asyncWrapper(async () => {
    const session = await getCoreServerSession();
    if (!session.hasUser) {
      throw new Error("No user");
    }

    await prisma.flow.delete({
      where: { id: flowId, userId: String(session.userData.id) },
    });
  });
};
