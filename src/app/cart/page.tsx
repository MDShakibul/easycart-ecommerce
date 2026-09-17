import type { Metadata } from "next";

import { CartView } from "@/components/cart-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review the items in your shopping cart before checkout.",
};

export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Cart" }]}
      />

      <CartView />
    </main>
  );
}
