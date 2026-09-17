import type { Product } from "@/types/product";

export interface ProductFamilyInfo {
  key: string;
  baseTitle: string;
  option: string;
}

function normalize(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

/**
 * Gets a family only when the title has a clear final comma-separated option.
 * The family is still validated against brand and category by the matcher.
 */
export function getProductFamilyInfo(
  product: Pick<Product, "title" | "category" | "brand">,
): ProductFamilyInfo | null {
  const title = typeof product.title === "string" ? product.title.trim() : "";
  const separator = title.lastIndexOf(",");

  if (separator <= 0 || separator === title.length - 1) {
    return null;
  }

  const baseTitle = title.slice(0, separator).trim();
  const option = title.slice(separator + 1).trim();
  const category = typeof product.category === "string" ? product.category : "";
  const brand = typeof product.brand === "string" ? product.brand : "";

  if (!baseTitle || !option) {
    return null;
  }

  return {
    key: `${normalize(brand)}|${normalize(category)}|${normalize(baseTitle)}`,
    baseTitle,
    option,
  };
}

export function isSameProductFamily(
  product: Pick<Product, "title" | "category" | "brand">,
  candidate: Pick<Product, "title" | "category" | "brand">,
): boolean {
  const family = getProductFamilyInfo(product);
  const candidateFamily = getProductFamilyInfo(candidate);

  return family !== null && candidateFamily !== null && family.key === candidateFamily.key;
}

export function getProductVariantLabel(
  product: Pick<Product, "title" | "category" | "brand">,
): string | null {
  return getProductFamilyInfo(product)?.option ?? null;
}
