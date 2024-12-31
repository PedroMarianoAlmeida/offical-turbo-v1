"use client";

import { motion } from "framer-motion";

interface FadeCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  isFaded: boolean;
  delay?: number;
}

export function FadeCard({
  frontContent,
  backContent,
  isFaded,
  delay = 0,
}: FadeCardProps) {
  return (
    <div className="relative w-full h-full">
      {/* Front Content */}
      <motion.div
        className="absolute w-full h-full"
        initial={false}
        animate={{ opacity: isFaded ? 0 : 1 }}
        transition={{
          duration: 0.6,
          delay,
        }}
        aria-live="polite"
      >
        {frontContent}
      </motion.div>

      {/* Back Content */}
      <motion.div
        className="absolute w-full h-full"
        initial={false}
        animate={{ opacity: isFaded ? 1 : 0 }}
        transition={{
          duration: 0.6,
          delay,
        }}
        aria-live="polite"
      >
        {backContent}
      </motion.div>
    </div>
  );
}
