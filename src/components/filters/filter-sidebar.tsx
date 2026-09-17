import { FilterFacets } from "@/components/filters/filter-facets";

export function FilterSidebar() {
  return (
    <div className="rounded-xl border border-line bg-paper-raised px-5 py-1">
      <FilterFacets />
    </div>
  );
}