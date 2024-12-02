"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "../native-shadcn/card";

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  isFlipped: boolean;
}

export function FlipCard({
  frontContent,
  backContent,
  isFlipped,
}: FlipCardProps) {
  return (
    <div className="w-96 h-96 [perspective:1000px]">
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        aria-live="polite"
      >
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          {/* <Card className="w-full h-full">
            <CardContent className="flex items-center justify-center h-full"> */}
          {frontContent}
          {/* </CardContent>
          </Card> */}
        </div>
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {/* <Card className="w-full h-full">
            <CardContent className="flex items-center justify-center h-full"> */}
          {backContent}
          {/* </CardContent>
          </Card> */}
        </div>
      </motion.div>
    </div>
  );
}
