import type { Metadata } from "next";

import { InfoPage } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about ordering, shipping, returns and payment at XM Store.",
};

export default function FaqPage() {
  return (
    <InfoPage
      title="Frequently Asked Questions"
      description="Short answers to the questions we get most often."
      updated="September 16, 2026"
      sections={[
        {
          heading: "Can I change or cancel an order?",
          body: [
            "Yes, if it has not been dispatched. Contact us as soon as possible with your order number. Once a parcel is with the carrier, it can no longer be changed — you would need to use the returns process instead.",
          ],
        },
        {
          heading: "How do I know if something is in stock?",
          body: [
            "Every product page shows live stock. Items with low stock display the remaining quantity, and out-of-stock items have their add-to-cart action disabled rather than accepting an order we cannot fulfil.",
          ],
        },
        {
          heading: "Which payment methods do you accept?",
          body: [
            "Credit and debit cards, PayPal, and cash on delivery where the carrier supports it. The available options are shown at checkout once you enter your address.",
          ],
        },
        {
          heading: "Do you price match?",
          body: [
            "We do not run a formal price-match programme. Our prices are set to be competitive without inflating a list price to manufacture a discount.",
          ],
        },
        {
          heading: "My discount code is not working",
          body: [
            "Check the expiry date and any minimum-spend requirement. Codes cannot be combined with each other, and only one code applies per order. If it still fails, send us the code and we will look into it.",
          ],
        },
        {
          heading: "How do I track my order?",
          body: [
            "Your dispatch email contains a tracking number and a link to the carrier's tracking page. See the Shipping & Delivery page for more detail.",
          ],
        },
      ]}
    />
  );
}