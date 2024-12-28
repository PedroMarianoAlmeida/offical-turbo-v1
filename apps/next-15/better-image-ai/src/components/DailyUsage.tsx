import { useQuery } from "@tanstack/react-query";
import { usePathname } from 'next/navigation'

import { getDailyUsageWithoutUser } from "@/server-actions/user-count";

import { Badge } from "@repo/shadcn/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/shadcn/hover-card";

export const DailyUsage = ({ totalCredits }: { totalCredits: number }) => {
  const pathname = usePathname()
  const isDashboardImageRoute = pathname.startsWith("/dashboard/new-image/");
  const refetchInterval = isDashboardImageRoute ? 1000 : false

  const { data } = useQuery({
    queryKey: ["dailyUsage"],
    queryFn: getDailyUsageWithoutUser,
    refetchInterval,
  });

  const currentUsage = data && data.success && data.result;

  if (typeof currentUsage !== "number") return;
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
