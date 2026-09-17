import type { ReactNode } from "react";

import { CategoryFilter } from "@/components/filters/category-filter";
import { PriceFilter } from "@/components/filters/price-filter";
import { RatingFilter } from "@/components/filters/rating-filter";

function Facet({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-line py-5 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className="mb-3 text-xs font-semibold tracking-wide text-ink uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * The three filter facets, shared by the desktop sidebar and the mobile
 * drawer so the two never drift apart.
 */
export function FilterFacets() {
  return (
    <>
      <Facet title="Category">
        <CategoryFilter />
      </Facet>
      <Facet title="Price">
        <PriceFilter />
      </Facet>
      <Facet title="Rating">
        <RatingFilter />
      </Facet>
    </>
  );
}