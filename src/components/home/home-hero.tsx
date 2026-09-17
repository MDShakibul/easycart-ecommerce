import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { formatPrice } from "@/lib/format";
import { getCatalogueSize, getCategorySummaries, getTopRatedProduct } from "@/lib/home";

export function HomeHero() {
  const hero = getTopRatedProduct();
  const catalogueSize = getCatalogueSize();
  const categoryCount = getCategorySummaries().length;

  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-soft via-paper to-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl"
      />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3.5 py-1.5 text-xs font-medium text-brand shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            {catalogueSize} products · {categoryCount} categories
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Everyday essentials,
            <br />
            <span className="bg-gradient-to-r from-brand to-indigo-500 bg-clip-text text-transparent">chosen properly.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            Electronics, fashion, home, beauty and more — a curated catalogue
            with honest stock counts, real reviews and no manufactured urgency.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-medium text-brand-ink shadow-md shadow-indigo-600/25 transition-all hover:bg-brand-hover hover:shadow-lg hover:shadow-indigo-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Browse the catalogue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/products?sort=newest"
              className="flex h-12 items-center justify-center rounded-full border border-line-strong bg-white px-7 text-sm font-medium text-ink shadow-sm transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              New arrivals
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-brand/15 via-indigo-300/20 to-transparent blur-2xl"
          />
          <Link
            href={`/products/${hero.slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_60px_-20px_rgba(79,70,229,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
              <Image
                src={hero.images[0]}
                alt={hero.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                priority
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-line p-4">
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-wide text-ink-muted uppercase">
                  Top rated
                </p>
                <p className="mt-0.5 truncate font-semibold text-ink">
                  {hero.title}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="flex items-center justify-end gap-1 text-sm font-medium text-ink-soft">
                  <Star
                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                  {hero.rating.toFixed(1)}
                </p>
                <p className="font-bold text-brand">{formatPrice(hero.price)}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}