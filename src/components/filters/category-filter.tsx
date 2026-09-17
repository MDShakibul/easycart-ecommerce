"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/cn";
import { PRODUCT_CATEGORIES, categoryLabel } from "@/lib/categories";
import { buildFilterHref, readFilterState } from "@/lib/product-filters";

interface CategoryOption {
  value: string;
  label: string;
}

const OPTIONS: CategoryOption[] = [
  { value: "", label: "All categories" },
  ...PRODUCT_CATEGORIES.map((category) => ({
    value: category,
    label: categoryLabel(category),
  })),
];

/**
 * Category facet. Options are links, so filtering works without JavaScript,
 * participates in history, and stays driven entirely by `?category=`.
 */
export function CategoryFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { category } = readFilterState(searchParams);

  return (
    <ul className="space-y-0.5">
      {OPTIONS.map((option) => {
        const active = category === option.value;
        return (
          <li key={option.value === "" ? "all" : option.value}>
            <Link
              href={buildFilterHref(pathname, searchParams, {
                category: option.value === "" ? null : option.value,
              })}
              aria-current={active ? "true" : undefined}
              className={cn(
                "flex h-9 items-center rounded-lg px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
                active
                  ? "bg-brand font-medium text-brand-ink"
                  : "text-ink-soft hover:bg-surface hover:text-ink",
              )}
            >
              {option.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}