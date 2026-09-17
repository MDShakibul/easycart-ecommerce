"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/cn";
import { buildFilterHref, readFilterState } from "@/lib/product-filters";

interface RatingOption {
  value: string;
  label: string;
  stars: number;
}

const OPTIONS: RatingOption[] = [
  { value: "", label: "Any rating", stars: 0 },
  { value: "4.5", label: "4.5 & up", stars: 4 },
  { value: "4", label: "4.0 & up", stars: 4 },
  { value: "3", label: "3.0 & up", stars: 3 },
];


export function RatingFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { rating } = readFilterState(searchParams);

  return (
    <ul className="space-y-0.5">
      {OPTIONS.map((option) => {
        const active = rating === option.value;
        return (
          <li key={option.value === "" ? "any" : option.value}>
            <Link
              href={buildFilterHref(pathname, searchParams, {
                rating: option.value === "" ? null : option.value,
              })}
              aria-current={active ? "true" : undefined}
              className={cn(
                "flex h-9 items-center gap-2 rounded-lg px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
                active
                  ? "bg-brand font-medium text-brand-ink"
                  : "text-ink-soft hover:bg-surface hover:text-ink",
              )}
            >
              {option.stars > 0 && (
                <span className="flex items-center gap-px" aria-hidden="true">
                  {Array.from({ length: option.stars }, (_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </span>
              )}
              <span>{option.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}