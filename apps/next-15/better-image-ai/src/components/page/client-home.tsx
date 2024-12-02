"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import { FlipCard } from "@repo/shadcn/flip-card";

export const ClientHome = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const originalPrompt = "Original prompt: A monkey in a forest";
  const revisedPrompt =
    "Revised prompt: Create a cartoon image of a chimpanzee in a Chinese forest during twilight. The chimpanzee is depicted eating a banana, but it looks really upset. Additionally, in the background, there is a wreck of a crashed airplane.";

  return (
    <FlipCard
      frontContent={
        <div className="relative round">
          <Image
            src={"/homepage/demoImage1.webp"}
            alt={originalPrompt}
            width={100}
            height={100}
            className="w-full h-full"
          />
          <p className="absolute top-2 font-mono font-bold text-center bg-green-600/[.6]">
            {originalPrompt}
          </p>
        </div>
      }
      backContent={
        <div className="relative round">
          <Image
            src={"/homepage/demoImage2.webp"}
            alt={revisedPrompt}
            width={100}
            height={100}
            className="w-full h-full"
          />
          <p className="absolute top-2 font-mono font-bold text-center bg-green-600/[.6]">
            {revisedPrompt}
          </p>
        </div>
      }
      isFlipped={isFlipped}
    />
  );
};
