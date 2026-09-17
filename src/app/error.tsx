"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-sm text-ink-soft">
        We couldn&apos;t load this page. It may be a temporary problem.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button type="button" size="lg" onClick={reset}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
        <Link
          href="/products"
          className="flex h-12 items-center justify-center rounded-full border border-line-strong px-7 text-base font-medium text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          Browse products
        </Link>
      </div>
    </main>
  );
}