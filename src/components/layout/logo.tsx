import Link from "next/link";
import { Zap } from "lucide-react";

import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="XM Store, home"
      className={cn(
        "flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        className,
      )}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-hover text-brand-ink shadow-sm shadow-indigo-600/30"
        aria-hidden="true"
      >
        <Zap className="h-4 w-4" />
      </span>
      <span className="hidden sm:inline">XM Store</span>
    </Link>
  );
}