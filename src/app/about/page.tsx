import type { Metadata } from "next";

import { InfoPage } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "XM Store is a curated online retailer offering everyday essentials across electronics, fashion, home and more.",
};

export default function AboutPage() {
  return (
    <InfoPage
      title="About Us"
      description="A curated store built around good products at fair prices."
      updated="September 16, 2026"
      sections={[
        {
          heading: "Our story",
          body: [
            "XM Store started with a simple frustration: shopping online had become noisy. Too many near-identical listings, too many inflated discounts, too little information about what you were actually buying.",
            "We built the opposite. A smaller, deliberately chosen range across electronics, fashion, home, beauty, sports, books, toys and grocery — each item picked because it earns its place, not because it fills a category page.",
          ],
        },
        {
          heading: "How we work",
          body: [
            "Every product page carries the details that matter: what it is, what it costs, whether it is in stock, and what other customers thought. No countdown timers. No invented scarcity.",
            "We keep our pricing straightforward and our shipping predictable. If something is out of stock, we say so rather than letting you find out at checkout.",
          ],
        },
        {
          id: "careers",
          heading: "Careers",
          body: [
            "We are a small, remote-first team. We hire people who care about craft — whether that is merchandising, photography, logistics or software.",
            "We do not currently have open roles listed. If you think you would be a strong fit, reach out through our contact page and tell us what you would want to work on.",
          ],
        },
        {
          id: "sustainability",
          heading: "Sustainability",
          body: [
            "Packaging is recyclable and right-sized. We consolidate multi-item orders into a single shipment whenever the warehouse allows it.",
            "We would rather under-claim than over-promise on environmental commitments. Where we have measurable progress, we publish it. Where we do not, we say nothing.",
          ],
        },
      ]}
    />
  );
}