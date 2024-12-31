import Image from "next/image";
import { FadeCard } from "@repo/shadcn/fade-card";

import { type FeedItem } from "./index";

type FeedElementProps = {
  item: FeedItem;
  isFlipped: boolean;
  delay?: number;
};

const Content = ({
  item: {
    aiGeneratedPrompt,
    finalPromptImage,
    originalPrompt,
    originalPromptImage,
    userModifiedPrompt,
  },
  isFrontSide,
}: {
  item: FeedItem;
  isFrontSide?: true;
}) => {
  if (!aiGeneratedPrompt || !finalPromptImage || !originalPromptImage) {
    console.log({ aiGeneratedPrompt, finalPromptImage, originalPromptImage });
    return null;
  }

  const finalPrompt = userModifiedPrompt || aiGeneratedPrompt;

  return (
    
      <Image
        src={isFrontSide ? originalPromptImage : finalPromptImage}
        alt={isFrontSide ? originalPrompt : finalPrompt}
        width={80}
        height={80}
        className="w-full h-full rounded"
      />

  );
};

export function FeedElement({ item, isFlipped, delay = 0 }: FeedElementProps) {
  return (
    <div className="w-96 h-96">
      <FadeCard
        frontContent={<Content item={item} isFrontSide />}
        backContent={<Content item={item} />}
        isFaded={isFlipped}
        delay={delay}
      />
    </div>
  );
}
