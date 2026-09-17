export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  reviews: ProductReview[];
  brand: string;
  createdAt: string;
}

export type SortOption = "price-low" | "price-high" | "rating" | "newest";

export interface ProductQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: SortOption | string;
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductListResponse {
  products: Product[];
  pagination: PaginationMeta;
}

export interface RelatedProductsResponse {
  products: Product[];
}

export interface ProductVariantsResponse {
  products: Product[];
}
