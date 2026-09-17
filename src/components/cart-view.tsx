"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
} from "@/features/cart/cartSelectors";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const STEP =
  "flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink";

/**
 * Full cart page. Everything comes from Redux selectors — no local cart
 * state, no server data copied into Redux.
 */
export function CartView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemCount);
  const total = useAppSelector(selectCartTotal);
  const shouldReduceMotion = useReducedMotion();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Browse the catalogue and add something you like."
        action={
          <Link
            href="/products"
            className="flex h-11 items-center rounded-full bg-brand px-6 text-sm font-medium text-brand-ink transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Start shopping
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <ul className="divide-y divide-line rounded-xl border border-line bg-paper-raised">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <m.li
              key={item.productId}
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex gap-4 overflow-hidden p-4 sm:p-5"
            >
              <Link
                href={`/products/${item.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-line bg-surface"
              >
                {item.image !== "" && (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                )}
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <Link
                    href={`/products/${item.slug}`}
                    className="line-clamp-2 font-semibold text-ink transition-colors hover:text-ink-soft"
                  >
                    {item.title}
                  </Link>
                  <button
                    type="button"
                    onClick={() => dispatch(removeItem(item.productId))}
                    aria-label={`Remove ${item.title} from cart`}
                    className="shrink-0 rounded-full p-2 text-ink-muted transition-colors hover:bg-surface hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <p className="mt-1 text-sm text-ink-soft">
                  {formatPrice(item.price)} each
                </p>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-line-strong">
                    <button
                      type="button"
                      onClick={() => dispatch(decreaseQuantity(item.productId))}
                      aria-label={`Decrease quantity of ${item.title}`}
                      className={`${STEP} rounded-l-full`}
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span
                      className="w-9 text-center text-sm font-medium text-ink"
                      aria-live="polite"
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => dispatch(increaseQuantity(item.productId))}
                      aria-label={`Increase quantity of ${item.title}`}
                      className={`${STEP} rounded-r-full`}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="font-bold text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>

      <aside className="h-fit rounded-xl border border-line bg-paper-raised p-6 lg:sticky lg:top-24">
        <h2 className="text-lg font-semibold text-ink">Order summary</h2>

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-soft">
              Items ({itemCount} {itemCount === 1 ? "unit" : "units"})
            </dt>
            <dd className="font-medium text-ink">{formatPrice(total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Shipping</dt>
            <dd className="text-ink-soft">
              {total >= 50 ? "Free" : formatPrice(4.95)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base">
            <dt className="font-semibold text-ink">Total</dt>
            <dd className="font-bold text-ink">
              {formatPrice(total >= 50 ? total : total + 4.95)}
            </dd>
          </div>
        </dl>

        <Link
          href="/checkout"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-brand text-sm font-medium text-brand-ink transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper-raised"
        >
          Proceed to checkout
        </Link>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => dispatch(clearCart())}
          className="mt-3 w-full"
        >
          Clear cart
        </Button>
      </aside>
    </div>
  );
}