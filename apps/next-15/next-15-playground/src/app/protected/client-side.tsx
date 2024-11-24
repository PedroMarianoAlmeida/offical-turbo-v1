"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { appIncrementUserCountUsage } from "@/server-actions/userCount";

export const IncrementUsageButton = ({ userId }: { userId: string }) => {
  const [message, setMessage] = useState<string | null>("");
  const { mutateAsync } = useMutation({
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

  return (
    <>
      <button onClick={() => mutateAsync(userId)}>Increase Count</button>
      <p>{message}</p>
    </>
  );
};
