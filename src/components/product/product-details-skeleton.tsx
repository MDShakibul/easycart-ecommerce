import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:gap-14">
        <div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              {[0, 1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-14 w-14 rounded-xl" />
              ))}
            </div>
            <Skeleton className="aspect-square w-full rounded-2xl" />
          </div>
        </div>

        <div>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-16 w-full" />
          <Skeleton className="mt-4 h-5 w-48" />
          <Skeleton className="mt-6 h-10 w-32" />
          <Skeleton className="mt-5 h-16 w-full" />
          <Skeleton className="mt-6 h-12 w-full rounded-full" />
          <Skeleton className="mt-4 h-12 w-full rounded-2xl" />
        </div>
      </div>

      <div className="mt-16 border-b border-line pt-10">
        <div className="flex gap-6">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-7 w-20" />
        </div>
      </div>
      <Skeleton className="mt-8 h-28 w-full max-w-3xl" />
    </div>
  );
}
