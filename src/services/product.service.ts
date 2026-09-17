import type {
  Product,
  ProductListResponse,
  ProductQueryParams,
  RelatedProductsResponse,
} from "@/types/product";

const BASE_PATH = "/api/products";


export function buildProductsQuery(params: ProductQueryParams = {}): string {
  const searchParams = new URLSearchParams();

  if (params.search !== undefined && params.search.trim() !== "") {
    searchParams.set("search", params.search.trim());
  }
  if (params.category !== undefined && params.category.trim() !== "") {
    searchParams.set("category", params.category.trim());
  }
  if (params.minPrice !== undefined && Number.isFinite(params.minPrice)) {
    searchParams.set("minPrice", String(params.minPrice));
  }
  if (params.maxPrice !== undefined && Number.isFinite(params.maxPrice)) {
    searchParams.set("maxPrice", String(params.maxPrice));
  }
  if (params.rating !== undefined && Number.isFinite(params.rating)) {
    searchParams.set("rating", String(params.rating));
  }
  if (params.sort !== undefined && params.sort.trim() !== "") {
    searchParams.set("sort", params.sort.trim());
  }
  if (params.page !== undefined && Number.isFinite(params.page)) {
    searchParams.set("page", String(params.page));
  }
  if (params.limit !== undefined && Number.isFinite(params.limit)) {
    searchParams.set("limit", String(params.limit));
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      // Keep the default message when the body is not JSON.
    }
    const error = new Error(message) as Error & { status?: number };
    error.status = res.status;
    throw error;
  }
  return (await res.json()) as T;
}

/**
 * Fetch one paginated page of products.
 * Returns only that page plus pagination metadata —
 * never the full 500+ dataset.
 */
export async function getProducts(
  params: ProductQueryParams = {},
): Promise<ProductListResponse> {
  const res = await fetch(`${BASE_PATH}${buildProductsQuery(params)}`);
  return handleResponse<ProductListResponse>(res);
}

/** Fetch a single product by slug. Throws (status 404) when missing. */
export async function getProductBySlug(slug: string): Promise<Product> {
  const res = await fetch(`${BASE_PATH}/${encodeURIComponent(slug)}`);
  return handleResponse<Product>(res);
}

/** Fetch products related to the given slug (current product excluded by the API). */
export async function getRelatedProducts(
  slug: string,
  limit?: number,
): Promise<Product[]> {
  const query =
    limit !== undefined && Number.isFinite(limit) ? `?limit=${limit}` : "";
  const res = await fetch(
    `${BASE_PATH}/${encodeURIComponent(slug)}/related${query}`,
  );
  const data = await handleResponse<RelatedProductsResponse>(res);
  return data.products;
}
