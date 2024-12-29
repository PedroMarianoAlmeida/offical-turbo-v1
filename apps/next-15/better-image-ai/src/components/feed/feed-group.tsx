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
      {feedGroup.map((feedItem) => (
        <FeedElement item={feedItem} isFlipped={isFlipped} />
      ))}
    </section>
  );
};
