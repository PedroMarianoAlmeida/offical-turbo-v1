import { Skeleton } from "@repo/shadcn/skeleton";

export const LoadingFeed = ({ title }: { title?: string }) => (
  <section className="flex flex-col items-center gap-4">
    {title ? <Skeleton className="h-10 w-60" /> : null}
    <div className="flex gap-2 flex-wrap">
      <Skeleton className="w-96 h-96" />
      <Skeleton className="w-96 h-96" />
      <Skeleton className="w-96 h-96" />
      <Skeleton className="w-96 h-96" />
      <Skeleton className="w-96 h-96" />
      <Skeleton className="w-96 h-96" />
      <Skeleton className="w-96 h-96" />
    </div>
  </section>
);
