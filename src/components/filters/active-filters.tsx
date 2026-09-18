"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

import { categoryLabel } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import {
  buildFilterHref,
  countActiveFilters,
  isValidAmount,
  readFilterState,
  type FilterChanges,
} from "@/lib/product-filters";

interface Chip {
  key: string;
  label: string;
  changes: FilterChanges;
}


export function ActiveFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const state = readFilterState(searchParams);

  const chips: Chip[] = [];

  if (state.category !== "") {
    chips.push({
      key: "category",
      label: categoryLabel(state.category),
      changes: { category: null },
    });
  }

  if (isValidAmount(state.minPrice) || isValidAmount(state.maxPrice)) {
    const min = isValidAmount(state.minPrice) ? Number(state.minPrice) : null;
    const max = isValidAmount(state.maxPrice) ? Number(state.maxPrice) : null;
    const label =
      min !== null && max !== null
        ? `${formatPrice(min)} – ${formatPrice(max)}`
        : min !== null
          ? `From ${formatPrice(min)}`
          : `Up to ${formatPrice(max as number)}`;
    chips.push({
      key: "price",
      label,
      changes: { minPrice: null, maxPrice: null },
    });
  }

  if (isValidAmount(state.rating)) {
    chips.push({
      key: "rating",
      label: `${state.rating}★ & up`,
      changes: { rating: null },
    });
  }

  if (chips.length === 0) return null;

  const clearAllHref = buildFilterHref(pathname, searchParams, {
    search: state.search === "" ? null : state.search,
    category: null,
    minPrice: null,
    maxPrice: null,
    rating: null,
    sort: state.sort === "" ? null : state.sort,
  });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium tracking-wide text-ink-muted uppercase">
        Active
      </span>

      {chips.map((chip) => (
        <Link
          key={chip.key}
          href={buildFilterHref(pathname, searchParams, chip.changes)}
          className="group flex h-8 items-center gap-1.5 rounded-full border border-line-strong bg-paper-raised pl-3 pr-2 text-xs font-medium text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          {chip.label}
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full text-ink-muted transition-colors group-hover:bg-surface group-hover:text-ink"
            aria-hidden="true"
          >
            <X className="h-3 w-3" />
          </span>
          <span className="sr-only">Remove filter</span>
        </Link>
      ))}

      <Link
        href={clearAllHref}
        className="ml-1 rounded text-xs font-medium text-ink-soft underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        Clear all ({countActiveFilters(state)})
      </Link>
    </div>
  );
}