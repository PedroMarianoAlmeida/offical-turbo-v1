"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { appIncrementUserCountUsage } from "@/server-actions/userCount";
import { generateResponse } from "@/server-actions/ai";

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

  return (
    <>
      <button onClick={() => mutateIncrement(userId)}>Increase Count</button>
      <button onClick={() => mutateChatGpt()}>Call chatGPT</button>
      <p>{message}</p>
    </>
  );
};
