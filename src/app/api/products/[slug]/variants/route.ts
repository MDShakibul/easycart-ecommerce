import type { NextRequest } from "next/server";

import productsData from "@/data/products.json";
import { isSameProductFamily } from "@/lib/product-family";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

const products = productsData as Product[];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const current = products.find((product) => product.slug === slug);

  if (!current) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  const variants = products.filter((product) =>
    isSameProductFamily(current, product),
  );

  return Response.json({ products: variants.length > 1 ? variants : [] });
}
