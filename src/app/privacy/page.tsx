import type { Metadata } from "next";

import { InfoPage } from "@/components/layout/info-page";
import { CONTACT_EMAIL } from "@/lib/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data Easy Cart collects, how it is used, and the choices available to you.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      description="What we collect, why we collect it, and how you can control it."
      updated="September 16, 2026"
      sections={[
        {
          heading: "Information we collect",
          body: [
            "When you place an order we collect the details needed to fulfil it: your name, email address, phone number, shipping address and payment confirmation. We do not store full card numbers — payment is handled by our payment processor.",
            "We also collect basic technical information when you browse, such as pages viewed and approximate region, to understand which parts of the store are working.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "Order information is used to process payment, ship your parcel, provide support and meet our accounting obligations. Browsing information is used in aggregate to improve the store.",
            "We do not sell your personal information. We do not use your order history to build advertising profiles.",
          ],
        },
        {
          id: "cookies",
          heading: "Cookies",
          body: [
            "We use strictly necessary cookies to keep your cart and session working. These cannot be turned off without breaking the store.",
            "Analytics cookies are optional and only set if you accept them. You can withdraw consent at any time by clearing cookies for this site in your browser settings.",
          ],
        },
        {
          heading: "Sharing with third parties",
          body: [
            "We share the minimum necessary information with carriers to deliver your order, and with our payment processor to take payment. These providers are contractually restricted from using your data for their own purposes.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can request a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it. Some records must be retained for tax and accounting reasons even after a deletion request.",
          ],
        },
        {
          heading: "Contact",
          body: [
            `Questions about this policy can be sent to ${CONTACT_EMAIL}. We aim to respond within one business day.`,
          ],
        },
      ]}
    />
  );
}