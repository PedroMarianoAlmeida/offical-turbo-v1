import { useEffect, useState } from "react";
import { type FeedItem } from "./index";
import { FeedElement } from "./feed-element";

export const FeedGroup = ({ feedGroup }: { feedGroup: FeedItem[] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex flex-col gap-5 items-center">
      <h2>{isFlipped ? "Original prompt image" : "Final Prompt Image"}</h2>
      <div className="flex flex-wrap gap-3">
        {feedGroup.map((feedItem) => (
          <FeedElement
            key={feedItem.id}
            item={feedItem}
            isFlipped={isFlipped}
          />
        ))}
      </div>
    </section>
  );
};
