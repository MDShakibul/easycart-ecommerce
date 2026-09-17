import { PRODUCT_CATEGORIES, categoryLabel } from "@/lib/categories";
import type { ProductCategory } from "@/lib/categories";

export interface NavItem {
  label: string;
  href: string;
}

export function categoryHref(category: string): string {
  return `/products?category=${category}`;
}

/** Every category in the dataset — used by the mobile drawer. */
export const CATEGORY_NAV: NavItem[] = PRODUCT_CATEGORIES.map((category) => ({
  label: categoryLabel(category),
  href: categoryHref(category),
}));

const DESKTOP_CATEGORIES: ProductCategory[] = [
  "electronics",
  "fashion",
  "home",
  "beauty",
  "sports",
];

/** Curated subset that fits the desktop nav bar. */
export const DESKTOP_NAV: NavItem[] = [
  { label: "All Products", href: "/products" },
  ...DESKTOP_CATEGORIES.map((category) => ({
    label: categoryLabel(category),
    href: categoryHref(category),
  })),
  { label: "New Arrivals", href: "/products?sort=newest" },
];