import type { Metadata } from "next";
import { Suspense } from "react";

import { ActiveFilters } from "@/components/filters/active-filters";
import { FilterFacets } from "@/components/filters/filter-facets";
import { FilterSidebar } from "@/components/filters/filter-sidebar";
import { ListingSearch } from "@/components/filters/search-input";
import { MobileFilterDrawer } from "@/components/filters/mobile-filter-drawer";
import { SortFilter } from "@/components/filters/sort-filter";
import { ProductResults } from "@/components/products/product-results";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { categoryLabel } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse the full Easy Cart catalogue. Filter by category, price and rating, then sort to find exactly what you need.",
};

type RawParams = { [key: string]: string | string[] | undefined };

function readString(params: RawParams, key: string): string {
  const raw = params[key];
  return typeof raw === "string" ? raw.trim() : "";
}

function readAmount(params: RawParams, key: string): number | undefined {
  const raw = params[key];
  if (typeof raw !== "string" || raw.trim() === "") return undefined;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : undefined;
}

function readRating(params: RawParams, key: string): number | undefined {
  const raw = params[key];
  if (typeof raw !== "string" || raw.trim() === "") return undefined;
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

function readPage(params: RawParams, key: string): number {
  const raw = params[key];
  if (typeof raw !== "string" || raw.trim() === "") return 1;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 1 ? Math.floor(value) : 1;
}

const LIMIT = 18;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  const resolved = await searchParams;

  const search = readString(resolved, "search");
  const category = readString(resolved, "category");
  const minPrice = readAmount(resolved, "minPrice");
  const maxPrice = readAmount(resolved, "maxPrice");
  const rating = readRating(resolved, "rating");
  const sort = readString(resolved, "sort");
  const page = readPage(resolved, "page");

  const heading = category === "" ? "All products" : categoryLabel(category);
  const description =
    category === ""
      ? "Everything in the catalogue, filtered and sorted exactly how you want it."
      : `Everything we stock in ${categoryLabel(category).toLowerCase()}.`;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={
          category === ""
            ? [{ label: "Home", href: "/" }, { label: "Products" }]
            : [
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: categoryLabel(category) },
              ]
        }
      />

      <header className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {heading}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">{description}</p>
      </header>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="w-full sm:max-w-md">
          <Suspense fallback={<Skeleton className="h-11 w-full rounded-full" />}>
            <ListingSearch />
          </Suspense>
        </div>

        <div className="flex items-center gap-3 sm:ml-auto">
          <Suspense fallback={null}>
            <MobileFilterDrawer>
              <FilterFacets />
            </MobileFilterDrawer>
          </Suspense>
          <Suspense fallback={null}>
            <SortFilter />
          </Suspense>
        </div>
      </div>

      <div className="mt-4">
        <Suspense fallback={null}>
          <ActiveFilters />
        </Suspense>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <Suspense
            fallback={<Skeleton className="h-96 w-full rounded-xl" />}
          >
            <FilterSidebar />
          </Suspense>
        </aside>

        <div className="min-w-0">
          <ProductResults
            search={search}
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            rating={rating}
            sort={sort}
            page={page}
            limit={LIMIT}
          />
        </div>
      </div>
    </main>
  );
}