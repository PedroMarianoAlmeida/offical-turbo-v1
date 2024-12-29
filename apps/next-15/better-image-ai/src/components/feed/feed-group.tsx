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
    <section>
      {feedGroup.map((feedItem, index) => (
        <FeedElement
          key={feedItem.id}
          item={feedItem}
          isFlipped={isFlipped}
          delay={index * 0.2}
        />
      ))}
    </section>
  );
};
