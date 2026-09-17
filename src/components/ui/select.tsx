import type { ComponentPropsWithRef } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/cn";

export type SelectProps = ComponentPropsWithRef<"select">;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-lg border border-line-strong bg-paper-raised pl-3.5 pr-10 text-sm text-ink shadow-sm",
          "transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-error aria-[invalid=true]:focus:ring-error/20",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
        aria-hidden="true"
      />
    </div>
  );
}