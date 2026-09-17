import { useQuery } from "@tanstack/react-query";

import { getRelatedProducts } from "@/services/product.service";
import type { Product } from "@/types/product";

/** Related-products cache entry per slug. */
export function relatedProductsQueryKey(slug: string) {
  return ["related-products", slug] as const;
}

/**
 * Related products for a details page. TanStack Query owns this
 * server state — no Redux copy, no duplicate local state.
 */
export function useRelatedProducts(slug: string) {
  return useQuery<Product[]>({
    queryKey: relatedProductsQueryKey(slug),
    queryFn: () => getRelatedProducts(slug),
    enabled: slug.trim().length > 0,
  });
}
