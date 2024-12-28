import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { getDailyUsageWithoutUser } from "@/server-actions/user-count";

import { Badge } from "@repo/shadcn/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/shadcn/hover-card";
import { Skeleton } from "@repo/shadcn/skeleton";

export const DailyUsage = ({
  totalCredits,
  hasUser,
}: {
  totalCredits: number;
  hasUser: boolean;
}) => {
  const pathname = usePathname();
  const isDashboardImageRoute = pathname.startsWith("/dashboard/new-image/");
  const refetchInterval = isDashboardImageRoute ? 1000 : false;

  const { data, isLoading } = useQuery({
    queryKey: ["dailyUsage"],
    queryFn: getDailyUsageWithoutUser,
    refetchInterval,
  });

  const currentUsage =
    Number(process.env.NEXT_PUBLIC_DAILY_COUNT_DEV_ONLY) ||
    (data && data.success && data.result);

  const dynamicValue =
    typeof currentUsage === "number" ? (
      currentUsage
    ) : (
      <Skeleton className="w-5 h-4" />
    );

  const dynamicBadgeVariant =
    isLoading ||
    (typeof currentUsage === "number" && currentUsage < totalCredits)
      ? "default"
      : "destructive";

  if (!hasUser) return;
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge className="cursor-pointer" variant={dynamicBadgeVariant}>
          {dynamicValue} /{totalCredits}
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
