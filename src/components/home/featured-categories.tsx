import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { getCategorySummaries } from "@/lib/home";

export function FeaturedCategories() {
  const categories = getCategorySummaries();


  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="Shop by category"
        description="Eight departments, one catalogue."
        action={
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-medium text-brand transition-colors hover:text-brand-hover"
          >
            All products
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/products?category=${encodeURIComponent(category.slug)}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_12px_32px_-12px_rgba(79,70,229,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-surface">
                {category.image !== "" && (
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex items-center justify-between gap-2 p-4">
                <div>
                  <p className="font-semibold text-ink">{category.label}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {category.count} products
                  </p>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}