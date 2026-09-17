import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

const products = productsData as Product[];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}
