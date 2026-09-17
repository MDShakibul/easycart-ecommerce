import type { Metadata } from "next";

import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the items in your shopping cart.",
};

export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Your Cart</h1>
      <CartView />
    </main>
  );
}