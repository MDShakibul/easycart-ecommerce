import { useQuery } from "@tanstack/react-query";

import { getProductVariants } from "@/services/product.service";
import type { Product } from "@/types/product";

export function productVariantsQueryKey(slug: string) {
  return ["product-variants", slug] as const;
}

/** Returns only reliably detected variants from the same product family. */
export function useProductVariants(slug: string) {
  return useQuery<Product[]>({
    queryKey: productVariantsQueryKey(slug),
    queryFn: () => getProductVariants(slug),
    enabled: slug.trim().length > 0,
  });
}
