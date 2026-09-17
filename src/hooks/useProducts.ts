import { useEffect, useMemo } from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { getProducts } from "@/services/product.service";
import type {
  ProductListResponse,
  ProductQueryParams,
} from "@/types/product";

export interface NormalizedProductParams {
  search: string;
  category: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort: string;
  page: number;
  limit: number;
}

/** Normalize so the query key always contains ALL listing parameters. */
export function normalizeProductParams(
  params: ProductQueryParams = {},
): NormalizedProductParams {
  return {
    search: params.search ?? "",
    category: params.category ?? "",
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    rating: params.rating,
    sort: params.sort ?? "",
    page: params.page ?? 1,
    limit: params.limit ?? 20,
  };
}

/** Query key containing ALL listing parameters — different filters = different cache entries. */
export function productsQueryKey(params: ProductQueryParams = {}) {
  return ["products", normalizeProductParams(params)] as const;
}

/**
 * Paginated product listing. TanStack Query owns this server state:
 * no Redux copy, no duplicate local loading/error state.
 * Keeps previous page visible while fetching + prefetches the next page.
 */
export function useProducts(params: ProductQueryParams = {}) {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    rating,
    sort,
    page,
    limit,
  } = params;

  // Stable reference so the query key and prefetch effect don't churn each render.
  const normalized = useMemo(
    () =>
      normalizeProductParams({
        search,
        category,
        minPrice,
        maxPrice,
        rating,
        sort,
        page,
        limit,
      }),
    [search, category, minPrice, maxPrice, rating, sort, page, limit],
  );
  const queryKey = useMemo(() => productsQueryKey(normalized), [normalized]);

  const queryClient = useQueryClient();
  const query = useQuery<ProductListResponse>({
    queryKey,
    queryFn: () => getProducts(normalized),
    placeholderData: keepPreviousData,
  });

  const hasNextPage = query.data?.pagination.hasNextPage ?? false;

  useEffect(() => {
    if (!hasNextPage) return;
    const nextParams = { ...normalized, page: normalized.page + 1 };
    queryClient.prefetchQuery({
      queryKey: productsQueryKey(nextParams),
      queryFn: () => getProducts(nextParams),
    });
  }, [hasNextPage, normalized, queryClient]);

  return query;
}
