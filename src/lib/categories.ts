/** Product categories present in the dataset. */
export const PRODUCT_CATEGORIES = [
  "electronics",
  "fashion",
  "home",
  "beauty",
  "sports",
  "books",
  "toys",
  "grocery",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/** Human-readable label, e.g. "electronics" -> "Electronics". */
export function categoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}
