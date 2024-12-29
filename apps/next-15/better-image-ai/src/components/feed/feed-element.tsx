import Image from "next/image";

import { FlipCard } from "@repo/shadcn/flip-card";
import { Dialog, DialogContent, DialogTrigger } from "@repo/shadcn/dialog";

import { type FeedItem } from "./index";

export const FeedElement = ({
  item,
  isFlipped,
}: {
  item: FeedItem;
  isFlipped: boolean;
}) => {
  const {
    aiGeneratedPrompt,
    finalPromptImage,
    originalPrompt,
    originalPromptImage,
    userModifiedPrompt,
  } = item;

  if (!aiGeneratedPrompt || !finalPromptImage || !originalPromptImage) return;
  const finalPrompt = userModifiedPrompt ?? aiGeneratedPrompt;

  return (
    <Dialog>
      <DialogTrigger>
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
          isFlipped={isFlipped}
        />
      </DialogTrigger>
      <DialogContent>
        <ul className="list-disc text-left flex flex-col gap-3">
          <li>Original Prompt: {originalPrompt}</li>
          <li>Final Prompt: {finalPrompt}</li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};
