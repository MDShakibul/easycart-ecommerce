import { ProductGridSkeleton } from "@/components/products/product-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-4 w-60" />

      <div className="mt-4">
        <Skeleton className="h-9 w-56 sm:h-10" />
        <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Skeleton className="h-11 w-full rounded-full sm:max-w-md" />
        <div className="flex items-center gap-3 sm:ml-auto">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-44 rounded-full" />
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <Skeleton className="hidden h-96 w-full rounded-xl lg:block" />
        <ProductGridSkeleton />
      </div>
    </main>
  );
}