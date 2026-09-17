import type { Metadata } from "next";

import { CustomerReviews } from "@/components/home/customer-reviews";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { HomeHero } from "@/components/home/home-hero";
import { ProductRow } from "@/components/home/product-row";
import { PromoBanner } from "@/components/home/promo-banner";
import { TrustProps } from "@/components/home/trust-props";
import { getNewArrivals, getTrendingProducts } from "@/lib/home";

export const metadata: Metadata = {
  title: "XM Store — Shop Everything",
  description:
    "A curated catalogue across electronics, fashion, home, beauty, sports and more. Real stock counts, honest reviews, fast shipping.",
};

export default function HomePage() {
  const trending = getTrendingProducts(8);
  const newArrivals = getNewArrivals(8);

  return (
    <main className="flex flex-1 flex-col">
      <HomeHero />
      <FeaturedCategories />
      <ProductRow
        title="Trending now"
        description="Highest rated across the whole catalogue."
        products={trending}
        href="/products?sort=rating"
        hrefLabel="See all"
      />
      <PromoBanner />
      <ProductRow
        title="New arrivals"
        description="The latest additions to the store."
        products={newArrivals}
        href="/products?sort=newest"
        hrefLabel="See all"
      />
      <TrustProps />
      <CustomerReviews />
    </main>
  );
}