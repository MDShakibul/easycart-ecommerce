import { notFound } from "next/navigation";

import { ProductDetails } from "@/components/product-details";
import { RelatedProducts } from "@/components/related-products";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import productsData from "@/data/products.json";
import { categoryLabel } from "@/lib/categories";
import type { Product } from "@/types/product";

const products = productsData as Product[];

/**
 * Statically generate every catalogue slug and reject everything else at the
 * routing layer.
 *
 * `dynamicParams = false` is what makes an unknown slug a real 404.
 * `app/products/loading.tsx` puts this page inside a Suspense boundary, so a
 * `notFound()` thrown during render streams as a 200 carrying only a
 * `noindex` tag — a soft 404. Rejecting the slug before render is the only way
 * to keep the status code honest, and it removes a per-request server render.
 */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Product not found" };
  }

  const title = product.title?.trim() || "Product";
  const description = product.description?.trim() || "Product details";
  const images = Array.isArray(product.images)
    ? product.images.filter(
        (image): image is string =>
          typeof image === "string" && image.trim().length > 0,
      )
    : [];

  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description,
      images: images.length > 0 ? [images[0]] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const category = product.category?.trim() || "";
  const title = product.title?.trim() || "Product";

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          {
            label: category ? categoryLabel(category) : "Products",
            href: category
              ? `/products?category=${encodeURIComponent(category)}`
              : "/products",
          },
          { label: title },
        ]}
      />

      <div className="mt-6">
        <ProductDetails slug={slug} />
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <RelatedProducts slug={slug} />
      </div>
    </main>
  );
}
