"use client";

import { useState, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buildFilterHref, readFilterState } from "@/lib/product-filters";


function parsePrice(raw: string): number | undefined | null {
  const trimmed = raw.trim();
  if (trimmed === "") return undefined;
  const value = Number(trimmed);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}


export function PriceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const state = readFilterState(searchParams);

  const [minDraft, setMinDraft] = useState(state.minPrice);
  const [maxDraft, setMaxDraft] = useState(state.maxPrice);
  const [lastUrlMin, setLastUrlMin] = useState(state.minPrice);
  const [lastUrlMax, setLastUrlMax] = useState(state.maxPrice);
  const [error, setError] = useState<string | null>(null);

  // Re-sync drafts when the URL changes elsewhere (back/forward/clear-all).
  if (state.minPrice !== lastUrlMin) {
    setLastUrlMin(state.minPrice);
    setMinDraft(state.minPrice);
  }
  if (state.maxPrice !== lastUrlMax) {
    setLastUrlMax(state.maxPrice);
    setMaxDraft(state.maxPrice);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const min = parsePrice(minDraft);
    const max = parsePrice(maxDraft);

    if (min === null || max === null) {
      setError("Enter prices of 0 or more.");
      return;
    }
    if (min !== undefined && max !== undefined && min > max) {
      setError("Minimum must not exceed maximum.");
      return;
    }

    setError(null);
    router.push(
      buildFilterHref(pathname, searchParams, {
        minPrice: min === undefined ? null : String(min),
        maxPrice: max === undefined ? null : String(max),
      }),
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <label htmlFor="min-price" className="sr-only">
            Minimum price
          </label>
          <Input
            id="min-price"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="Min"
            value={minDraft}
            onChange={(event) => setMinDraft(event.target.value)}
            className="h-10"
          />
        </div>
        <span className="text-ink-muted" aria-hidden="true">
          –
        </span>
        <div className="min-w-0 flex-1">
          <label htmlFor="max-price" className="sr-only">
            Maximum price
          </label>
          <Input
            id="max-price"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="Max"
            value={maxDraft}
            onChange={(event) => setMaxDraft(event.target.value)}
            className="h-10"
          />
        </div>
      </div>

      {error !== null && (
        <p role="alert" className="text-xs text-error">
          {error}
        </p>
      )}

      <Button type="submit" variant="outline" size="sm" className="w-full">
        Apply price
      </Button>
    </form>
  );
}