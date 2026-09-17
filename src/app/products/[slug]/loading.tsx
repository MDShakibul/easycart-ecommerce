import { ProductDetailsSkeleton } from "@/components/product/product-details-skeleton";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-4 w-72" />

      <div className="mt-6">
        <ProductDetailsSkeleton />
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <Skeleton className="h-8 w-56" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}