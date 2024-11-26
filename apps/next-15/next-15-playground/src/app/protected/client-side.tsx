"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateResponse, generateImage } from "@/server-actions/ai";
import { Button } from "@repo/shadcn/button";

export const IncrementUsageButton = ({ userId }: { userId: string }) => {
  const [message, setMessage] = useState<string | null>("");

  const { mutateAsync: mutateChatGpt } = useMutation({
    mutationFn: generateResponse,
    onSuccess: (data) => {
      if (data.success) {
        const { result } = data;
        setMessage(result);
      } else {
        setMessage("Something went wrong");
      }
    },
    onError: () => {
      console.log("ERROR");
      setMessage("Something went wrong");
    },
  });

  const { mutateAsync: mutateImageChatGpt } = useMutation({
    mutationFn: generateImage,
    onSuccess: (data) => {
      if (data.success) {
        const { result } = data;
        setMessage(result);
      } else {
        setMessage("Something went wrong");
      }
    },
    onError: () => {
      console.log("ERROR");
      setMessage("Something went wrong");
    },
  });

  return (
    <>
      <Button onClick={() => mutateChatGpt({ userId })}>Call chatGPT</Button>
      <Button onClick={() => mutateImageChatGpt({ userId })}>
        Call chatGPT Image
      </Button>
      <p>{message}</p>
    </>
  );
};
