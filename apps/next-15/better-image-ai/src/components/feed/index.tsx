"use client";
import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Flow } from "@prisma/client";

import { getFeed } from "@/server-actions/flow";
import { FeedGroup } from "./feed-group";
import { Button } from "@repo/shadcn/button";

export type FeedItem = Pick<
  Flow,
  | "aiGeneratedPrompt"
  | "finalPromptImage"
  | "id"
  | "originalPrompt"
  | "originalPromptImage"
  | "userModifiedPrompt"
>;

export const Feed = () => {
  const [page, setPage] = useState(1);
  const [completeFeed, setCompleteFeed] = useState<FeedItem[]>([]);
  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["feed", page],
    queryFn: () => getFeed({ page }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
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
    <section className="flex flex-col">
      <FeedGroup feedGroup={completeFeed} />

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
