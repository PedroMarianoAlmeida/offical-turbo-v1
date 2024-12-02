import Image from "next/image";
import Link from "next/link";

import { Button } from "@repo/shadcn/button";

import { en } from "@/i18n/en";

interface ResultProps {
  originalSrc: string;
  originalPrompt: string;
  finalSrc: string;
  finalPrompt: string;
}

export const Result = ({
  finalPrompt,
  finalSrc,
  originalPrompt,
  originalSrc,
}: ResultProps) => {
  return (
    <main className="flex flex-col gap-10 items-center pb-4">
      <section className="grid grid-cols-1 md:grid-cols-2 md:gap-3 gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-center font-bold">{en.steps.step4.original}</h2>
          <Image
            src={originalSrc}
            alt={originalPrompt}
            // Add based on size
            width={100}
            height={100}
            className="w-full md:w-auto"
          />
          <p>{originalPrompt}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-center font-bold">{en.steps.step4.final}</h2>
          <Image
            src={finalSrc}
            alt={finalPrompt}
            width={500}
            height={500}
            className="w-full md:w-auto"
          />
          <p>{finalPrompt}</p>
        </div>
      </section>
      <Link href="/dashboard">
        <Button>{en.steps.step4.goBack}</Button>
      </Link>
    </main>
  );
};
