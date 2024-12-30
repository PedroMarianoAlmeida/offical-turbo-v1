"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Flow } from "@prisma/client";

import { getUserIncompleteFlow } from "@/server-actions/flow";
import { Button } from "@repo/shadcn/button";
import { UserTable } from "./user-table";

export type IncompleteFlowItem = Pick<
  Flow,
  "aiGeneratedPrompt" | "id" | "originalPrompt" | "userModifiedPrompt"
>;

export const UserIncompleteFlow = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["user-incomplete-feed"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      return getUserIncompleteFlow({ page: pageParam });
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.success && lastPage.result.hasMore) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  if (status === "pending") {
    return <div>Loading feed...</div>;
  }

  if (status === "error") {
    return <div>Error: {(error as Error)?.message ?? "Unknown"}</div>;
  }

  const completeFeed =
    data?.pages.flatMap((page) => {
      if (!page.success) {
        return [];
      }

      return page.result.rows;
    }) ?? [];

  return (
    <section className="flex flex-col container">
      <UserTable rows={completeFeed} />
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "More"}
        </Button>
      )}
    </section>
  );
};
