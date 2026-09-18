"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { cn } from "@/lib/cn";


export function HeaderSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    router.push(
      query === ""
        ? "/products"
        : `/products?search=${encodeURIComponent(query)}`,
    );
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn("relative w-full", className)}
    >
      <Search
        className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        aria-label="Search products"
        placeholder="Search products…"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-10 w-full rounded-full border border-line-strong bg-paper-raised pr-10 pl-10 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
      {value !== "" && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </form>
  );
}