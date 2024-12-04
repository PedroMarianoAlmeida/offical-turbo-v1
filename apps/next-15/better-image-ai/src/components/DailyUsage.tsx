import { Badge } from "@repo/shadcn/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/shadcn/hover-card";

import { DailyUsageProps } from "@/components/layout-related/LayoutClient";
export const DailyUsage = ({ currentUsage, totalCredits }: DailyUsageProps) => {
  if (currentUsage === null) return;
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge className="cursor-pointer">
          {currentUsage}/{totalCredits}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="px-2">
          <p className="font-bold">Daily Usage Credits</p>
          <ul className="list-disc">
            <li>Questions: 1 credit</li>
            <li>New prompt: 1 credit</li>
            <li>Images: 2 credit</li>
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
