"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { useCartDrawer } from "@/features/cart/cart-drawer-context";
import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
} from "@/features/cart/cartSelectors";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  setQuantity,
} from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

/**
 * Cart drawer (Phase 9).
 *
 * Reads the cart from Redux selectors and nothing else — no duplicated local
 * state, no product-API data. Open/close lives in CartDrawerContext, which is
 * local UI state.
 *
 * Escape-to-close and the body scroll lock are the two legitimate `useEffect`
 * cases here: both are browser APIs with no declarative equivalent.
 */
export function CartDrawer() {
  const { isOpen, close } = useCartDrawer();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemCount);
  const total = useAppSelector(selectCartTotal);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            key="cart-backdrop"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          <m.aside
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={shouldReduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={shouldReduceMotion ? undefined : { x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-line bg-paper shadow-2xl"
          >
            <header className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <h2 className="text-base font-semibold text-ink">
                Your cart
                {itemCount > 0 && (
                  <span className="ml-2 text-sm font-normal text-ink-muted">
                    ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close cart"
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface">
                  <ShoppingBag
                    className="h-6 w-6 text-ink-muted"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className="font-semibold text-ink">Your cart is empty</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Add a product and it will show up here.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={close}
                  className="mt-2"
                >
                  Continue shopping
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <m.li
                        key={item.productId}
                        layout={!shouldReduceMotion}
                        initial={
                          shouldReduceMotion ? false : { opacity: 0, height: 0 }
                        }
                        animate={{ opacity: 1, height: "auto" }}
                        exit={
                          shouldReduceMotion ? undefined : { opacity: 0, x: -16 }
                        }
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="flex gap-4 overflow-hidden py-4"
                      >
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={close}
                          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-surface"
                        >
                          {item.image !== "" && (
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          )}
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <Link
                              href={`/products/${item.slug}`}
                              onClick={close}
                              className="line-clamp-2 text-sm font-medium text-ink transition-colors hover:text-ink-soft"
                            >
                              {item.title}
                            </Link>
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(removeItem(item.productId))
                              }
                              aria-label={`Remove ${item.title} from cart`}
                              className="shrink-0 rounded-full p-1.5 text-ink-muted transition-colors hover:bg-surface hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>

                          <p className="mt-0.5 text-xs text-ink-muted">
                            {formatPrice(item.price)} each
                          </p>

                          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                            <div className="flex flex-col gap-0.5">
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
                                size="sm"
                              />
                              <span className="pl-1 text-[11px] text-ink-muted">
                                {item.quantity >= item.stock
                                  ? "Max available"
                                  : `${item.stock} available`}
                              </span>
                            </div>
                            <p className="text-sm font-bold text-ink">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </m.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="shrink-0 border-t border-line p-5">
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-ink-soft">Subtotal</dt>
                      <dd className="font-bold text-ink">
                        {formatPrice(total)}
                      </dd>
                    </div>
                    <p className="text-xs text-ink-muted">
                      Shipping and taxes calculated at checkout.
                    </p>
                  </dl>

                  <div className="mt-4 grid gap-2">
                    <Link
                      href="/checkout"
                      onClick={close}
                      className="flex h-11 items-center justify-center rounded-full bg-brand text-sm font-medium text-brand-ink transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                      Checkout
                    </Link>
                    <Link
                      href="/cart"
                      onClick={close}
                      className="flex h-11 items-center justify-center rounded-full border border-line-strong text-sm font-medium text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    >
                      View cart
                    </Link>
                  </div>
                </footer>
              </>
            )}
          </m.aside>
        </>
      )}
    </AnimatePresence>
  );
}