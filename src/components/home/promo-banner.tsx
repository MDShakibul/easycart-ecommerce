import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { formatPrice } from "@/lib/format";
import { getTopRatedProduct } from "@/lib/home";

export function PromoBanner() {
  const hero = getTopRatedProduct();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative grid overflow-hidden rounded-2xl bg-gradient-to-br from-brand-hover via-brand to-indigo-500 text-white shadow-[0_24px_60px_-20px_rgba(79,70,229,0.5)] lg:grid-cols-2">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl"
        />
        <div className="relative flex flex-col justify-center gap-5 p-8 sm:p-12">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            Most reviewed this month
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {hero.title}
          </h2>
          <p className="max-w-md text-sm leading-relaxed opacity-80">
            {hero.description.slice(0, 180)}
            {hero.description.length > 180 ? "…" : ""}
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold">
              {formatPrice(hero.price)}
            </span>
            <span className="text-sm opacity-70">
              {hero.reviewCount} reviews
            </span>
          </div>
          <Link
            href={`/products/${hero.slug}`}
            className="mt-2 flex h-11 w-fit items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-brand shadow-md transition-all hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
          >
            View product
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div
          className="hidden bg-white/10 lg:block"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}