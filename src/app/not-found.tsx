import Link from "next/link";
import { PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface">
        <PackageSearch className="h-7 w-7 text-ink-muted" aria-hidden="true" />
      </span>

      <p className="mt-6 text-xs font-semibold tracking-wide text-ink-muted uppercase">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist, or it may have been
        moved.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/products"
          className="flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-medium text-brand-ink transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Browse products
        </Link>
        <Link
          href="/"
          className="flex h-11 items-center justify-center rounded-full border border-line-strong px-6 text-sm font-medium text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}