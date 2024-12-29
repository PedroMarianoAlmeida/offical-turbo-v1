import { useEffect, useState } from "react";
import Image from "next/image";

import { FlipCard } from "@repo/shadcn/flip-card";
import { Dialog, DialogContent, DialogTrigger } from "@repo/shadcn/dialog";

import { type FeedItem } from "./index";

export const FeedElement = ({
  item,
  isFlipped,
  delay,
}: {
  item: FeedItem;
  isFlipped: boolean;
  delay: number;
}) => {
  const {
    aiGeneratedPrompt,
    finalPromptImage,
    originalPrompt,
    originalPromptImage,
    userModifiedPrompt,
  } = item;

  const [delayedFlip, setDelayedFlip] = useState(isFlipped);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayedFlip(isFlipped);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isFlipped, delay]);

  if (!aiGeneratedPrompt || !finalPromptImage || !originalPromptImage)
    return null;

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
          isFlipped={delayedFlip}
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
