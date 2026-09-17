"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PackageSearch, RotateCcw } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/products/product-card-skeleton";
import { Pagination } from "@/components/products/pagination";
import { Button, buttonStyles } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useProducts } from "@/hooks/useProducts";
import { buildFilterHref } from "@/lib/product-filters";

export interface ProductResultsProps {
  search: string;
  category: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort: string;
  page: number;
  limit: number;
}

/**
 * Client boundary for the listing results. TanStack Query owns
 * loading / error / success state — no duplicated local state. Every
 * parameter arrives from the URL, which remains the source of truth.
 */
export function ProductResults({
  search,
  category,
  minPrice,
  maxPrice,
  rating,
  sort,
  page,
  limit,
}: ProductResultsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isPending, isError, error, refetch, isFetching } = useProducts({
    search,
    category,
    minPrice,
    maxPrice,
    rating,
    sort,
    page,
    limit,
  });

  if (isPending) {
    return <ProductGridSkeleton />;
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised px-6 py-16 text-center"
      >
        <h2 className="text-lg font-semibold text-ink">
          We couldn&apos;t load these products
        </h2>
        <p className="max-w-md text-sm text-ink-soft">
          {error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."}
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {isFetching ? "Retrying…" : "Try again"}
        </Button>
      </div>
    );
  }

  if (data.products.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description="Try adjusting your search or removing some filters."
        action={
          <Link
            href={buildFilterHref(pathname, searchParams, {
              search: null,
              category: null,
              minPrice: null,
              maxPrice: null,
              rating: null,
            })}
            className={buttonStyles("primary", "md")}
          >
            Clear filters
          </Link>
        }
      />
    );
  }

  const { total, page: currentPage } = data.pagination;
  const from = (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, total);

  return (
    <div className="space-y-6">
      <p
        className="text-sm text-ink-soft"
        aria-live="polite"
        aria-busy={isFetching}
      >
        Showing <span className="font-medium text-ink">{from}</span>–
        <span className="font-medium text-ink">{to}</span> of{" "}
        <span className="font-medium text-ink">{total}</span> products
      </p>

      <div
        className={`product-grid-3-cols transition-opacity ${
          isFetching ? "opacity-60" : "opacity-100"
        }`}
      >
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="pt-2">
        <Pagination pagination={data.pagination} />
      </div>
    </div>
  );
}