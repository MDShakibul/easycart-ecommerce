import type { Metadata } from "next";

import { CheckoutForm } from "@/components/checkout-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order with secure payment and fast delivery.",
};

export default function CheckoutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <header className="mt-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Enter your details and we&apos;ll take it from there.
        </p>
      </header>

      <CheckoutForm />
    </main>
  );
}