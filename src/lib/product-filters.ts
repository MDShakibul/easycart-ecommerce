export interface SortOptionDef {
  value: string;
  label: string;
}

export const SORT_OPTIONS: SortOptionDef[] = [
  { value: "", label: "Featured" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest first" },
];

export interface FilterState {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  rating: string;
  sort: string;
}

export type FilterKey = keyof FilterState;

export type FilterChanges = Partial<Record<FilterKey, string | null>>;

/** True when a raw URL value is a usable non-negative number. */
export function isValidAmount(raw: string): boolean {
  if (raw.trim() === "") return false;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0;
}

export function readFilterState(params: URLSearchParams): FilterState {
  return {
    search: params.get("search") ?? "",
    category: params.get("category") ?? "",
    minPrice: params.get("minPrice") ?? "",
    maxPrice: params.get("maxPrice") ?? "",
    rating: params.get("rating") ?? "",
    sort: params.get("sort") ?? "",
  };
}

/**
 * Build a listing href by merging `changes` into the current query string.
 * Removing a filter drops `page`, because page N of a different result set
 * is meaningless. Sorting is the exception — it keeps the current page.
 */
export function buildFilterHref(
  pathname: string,
  current: URLSearchParams,
  changes: FilterChanges,
  options: { resetPage?: boolean } = {},
): string {
  const { resetPage = true } = options;
  const next = new URLSearchParams(current.toString());

  for (const key of Object.keys(changes) as FilterKey[]) {
    const value = changes[key];
    if (value === undefined || value === null || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
  }

  if (resetPage) {
    next.delete("page");
  }

  const query = next.toString();
  return query === "" ? pathname : `${pathname}?${query}`;
}

/** Facet count shown on the mobile filter button. Price counts once. */
export function countActiveFilters(state: FilterState): number {
  let count = 0;
  if (state.category !== "") count += 1;
  if (isValidAmount(state.minPrice) || isValidAmount(state.maxPrice)) count += 1;
  if (isValidAmount(state.rating)) count += 1;
  return count;
}