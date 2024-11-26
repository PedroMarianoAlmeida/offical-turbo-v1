"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { appIncrementUserCountUsage } from "@/server-actions/userCount";
import { generateResponse, generateImage } from "@/server-actions/ai";
import { Button } from "@repo/shadcn/button";

export const IncrementUsageButton = ({ userId }: { userId: string }) => {
  const [message, setMessage] = useState<string | null>("");
  const { mutateAsync: mutateIncrement } = useMutation({
    mutationFn: appIncrementUserCountUsage,
    onSuccess: (data) => {
      if (!data.success) {
        setMessage("Something went wrong");
        return;
      }

      setMessage(null);
    },
    onError: () => {
      setMessage("Something went wrong");
    },
  });

  const { mutateAsync: mutateChatGpt } = useMutation({
    mutationFn: generateResponse,
    onSuccess: (data) => {
      console.log(data);
      if (!data.success) {
        setMessage("Something went wrong");
        return;
      }

      setMessage(null);
    },
    onError: () => {
      console.log("ERROR");
      setMessage("Something went wrong");
    },
  });

  const { mutateAsync: mutateImageChatGpt } = useMutation({
    mutationFn: generateImage,
    onSuccess: (data) => {
      console.log(data);
      if (!data.success) {
        setMessage("Something went wrong");
        return;
      }

      setMessage(null);
    },
    onError: () => {
      console.log("ERROR");
      setMessage("Something went wrong");
    },
  });

  return (
    <>
      <Button onClick={() => mutateIncrement(userId)}>Increase Count</Button>
      <Button onClick={() => mutateChatGpt({ userId })}>Call chatGPT</Button>
      <Button onClick={() => mutateImageChatGpt({ userId })}>
        Call chatGPT Image
      </Button>
      <p>{message}</p>
    </>
  );
};
