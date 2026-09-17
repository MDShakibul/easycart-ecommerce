import type { Metadata } from "next";

import { HomeHero } from "@/components/home/home-hero";


export const metadata: Metadata = {
  title: "XM Store — Shop Everything",
  description:
    "A curated catalogue across electronics, fashion, home, beauty, sports and more. Real stock counts, honest reviews, fast shipping.",
};

export default function HomePage() {


  return (
    <main className="flex flex-1 flex-col">
      <HomeHero />
      
    </main>
  );
}