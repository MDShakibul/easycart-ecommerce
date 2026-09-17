"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { cn } from "@/lib/cn";

export interface ImageGalleryProps {
  images: string[];
  title: string;
}


export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  if (images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-2xl border border-line bg-surface" />
    );
  }

  const current = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  function goTo(next: number) {
    setIndex(Math.max(0, Math.min(images.length - 1, next)));
  }

  const arrow =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper-raised text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {images.length > 1 && (
        <ul className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:w-20 lg:flex-col lg:overflow-visible lg:pb-0">
          {images.map((image, i) => (
            <li key={i} className="shrink-0">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`View image ${i + 1} of ${images.length}`}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "relative block h-16 w-16 overflow-hidden rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink sm:h-20 sm:w-20",
                  i === index
                    ? "border-ink"
                    : "border-line hover:border-line-strong",
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative order-1 aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface lg:order-2 lg:flex-1">
        <AnimatePresence initial={false}>
          <m.div
            key={index}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current}
              alt={`${title} — image ${index + 1} of ${images.length}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </m.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={!hasPrev}
              aria-label="Previous image"
              className={cn(arrow, "left-3")}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={!hasNext}
              aria-label="Next image"
              className={cn(arrow, "right-3")}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <span
              className="absolute right-3 bottom-3 z-10 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-medium text-paper"
              aria-hidden="true"
            >
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>
    </div>
  );
}