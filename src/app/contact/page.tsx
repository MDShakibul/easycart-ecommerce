import type { Metadata } from "next";

import { InfoPage } from "@/components/layout/info-page";
import { CONTACT_EMAIL, CONTACT_HOURS, CONTACT_PHONE } from "@/lib/footer";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Easy Cart team about orders, shipping, returns or partnerships.",
};

export default function ContactPage() {
  return (
    <InfoPage
      title="Contact Us"
      description="We answer every message, usually within one business day."
      updated="September 16, 2026"
      sections={[
        {
          heading: "Email",
          body: [
            `The fastest way to reach us is ${CONTACT_EMAIL}. Include your order number if your question relates to a purchase — it helps us resolve things in a single reply.`,
          ],
        },
        {
          heading: "Phone",
          body: [
            `Call ${CONTACT_PHONE} during ${CONTACT_HOURS.toLowerCase()}. Outside those hours, leave a voicemail with your order number and we will call back the next business day.`,
          ],
        },
        {
          heading: "Order enquiries",
          body: [
            "For a change of address, cancellation or delivery issue, contact us as early as possible. Orders that have already been dispatched usually need to go through the returns process instead.",
            "If a parcel arrives damaged, keep the packaging and send photographs with your message. It speeds up the replacement considerably.",
          ],
        },
        {
          heading: "Wholesale and partnerships",
          body: [
            "We work with a small number of brands and suppliers. If you manufacture something that would fit our catalogue, send a short introduction with a product sheet and indicative pricing.",
          ],
        },
      ]}
    />
  );
}