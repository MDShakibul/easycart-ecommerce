import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/types/product";

export interface ProductRowProps {
  title: string;
  description: string;
  products: Product[];
  href: string;
  hrefLabel: string;
}

export function ProductRow({
  title,
  description,
  products,
  href,
  hrefLabel,
}: ProductRowProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title={title}
        description={description}
        action={
          <Link
            href={href}
            className="flex items-center gap-1 text-sm font-medium text-brand transition-colors hover:text-brand-hover"
          >
            {hrefLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />

      <div className="product-grid-3-cols">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}