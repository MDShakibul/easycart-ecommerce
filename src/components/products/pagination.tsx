"use client";

import { Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/cn";
import type { PaginationMeta } from "@/types/product";

function pageWindow(page: number, totalPages: number): (number | "gap")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "gap")[] = [1];
  if (page > 3) pages.push("gap");

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  for (let i = start; i <= end; i += 1) pages.push(i);

  if (page < totalPages - 2) pages.push("gap");
  pages.push(totalPages);

  return pages;
}

function PaginationControls({ pagination }: { pagination: PaginationMeta }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { page, totalPages, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  function goToPage(target: number) {
    const next = new URLSearchParams(searchParams.toString());
    if (target <= 1) {
      next.delete("page");
    } else {
      next.set("page", String(target));
    }
    const query = next.toString();
    router.push(query === "" ? pathname : `${pathname}?${query}`);
  }

  const navButton =
    "flex h-10 items-center gap-1 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={!hasPrevPage}
        aria-label="Previous page"
        className={navButton}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1">
        {pageWindow(page, totalPages).map((entry, index) =>
          entry === "gap" ? (
            <span
              key={`gap-${index}`}
              className="flex h-10 w-8 items-center justify-center text-ink-muted"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              onClick={() => goToPage(entry)}
              aria-label={`Page ${entry}`}
              aria-current={entry === page ? "page" : undefined}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
                entry === page
                  ? "bg-brand text-brand-ink"
                  : "text-ink-soft hover:bg-surface hover:text-ink",
              )}
            >
              {entry}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={!hasNextPage}
        aria-label="Next page"
        className={navButton}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

export function Pagination({ pagination }: { pagination: PaginationMeta }) {
  return (
    <Suspense fallback={null}>
      <PaginationControls pagination={pagination} />
    </Suspense>
  );
}