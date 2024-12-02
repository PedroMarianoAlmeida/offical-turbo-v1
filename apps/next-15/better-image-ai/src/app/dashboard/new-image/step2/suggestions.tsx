import Link from "next/link";
import { z } from "zod";

import { Badge } from "@repo/shadcn/badge";

import { receivingStep1Format } from "@/prompts";
import { en } from "@/i18n/en";

interface SuggestionsProps extends Pick<z.infer<typeof receivingStep1Format>, "suggestedReference">{
  loading?: boolean
}
export const Suggestions = ({
  suggestedReference,
}: SuggestionsProps) => {
  if (suggestedReference.length === 0) return;

  return (
    <section className="flex gap-3 py-2 items-center">
      <p className="py-6">{en.steps.step2.reference}</p>
      {suggestedReference.map(({ artName, artistName }) => (
        <span key={`${artName}-${artistName}`}>
          <Link
            href={`https://www.google.com/search?q=artwork+${artName}+by+${artistName}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Badge
              variant="outline"
              className="flex flex-col py-2 px-7 hover:underline border-2"
            >
              <div className="text-base">{artName}</div>
              <div>({artistName})</div>
            </Badge>
          </Link>
        </span>
      ))}
    </section>
  );
};
