import productsData from "@/data/products.json";
import { PRODUCT_CATEGORIES, categoryLabel } from "@/lib/categories";
import type { Product } from "@/types/product";

const products = productsData as Product[];

export interface CategorySummary {
  slug: string;
  label: string;
  count: number;
  image: string;
}

export function getCategorySummaries(): CategorySummary[] {
  return PRODUCT_CATEGORIES.map((category) => {
    const inCategory = products.filter((p) => p.category === category);
    const showcase = inCategory.reduce<Product | null>(
      (best, p) => (best === null || p.rating > best.rating ? p : best),
      null,
    );
    return {
      slug: category,
      label: categoryLabel(category),
      count: inCategory.length,
      image: showcase?.images[0] ?? "",
    };
  }).filter((c) => c.count > 0);
}

export function getTrendingProducts(limit = 8): Product[] {
  return [...products]
    .sort(
      (a, b) =>
        b.rating - a.rating ||
        b.reviewCount - a.reviewCount ||
        a.title.localeCompare(b.title),
    )
    .slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
}

export function getTopRatedProduct(): Product {
  return getTrendingProducts(1)[0];
}

export interface ShowcasedReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  productTitle: string;
  productSlug: string;
}

export function getShowcasedReviews(limit = 3): ShowcasedReview[] {
  const collected: ShowcasedReview[] = [];

  for (const product of products) {
    for (const review of product.reviews) {
      if (review.rating < 5 || review.comment.length < 80) continue;
      collected.push({
        id: review.id,
        author: review.author,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        productTitle: product.title,
        productSlug: product.slug,
      });
    }
  }

  return collected
    .sort((a, b) => b.comment.length - a.comment.length)
    .slice(0, limit);
}

export function getCatalogueSize(): number {
  return products.length;
}