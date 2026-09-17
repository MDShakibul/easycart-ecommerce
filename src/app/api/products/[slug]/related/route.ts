import type { NextRequest } from "next/server";

import productsData from "@/data/products.json";
import { isSameProductFamily } from "@/lib/product-family";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

const products = productsData as Product[];

const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 20;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const current = products.find((p) => p.slug === slug);

  if (!current) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  const rawLimit = request.nextUrl.searchParams.get("limit");
  const parsed = rawLimit === null ? DEFAULT_LIMIT : Number(rawLimit);
  const limit =
    Number.isFinite(parsed) && parsed > 0
      ? Math.min(MAX_LIMIT, Math.floor(parsed))
      : DEFAULT_LIMIT;

  const sortByRating = (a: Product, b: Product) =>
    b.rating - a.rating || b.reviewCount - a.reviewCount;
  const family = products
    .filter(
      (product) =>
        product.slug !== current.slug && isSameProductFamily(current, product),
    )
    .sort(sortByRating);
  const category = products
    .filter(
      (product) =>
        product.slug !== current.slug && product.category === current.category,
    )
    .sort(sortByRating);
  const brand = products
    .filter(
      (product) =>
        product.slug !== current.slug && product.brand === current.brand,
    )
    .sort(sortByRating);

  const seen = new Set<string>();
  const related = [...family, ...category, ...brand]
    .filter((product) => {
      if (seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    })
    .slice(0, limit);

  return Response.json({ products: related });
}
