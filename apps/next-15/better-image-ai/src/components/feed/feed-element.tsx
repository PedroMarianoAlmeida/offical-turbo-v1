import Image from "next/image";

import { FadeCard } from "@repo/shadcn/fade-card";
import { Dialog, DialogContent, DialogTrigger } from "@repo/shadcn/dialog";
import { DownloadButton } from "@repo/shadcn/download-button";

import { type FeedItem } from "./index";

type FeedElementProps = {
  item: FeedItem;
  isFlipped: boolean;
  delay?: number;
};

const Content = ({
  finalPrompt,
  finalPromptImage,
  originalPrompt,
  originalPromptImage,

  isFrontSide,
}: {
  finalPrompt: string;
  finalPromptImage: string;
  originalPrompt: string;
  originalPromptImage: string;
  isFrontSide?: true;
}) => {
  return (
    <Image
      src={isFrontSide ? finalPromptImage : originalPromptImage}
      alt={isFrontSide ? finalPrompt : originalPrompt}
      width={80}
      height={80}
      className="w-full h-full rounded"
    />
  );
};

export function FeedElement({ item, isFlipped, delay = 0 }: FeedElementProps) {
  const {
    aiGeneratedPrompt,
    finalPromptImage,
    id,
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
        <div className="w-96 h-96">
          <FadeCard
            frontContent={
              <Content
                finalPrompt={finalPrompt}
                finalPromptImage={finalPromptImage}
                originalPrompt={originalPrompt}
                originalPromptImage={originalPromptImage}
                isFrontSide
              />
            }
            backContent={
              <Content
                finalPrompt={finalPrompt}
                finalPromptImage={finalPromptImage}
                originalPrompt={originalPrompt}
                originalPromptImage={originalPromptImage}
              />
            }
            isFaded={isFlipped}
            delay={delay}
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex gap-2 flex-col items-center">
          <ul className="list-disc text-left flex flex-col gap-3">
            <li>Original Prompt : {item.originalPrompt}</li>
            <li>
              Final Prompt: {item.userModifiedPrompt || item.aiGeneratedPrompt}
            </li>
          </ul>
          <div className="flex gap-2">
            <DownloadButton
              url={originalPromptImage}
              filename={`better-image-initial-${id}`}
              label="Original"
            />
            <DownloadButton
              url={finalPromptImage}
              filename={`better-image-final-${id}`}
              label="Final"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
