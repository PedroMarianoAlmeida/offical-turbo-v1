"use client";
import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Flow } from "@prisma/client";

import { getUserIncompleteFlow } from "@/server-actions/flow";
import { Button } from "@repo/shadcn/button";

import { UserTable } from "./user-table";

export type IncompleteFlowItem = Pick<
  Flow,
  "aiGeneratedPrompt" | "id" | "originalPrompt" | "userModifiedPrompt"
>;

export const UserIncompleteFlow = () => {
  const [page, setPage] = useState(1);
  const [completeFeed, setCompleteFeed] = useState<IncompleteFlowItem[]>([]);
  const { data, isPlaceholderData } = useQuery({
    queryKey: ["user-incomplete-feed", page],
    queryFn: () => getUserIncompleteFlow({ page }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.success && data.result.rows) {
      setCompleteFeed((oldFeed) => [...oldFeed, ...data.result.rows]);
    }
  }, [data]);
  if (!data || !data.success) return;

  const {
    result: { hasMore },
  } = data;

  return (
    <section className="flex flex-col container">
      <UserTable rows={completeFeed} />
      {hasMore ? (
        <Button
          onClick={() => {
            setPage((old) => (hasMore ? old + 1 : old));
          }}
          disabled={isPlaceholderData}
        >
          More
        </Button>
      ) : null}
    </section>
  );
};
