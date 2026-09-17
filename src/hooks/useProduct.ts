import { useQuery } from "@tanstack/react-query";

import { getProductBySlug } from "@/services/product.service";
import type { Product } from "@/types/product";

/** Details cache entry per slug. */
export function productQueryKey(slug: string) {
  return ["product", slug] as const;
}

/**
 * Single product details. TanStack Query owns this server state —
 * never copy the response into Redux or local state.
 */
export function useProduct(slug: string) {
  return useQuery<Product>({
    queryKey: productQueryKey(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: slug.trim().length > 0,
  });
}
