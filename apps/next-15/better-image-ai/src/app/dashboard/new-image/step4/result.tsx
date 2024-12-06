import Image from "next/image";
import Link from "next/link";

import { Button } from "@repo/shadcn/button";
import { Skeleton } from "@repo/shadcn/skeleton";
import { ParagraphSkeleton } from "@repo/shadcn/paragraph-skeleton";
// import { DownloadButton } from "@/components/DownloadButton";

import { en } from "@/i18n/en";

interface ResultProps {
  originalSrc: string;
  originalPrompt: string;
  finalSrc: string;
  finalPrompt: string;
  loading?: true;
}

export const Result = ({
  finalPrompt,
  finalSrc,
  originalPrompt,
  originalSrc,
  loading,
}: ResultProps) => {
  return (
    <main className="flex flex-col gap-10 items-center pb-4">
      <section className="grid grid-cols-1 md:grid-cols-2 md:gap-3 gap-10">
        <div className="flex flex-col gap-2">
          <div className="flex gap-5 items-center justify-center">
            <h2 className="text-center font-bold inline-block">
              {en.steps.step4.original}
            </h2>
            {/* <DownloadButton
              filename={originalPrompt.slice(0, 30)}
              url={originalSrc}
              disabled={loading}
            /> */}
          </div>
          {loading ? (
            <>
              <Skeleton className="w-full md:w-auto aspect-square" />
              <Skeleton className="w-60 h-6 inline-block" />
            </>
          ) : (
            <>
              <Image
                src={originalSrc}
                alt={originalPrompt}
                // Add based on size
                width={100}
                height={100}
                className="w-full md:w-auto"
              />

              <p>{originalPrompt}</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-5 items-center justify-center">
            <h2 className="text-center font-bold">{en.steps.step4.final}</h2>
            {/* <DownloadButton
              filename={finalPrompt.slice(0, 30)}
              url={finalSrc}
              disabled={loading}
            /> */}
          </div>
          {loading ? (
            <>
              <Skeleton className="w-full md:w-auto aspect-square" />
              <div className="flex py-2 pl-3 gap-1 flex-wrap">
                <ParagraphSkeleton />
              </div>
            </>
          ) : (
            <>
              <Image
                src={finalSrc}
                alt={finalPrompt}
                width={500}
                height={500}
                className="w-full md:w-auto"
              />

              <p>{finalPrompt}</p>
            </>
          )}
        </div>
      </section>
      <Link href="/dashboard">
        <Button>{en.steps.step4.goBack}</Button>
      </Link>
    </main>
  );
};
