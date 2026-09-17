import type { Metadata } from "next";

import { InfoPage } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description:
    "How to return an item to Easy Cart, what qualifies, and when to expect your refund.",
};

export default function ReturnsPage() {
  return (
    <InfoPage
      title="Returns & Refunds"
      description="Thirty days to change your mind, and a straightforward process when you do."
      updated="September 16, 2026"
      sections={[
        {
          heading: "Return window",
          body: [
            "You have 30 calendar days from the delivery date to return most items. The window starts on the day the carrier marks the parcel as delivered, not the day you ordered.",
          ],
        },
        {
          heading: "Condition requirements",
          body: [
            "Items must be unused and returned in their original packaging with any accessories, manuals and tags included. Products that have been worn, installed, washed or altered cannot be accepted.",
            "For hygiene reasons, opened beauty products and underwear cannot be returned unless they arrived faulty.",
          ],
        },
        {
          heading: "Starting a return",
          body: [
            "Email us with your order number and the item you want to return. We will send a prepaid return label and instructions within one business day.",
            "Pack the item securely and drop it at any carrier location. Keep the receipt until your refund is confirmed.",
          ],
        },
        {
          heading: "Refund timing",
          body: [
            "Refunds are issued to the original payment method within 3 to 5 business days of the returned item arriving at our warehouse and passing inspection.",
            "Original shipping charges are refunded only when the return is due to a fault on our side — a wrong item, a damaged item, or a product that does not match its description.",
          ],
        },
        {
          heading: "Exchanges",
          body: [
            "We do not process direct exchanges. Return the original item for a refund and place a new order for the replacement — this is faster and guarantees the item is still in stock.",
          ],
        },
      ]}
    />
  );
}