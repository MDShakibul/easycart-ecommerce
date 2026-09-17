"use client";

import { ProductCard } from "@/components/product-card";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { SectionHeading } from "@/components/ui/section-heading";
import { useRelatedProducts } from "@/hooks/useRelatedProducts";

/**
 * Related products for a details page. TanStack Query owns this server state —
 * the current product is excluded by the API, not by filtering here.
 */
export function RelatedProducts({ slug }: { slug: string }) {
  const { data: products, isPending, isError } = useRelatedProducts(slug);

  if (isPending) {
    return (
      <section>
        <SectionHeading title="You may also like" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !products || products.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading
        title="You may also like"
        description="Family matches appear first, followed by related category and brand products."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
