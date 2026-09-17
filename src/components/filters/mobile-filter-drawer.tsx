"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { countActiveFilters, readFilterState } from "@/lib/product-filters";


export function MobileFilterDrawer({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const activeCount = countActiveFilters(readFilterState(searchParams));

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        Filters
        {activeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-semibold text-brand-ink">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="filters-backdrop"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            <m.div
              key="filters-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Product filters"
              initial={shouldReduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={shouldReduceMotion ? undefined : { x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-50 flex h-full w-[88%] max-w-sm flex-col bg-paper shadow-xl"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
                <h2 className="text-base font-semibold text-ink">Filters</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close filters"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-1">
                {children}
              </div>

              <div className="shrink-0 border-t border-line p-4">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {activeCount > 0
                    ? `Show results (${activeCount} filters)`
                    : "Show results"}
                </Button>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}