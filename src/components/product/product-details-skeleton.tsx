import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-20 w-20 rounded-lg" />
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  );
}