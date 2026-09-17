"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Select } from "@/components/ui/select";
import {
  SORT_OPTIONS,
  buildFilterHref,
  readFilterState,
} from "@/lib/product-filters";


export function SortFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { sort } = readFilterState(searchParams);

  const value = SORT_OPTIONS.some((option) => option.value === sort)
    ? sort
    : "";

  function handleChange(nextValue: string) {
    router.push(
      buildFilterHref(
        pathname,
        searchParams,
        { sort: nextValue === "" ? null : nextValue },
        { resetPage: false },
      ),
    );
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-filter"
        className="text-sm whitespace-nowrap text-ink-soft"
      >
        Sort
      </label>
      <Select
        id="sort-filter"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        className="h-10 w-44"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}