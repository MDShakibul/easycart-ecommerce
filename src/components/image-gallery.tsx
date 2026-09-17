"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { cn } from "@/lib/cn";

const FALLBACK_IMAGE = "https://placehold.co/900x900?text=Product+image";

export interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const shouldReduceMotion = useReducedMotion();

  if (images.length === 0) {
    return (
      <div
        className="flex aspect-square w-full items-center justify-center rounded-2xl border border-line bg-surface text-sm text-ink-muted"
        role="img"
        aria-label={`${title} image unavailable`}
      >
        Image unavailable
      </div>
    );
  }

  const currentIndex = Math.min(index, images.length - 1);
  const currentImage = failedImages[currentIndex]
    ? FALLBACK_IMAGE
    : images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  function goTo(next: number) {
    setIndex(Math.max(0, Math.min(images.length - 1, next)));
  }

  function markImageFailed(imageIndex: number) {
    setFailedImages((current) => ({ ...current, [imageIndex]: true }));
  }

  const arrow =
    "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper-raised/95 text-ink shadow-sm transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <ul className="order-2 flex max-w-full gap-2 overflow-x-auto pb-1 sm:order-1 sm:max-h-[36rem] sm:w-16 sm:flex-col sm:overflow-y-auto sm:overflow-x-hidden sm:pb-0">
        {images.map((image, imageIndex) => (
          <li key={`${image}-${imageIndex}`} className="shrink-0">
            <button
              type="button"
              onClick={() => goTo(imageIndex)}
              aria-label={`View image ${imageIndex + 1} of ${images.length}`}
              aria-current={imageIndex === currentIndex ? "true" : undefined}
              className={cn(
                "relative block h-14 w-14 overflow-hidden rounded-xl border bg-paper-raised transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                imageIndex === currentIndex
                  ? "border-ink ring-1 ring-ink"
                  : "border-line hover:border-line-strong",
              )}
            >
              <Image
                src={failedImages[imageIndex] ? FALLBACK_IMAGE : image}
                alt=""
                fill
                sizes="56px"
                className="object-contain p-1"
                onError={() => markImageFailed(imageIndex)}
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="relative order-1 aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface sm:order-2 sm:flex-1">
        <AnimatePresence initial={false}>
          <m.div
            key={currentIndex}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage}
              alt={`${title} image ${currentIndex + 1} of ${images.length}`}
              fill
              priority={currentIndex === 0}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 80vw, 55vw"
              className="object-contain p-5 sm:p-8"
              onError={() => markImageFailed(currentIndex)}
            />
          </m.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(currentIndex - 1)}
              disabled={!hasPrev}
              aria-label="Previous product image"
              className={cn(arrow, "left-3")}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(currentIndex + 1)}
              disabled={!hasNext}
              aria-label="Next product image"
              className={cn(arrow, "right-3")}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <span
              className="absolute right-4 bottom-4 rounded-full bg-ink/75 px-2.5 py-1 text-xs font-medium text-white"
              aria-hidden="true"
            >
              {currentIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
