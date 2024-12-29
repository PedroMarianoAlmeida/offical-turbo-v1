"use client";
import { useState } from "react";
import Image from "next/image";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { FlipCard } from "@repo/shadcn/flip-card";

import { getFeed } from "@/server-actions/flow";

export const Feed = () => {
  const [page, setPage] = useState(1);
  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => getFeed({ page }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  if (!data || !data.success) return;

  const {
    result: { hasMore, rows },
  } = data;

  return (
    <section className="flex flex-col">
      <div className="flex flex-wrap">
        {rows.map(
          ({
            id,
            aiGeneratedPrompt,
            finalPromptImage,
            originalPrompt,
            originalPromptImage,
            userModifiedPrompt,
          }) => {
            if (!aiGeneratedPrompt || !finalPromptImage || !originalPromptImage)
              return;
            const finalPrompt = userModifiedPrompt ?? aiGeneratedPrompt;
            return (
              <div key={id}>
                <FlipCard
                  frontContent={
                    <div className="relative round">
                      <Image
                        src={finalPromptImage}
                        alt={finalPrompt}
                        width={100}
                        height={100}
                        className="w-full h-full"
                      />
                    </div>
                  }
                  backContent={
                    <div className="relative round">
                      <Image
                        src={originalPromptImage}
                        alt={originalPrompt}
                        width={100}
                        height={100}
                        className="w-full h-full"
                      />
                    </div>
                  }
                  isFlipped={true}
                />
              </div>
            );
          }
        )}
      </div>

      {hasMore ? (
        <button
          onClick={() => {
            setPage((old) => (hasMore ? old + 1 : old));
          }}
          disabled={isPlaceholderData}
        >
          More
        </button>
      ) : null}
    </section>
  );
};
