"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export function ListingSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlValue = searchParams.get("search") ?? "";

  const [value, setValue] = useState(urlValue);
  const [lastUrlValue, setLastUrlValue] = useState(urlValue);

  // Adopt external URL changes (back/forward, chip removal) during render.
  if (urlValue !== lastUrlValue) {
    setLastUrlValue(urlValue);
    setValue(urlValue);
  }

  useEffect(() => {
    if (value === urlValue) return;

    const timer = setTimeout(() => {
      const next = new URLSearchParams(searchParams.toString());
      const trimmed = value.trim();
      if (trimmed === "") {
        next.delete("search");
      } else {
        next.set("search", trimmed);
      }
      next.delete("page");
      const query = next.toString();
      router.replace(query === "" ? pathname : `${pathname}?${query}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, urlValue, searchParams, router, pathname]);

  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        aria-label="Search products"
        placeholder="Search products…"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-11 w-full rounded-full border border-line-strong bg-paper-raised pr-10 pl-10 text-sm text-ink transition-colors placeholder:text-ink-muted focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10"
      />
      {value !== "" && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-2.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}