import type { Metadata } from "next";

import { InfoPage } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Processing times, delivery options, costs and tracking for Easy Cart orders.",
};

export default function ShippingPage() {
  return (
    <InfoPage
      title="Shipping & Delivery"
      description="When your order ships, what it costs, and how to track it."
      updated="September 16, 2026"
      sections={[
        {
          heading: "Processing time",
          body: [
            "Orders placed before 2:00 PM on a business day are picked and packed the same day. Orders placed after that, or on weekends and public holidays, are processed the next business day.",
            "You will receive a dispatch confirmation by email as soon as your parcel leaves the warehouse.",
          ],
        },
        {
          heading: "Delivery options and cost",
          body: [
            "Standard delivery arrives in 3 to 5 business days. Express delivery arrives in 1 to 2 business days.",
            "Shipping is free on orders over $50. Below that threshold, standard delivery is a flat $4.95 and express delivery is $12.95.",
          ],
        },
        {
          heading: "Tracking",
          body: [
            "Every dispatched order includes a tracking number in the confirmation email. Tracking can take a few hours to activate after the label is generated — this is normal and does not mean anything is wrong.",
          ],
        },
        {
          heading: "Delivery issues",
          body: [
            "If tracking has not updated for more than five business days, contact us with your order number and we will open a trace with the carrier.",
            "Parcels marked as delivered but not received should be reported within 48 hours so we can investigate while the carrier's records are still fresh.",
          ],
        },
        {
          heading: "International orders",
          body: [
            "We currently ship within the United States and Canada. International destinations are on the roadmap; duties and import taxes for cross-border orders are the responsibility of the recipient.",
          ],
        },
      ]}
    />
  );
}