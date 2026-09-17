"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Search, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { m, useReducedMotion } from "motion/react";

import { useToast } from "@/components/ui/toast";
import { addItem } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/format";
import { useAppDispatch } from "@/store/hooks";
import type { Product } from "@/types/product";

const LOW_STOCK_THRESHOLD = 5;

type StockState = "out" | "low" | "ok";

function stockState(stock: number): StockState {
  if (stock <= 0) return "out";
  if (stock <= LOW_STOCK_THRESHOLD) return "low";
  return "ok";
}

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [added, setAdded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const fallbackPlaceholder = "https://placehold.co/600x600?text=Product";
  const initialImage =
    product.images?.[0] && product.images[0].trim() !== ""
      ? product.images[0]
      : fallbackPlaceholder;

  const [imgSrc, setImgSrc] = useState(initialImage);

  const state = stockState(product.stock);
  const inStock = state !== "out";

  function handleAddToCart() {
    if (!inStock || added) return;
    dispatch(
      addItem({
        productId: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: imgSrc,
        stock: product.stock,
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
      className="group flex flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
      suppressHydrationWarning
    >
      {/* Top Image Container with Small Padding */}
      <div className="relative aspect-square w-full overflow-hidden bg-white p-2">
        {/* Zoom / Quick View Icon (bottom-left) */}
        <div className="absolute bottom-2 left-2 z-10">
          <Link
            href={`/products/${product.slug}`}
            aria-label={`View ${product.title}`}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white/95 text-gray-500 shadow-sm transition hover:border-gray-400 hover:text-gray-900 hover:scale-105"
          >
            <Search className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>

        <Link
          href={`/products/${product.slug}`}
          aria-label={product.title}
          className="relative flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
        >
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            sizes="(max-width: 1023px) 50vw, 33vw"
            className="object-contain p-1 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            onError={() => setImgSrc(fallbackPlaceholder)}
          />
        </Link>
      </div>

      {/* Details & Action Section with Small Padding */}
      <div className="flex flex-1 flex-col px-2.5 pt-1 pb-2">
        {/* Brand (11px, Left) & In Stock status (11px, Right) */}
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="inline-block border-b border-dotted border-gray-400 pb-0.5 text-[11px] leading-tight text-gray-500 transition-colors hover:text-gray-800">
            {product.brand}
          </span>
          <span
            className={`text-[11px] leading-tight ${
              state === "out"
                ? "font-medium text-rose-600"
                : state === "low"
                  ? "font-medium text-amber-600"
                  : "text-gray-400"
            }`}
          >
            {state === "out"
              ? "Stock out"
              : state === "low"
                ? `Only ${product.stock} left`
                : "In Stock"}
          </span>
        </div>

        {/* Product Title (14px) */}
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-1 text-[14px] font-semibold leading-snug text-gray-800 transition-colors hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {product.title}
        </Link>

        {/* Price */}
        <p className="mt-0.5 text-[14px] font-bold text-gray-900 sm:text-[15px]">
          {formatPrice(product.price)}
        </p>

        {/* Divider Line */}
        <hr className="my-1.5 border-gray-100" />

        {/* Bottom Row: Add to Cart (Left) + Rating Section (Right) */}
        <div className="mt-auto flex items-center justify-between gap-1 pt-0.5">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock || added}
            className="group/btn inline-flex items-center gap-1 text-[11px] font-medium text-gray-600 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-400 sm:text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
            aria-label={
              inStock
                ? `Add ${product.title} to cart`
                : `${product.title} is out of stock`
            }
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                <span className="font-semibold text-emerald-600">Added</span>
              </>
            ) : inStock ? (
              <>
                <ShoppingCart
                  className="h-3.5 w-3.5 transition-transform group-hover/btn:scale-110"
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap">Add to Cart</span>
              </>
            ) : (
              <span>Stock out</span>
            )}
          </button>

          {/* Rating Section (11px) */}
          <div
            className="flex items-center gap-0.5 text-[11px] text-gray-500 shrink-0"
            aria-label={`Rated ${product.rating} out of 5 from ${product.reviewCount} reviews`}
          >
            <Star
              className="h-3 w-3 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            <span className="font-semibold text-gray-800">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-gray-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </m.article>
  );
}