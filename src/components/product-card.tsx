"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { m, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { selectCartItem } from "@/features/cart/cartSelectors";
import { addItem } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Product } from "@/types/product";

const LOW_STOCK_THRESHOLD = 5;

type StockState = "out" | "low" | "ok";

function stockState(stock: number): StockState {
  if (stock <= 0) return "out";
  if (stock <= LOW_STOCK_THRESHOLD) return "low";
  return "ok";
}

const CARD_BUTTON =
  "flex h-9 w-full items-center justify-center gap-1.5 rounded-full text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:h-10 sm:text-sm";

/**
 * Product card.
 *
 * TanStack Query owns product data; Redux owns cart state. The add-to-cart
 * button is a sibling of the image link, not a descendant, so there is no
 * nested-interactive markup and no preventDefault needed.
 *
 * Stock is carried by a badge and by the button's disabled state, so the
 * state never depends on colour alone. The design tokens (border-line,
 * bg-paper-raised, text-ink) come from the Phase 1 theme layer.
 */
export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItem(product.id));
  const { toast } = useToast();
  const [added, setAdded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const state = stockState(product.stock);
  const inStock = state !== "out";
  const image = product.images[0];

  function handleAddToCart() {
    if (!inStock || added) return;
    dispatch(
      addItem({
        productId: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: image ?? "",
        quantity: 1,
      }),
    );
    setAdded(true);
    toast("Added to cart");
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <m.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-paper-raised transition-colors hover:border-line-strong focus-within:border-line-strong"
      suppressHydrationWarning
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.title}
        className="relative block aspect-square w-full overflow-hidden bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-inset"
      >
        {image !== undefined && image !== "" ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-ink-muted">
            No image
          </span>
        )}

        {state !== "ok" && (
          <span className="absolute top-3 left-3">
            <Badge variant={state === "out" ? "error" : "warning"}>
              {state === "out" ? "Out of stock" : `Only ${product.stock} left`}
            </Badge>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <p className="truncate text-[11px] font-medium tracking-wide text-ink-muted uppercase">
          {product.brand}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 text-sm font-semibold text-ink transition-colors hover:text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink sm:text-[15px]"
        >
          {product.title}
        </Link>

        <p
          className="flex items-center gap-1 text-xs text-ink-soft"
          aria-label={`Rated ${product.rating} out of 5 from ${product.reviewCount} reviews`}
        >
          <Star
            className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            aria-hidden="true"
          />
          <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
          <span className="text-ink-muted">({product.reviewCount})</span>
        </p>

        <div className="mt-auto flex items-baseline justify-between gap-2 pt-1">
          <p className="text-base font-bold text-ink sm:text-lg">
            {formatPrice(product.price)}
          </p>
          {cartItem !== undefined && (
            <span className="text-[11px] text-ink-muted">
              {cartItem.quantity} in cart
            </span>
          )}
        </div>

        <m.button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock || added}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          suppressHydrationWarning
          aria-label={
            inStock
              ? `Add ${product.title} to cart`
              : `${product.title} is out of stock`
          }
          className={`${CARD_BUTTON} ${
            added
              ? "bg-success text-white"
              : inStock
                ? "bg-brand text-brand-ink hover:bg-brand/90"
                : "cursor-not-allowed bg-surface text-ink-muted"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Added
            </>
          ) : inStock ? (
            <>
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Add to cart
            </>
          ) : (
            "Out of stock"
          )}
        </m.button>
      </div>
    </m.article>
  );
}