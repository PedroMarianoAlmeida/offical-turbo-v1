"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Flow } from "@prisma/client";

import { getFeed, getUserFeed } from "@/server-actions/flow";
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

export const Feed = ({
  ownUser = false,
  title,
}: {
  ownUser?: boolean;
  title?: string;
}) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: [ownUser ? "own-feed" : "feed"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      return ownUser
        ? getUserFeed({ page: pageParam })
        : getFeed({ page: pageParam });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.success && lastPage.result.hasMore) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  if (status === "pending") {
    return <div>Loading feed...</div>;
  }

  if (status === "error") {
    return <div>Error: {(error as Error)?.message ?? "Unknown error"}</div>;
  }

  const completeFeed =
    data?.pages.flatMap((page) => {
      if (!page.success) {
        return [];
      }
      return page.result.rows;
    }) ?? [];

  if (completeFeed.length === 0) return null;
  return (
    <section className="flex flex-col">
      {title ? <h2>{title}</h2> : null}
      <FeedGroup feedGroup={completeFeed} />

      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "More"}
        </Button>
      )}
    </section>
  );
};
