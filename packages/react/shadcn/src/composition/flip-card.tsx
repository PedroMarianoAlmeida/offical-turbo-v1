"use client";

import { motion } from "framer-motion";

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  isFlipped: boolean;
  delay?: number;
}

export function FlipCard({
  frontContent,
  backContent,
  isFlipped,
  delay = 0,
}: FlipCardProps) {
  return (
    <div className="w-96 h-96 [perspective:1000px]">
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          delay,
        }}
        aria-live="polite"
      >
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          {frontContent}
        </div>
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {backContent}
        </div>
      </motion.div>
    </div>
  );
}
