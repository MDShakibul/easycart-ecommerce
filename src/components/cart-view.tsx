"use client";

import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { EmptyState } from "@/components/ui/empty-state";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast";
import { selectCartIsHydrated } from "@/features/cart/cartSelectors";
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
  setQuantity,
} from "@/features/cart/cartSlice";
import { getProductVariantLabel } from "@/lib/product-family";
import { formatPrice } from "@/lib/format";
import {
  FREE_SHIPPING_THRESHOLD,
  getAmountToFreeShipping,
  getShippingCost,
} from "@/lib/shipping";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const CLEAR_CONFIRM_RESET_MS = 4000;

/**
 * Skeleton shown for the brief moment before the persisted cart is
 * rehydrated, so an empty cart never flashes before a saved one appears.
 */
function CartViewSkeleton() {
  return (
    <div aria-hidden="true">
      <Skeleton className="h-10 w-52" />
      <Skeleton className="mt-3 h-4 w-40" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(20rem,1fr)]">
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}

/**
 * Full cart page.
 *
 * Everything comes from the Redux cart selectors — the same store the header
 * count, cart drawer and checkout read. No local cart state, no duplicated
 * totals, no server data copied into Redux.
 */
export function CartView() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemCount);
  const subtotal = useAppSelector(selectCartTotal);
  const isHydrated = useAppSelector(selectCartIsHydrated);
  const shouldReduceMotion = useReducedMotion();

  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const clearTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }
    };
  }, []);

  // CartPersistence hydrates Redux from localStorage in a mount effect, so
  // the skeleton shows only until the real cart (or a genuine empty one) is
  // in the store — an empty cart never flashes before a saved one appears.
  if (!isHydrated) {
    return <CartViewSkeleton />;
  }

  if (items.length === 0) {
    return (
      <div className="mt-6">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          action={
            <Link
              href="/products"
              className="flex h-11 items-center rounded-full bg-brand px-6 text-sm font-medium text-brand-ink transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Start shopping
            </Link>
          }
        />
      </div>
    );
  }

  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;
  const amountToFreeShipping = getAmountToFreeShipping(subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  const handleClearCart = () => {
    if (!isConfirmingClear) {
      setIsConfirmingClear(true);
      clearTimerRef.current = window.setTimeout(() => {
        clearTimerRef.current = null;
        setIsConfirmingClear(false);
      }, CLEAR_CONFIRM_RESET_MS);
      return;
    }

    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
    setIsConfirmingClear(false);
    dispatch(clearCart());
    toast("Cart cleared");
  };

  return (
    <>
      <header className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Shopping Cart
        </h1>
        <p className="mt-2 text-sm text-ink-soft" aria-live="polite">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(20rem,1fr)] lg:items-start">
        <ul className="space-y-4">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const variantLabel = getProductVariantLabel(item);
              const atMaxQuantity = item.quantity >= item.stock;

              return (
                <m.li
                  key={item.productId}
                  layout={!shouldReduceMotion}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 0, x: -24, height: 0 }
                  }
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex gap-4 rounded-2xl border border-line bg-paper-raised p-4 sm:gap-5 sm:p-5"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-line bg-surface sm:h-28 sm:w-28"
                    aria-label={`View ${item.title}`}
                  >
                    {item.image !== "" ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 639px) 96px, 112px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center">
                        <ShoppingBag
                          className="h-6 w-6 text-ink-muted"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/products/${item.slug}`}
                          className="line-clamp-2 text-sm font-semibold text-ink transition-colors hover:text-ink-soft sm:text-base"
                        >
                          {item.title}
                        </Link>
                        {variantLabel && (
                          <p className="mt-1 text-xs text-ink-muted">
                            {variantLabel}
                          </p>
                        )}
                      </div>
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

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pt-4">
                      <div className="flex flex-col gap-1">
                        <QuantityStepper
                          value={item.quantity}
                          max={item.stock}
                          onDecrement={() =>
                            dispatch(decreaseQuantity(item.productId))
                          }
                          onIncrement={() =>
                            dispatch(increaseQuantity(item.productId))
                          }
                          onCommit={(quantity) =>
                            dispatch(
                              setQuantity({
                                productId: item.productId,
                                quantity,
                              }),
                            )
                          }
                          itemLabel={item.title}
                          size="md"
                        />
                        <span className="pl-1 text-[11px] text-ink-muted">
                          {atMaxQuantity
                            ? "Max available"
                            : `${item.stock} available`}
                        </span>
                      </div>

                      <p className="text-base font-bold text-ink sm:text-lg">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </m.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <aside className="h-fit rounded-2xl border border-line bg-paper-raised p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold text-ink">Order summary</h2>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">
                Subtotal ({itemCount} {itemCount === 1 ? "unit" : "units"})
              </dt>
              <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Shipping</dt>
              <dd className="font-medium text-ink">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3.5 text-base">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-bold text-ink">{formatPrice(total)}</dd>
            </div>
          </dl>

          <div className="mt-5 rounded-xl bg-surface p-3.5">
            <p className="text-xs font-medium text-ink">
              {amountToFreeShipping > 0
                ? `Add ${formatPrice(amountToFreeShipping)} more to unlock free shipping`
                : "You've unlocked free shipping"}
            </p>
            <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-paper-raised">
              <span
                className="block h-full rounded-full bg-success transition-[width] duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-brand text-sm font-medium text-brand-ink shadow-sm shadow-indigo-600/25 transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper-raised"
          >
            Proceed to checkout
          </Link>

          <button
            type="button"
            onClick={handleClearCart}
            className={
              isConfirmingClear
                ? "mt-3 flex h-11 w-full items-center justify-center rounded-full border border-error/60 text-sm font-medium text-error transition-colors hover:bg-error hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 focus-visible:ring-offset-paper-raised"
                : "mt-3 flex h-11 w-full items-center justify-center rounded-full border border-line-strong text-sm font-medium text-ink-soft transition-colors hover:border-error hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper-raised"
            }
          >
            {isConfirmingClear ? "Click again to confirm" : "Clear cart"}
          </button>
        </aside>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Continue shopping
        </Link>
      </div>
    </>
  );
}
