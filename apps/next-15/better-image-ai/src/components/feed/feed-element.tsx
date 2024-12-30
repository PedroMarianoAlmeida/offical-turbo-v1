import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@repo/shadcn/dialog";
import { FlipCard } from "@repo/shadcn/flip-card";

import { type FeedItem } from "./index";

type FeedElementProps = {
  item: FeedItem;
  isFlipped: boolean;
  delay: number;
};

export function FeedElement({ item, isFlipped, delay }: FeedElementProps) {
  const {
    aiGeneratedPrompt,
    finalPromptImage,
    originalPrompt,
    originalPromptImage,
    userModifiedPrompt,
  } = item;

  if (!aiGeneratedPrompt || !finalPromptImage || !originalPromptImage) {
    return null;
  }

  const finalPrompt = userModifiedPrompt || aiGeneratedPrompt;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-96 h-96 p-2">
          <FlipCard
            frontContent={
              <Image
                src={finalPromptImage}
                alt={finalPrompt}
                width={80}
                height={80}
                className="w-full h-full border-green-500 border-2 rounded"
              />
            }
            backContent={
              <Image
                src={originalPromptImage}
                alt={originalPrompt}
                width={80}
                height={80}
                className="w-full h-full border-orange-500 border-2 rounded"
              />
            }
            isFlipped={isFlipped}
            delay={delay}
          />
        </div>
      </DialogTrigger>

      <DialogContent>
        <ul className="list-disc text-left flex flex-col gap-3">
          <li>Original Prompt: {originalPrompt}</li>
          <li>Final Prompt: {finalPrompt}</li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}
