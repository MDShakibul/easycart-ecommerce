import type { Metadata } from "next";

import { InfoPage } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Easy Cart website and your purchases.",
};

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms of Service"
      description="The agreement between you and Easy Cart when you use this site."
      updated="September 16, 2026"
      sections={[
        {
          heading: "Acceptance",
          body: [
            "By browsing this site or placing an order you agree to these terms. If you do not agree with any part of them, please do not use the store.",
          ],
        },
        {
          heading: "Orders and pricing",
          body: [
            "An order is an offer to buy. It is accepted only when we dispatch the goods. If an item is mispriced or unavailable, we may decline the order and refund you in full.",
            "Prices are shown in US dollars and exclude any applicable sales tax, which is calculated at checkout.",
          ],
        },
        {
          heading: "Payment",
          body: [
            "Payment is taken at the time of ordering. We use a third-party processor and never receive your full card details.",
          ],
        },
        {
          heading: "Shipping and risk",
          body: [
            "Risk in the goods passes to you on delivery. Title passes once we have received payment in full.",
            "Delivery estimates are estimates, not guarantees. Delays caused by carriers or events outside our control do not constitute a breach of these terms.",
          ],
        },
        {
          heading: "Returns",
          body: [
            "Returns are governed by our Returns & Refunds policy, which forms part of these terms.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "You agree not to scrape, overload, reverse engineer or otherwise interfere with this site, and not to use it for any unlawful purpose.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the extent permitted by law, our liability for any claim arising from an order is limited to the amount you paid for the goods giving rise to the claim. Nothing in these terms excludes liability that cannot lawfully be excluded.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of the State of California, without regard to its conflict of law provisions.",
          ],
        },
      ]}
    />
  );
}