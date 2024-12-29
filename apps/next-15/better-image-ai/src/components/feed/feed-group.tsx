import { useEffect, useState } from "react";
import { type FeedItem } from "./index";
import { FeedElement } from "./feed-element";

export const FeedGroup = ({ feedGroup }: { feedGroup: FeedItem[] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <h2 className="">
        <span className="border-green-500 border-2 px-3 py-1 rounded">
          Improved Prompt
        </span>{" "}
        -{" "}
        <span className="border-orange-500 border-2 px-3 py-1 rounded">
          Initial Prompt
        </span>{" "}
        <span className="text-sm">(click on image to see both)</span>
      </h2>
      <div className="flex flex-wrap gap-2">
        {feedGroup.map((feedItem, index) => (
          <FeedElement
            key={feedItem.id}
            item={feedItem}
            isFlipped={isFlipped}
            delay={index * 0.2}
          />
        ))}
      </div>
    </section>
  );
};
