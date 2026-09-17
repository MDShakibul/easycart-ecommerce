import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/cn";

export type InputProps = ComponentPropsWithRef<"input">;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg border border-line-strong bg-paper-raised px-3.5 text-sm text-ink",
        "placeholder:text-ink-muted",
        "transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-error aria-[invalid=true]:focus:ring-error/20",
        className,
      )}
      {...props}
    />
  );
}