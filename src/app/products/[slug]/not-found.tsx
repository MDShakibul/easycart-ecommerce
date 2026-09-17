import Link from "next/link";
import { PackageSearch } from "lucide-react";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function ProductNotFound() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Not found" },
        ]}
      />

      <div className="mt-16 flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface">
          <PackageSearch className="h-6 w-6 text-ink-muted" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Product not found
        </h1>
        <p className="mt-3 max-w-md text-sm text-ink-soft">
          This product doesn&apos;t exist, or it may have been removed from the
          catalogue.
        </p>
        <Link
          href="/products"
          className="mt-8 flex h-11 items-center rounded-full bg-brand px-6 text-sm font-medium text-brand-ink shadow-sm shadow-indigo-600/25 transition-all hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Browse all products
        </Link>
      </div>
    </main>
  );
}