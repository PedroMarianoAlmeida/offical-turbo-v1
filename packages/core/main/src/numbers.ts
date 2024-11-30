export const reachLimit = ({
  currentUsage,
  limit,
}: {
  currentUsage: number;
  limit: number;
}) => currentUsage >= limit;
