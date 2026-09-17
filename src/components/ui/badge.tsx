import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/cn";

export type BadgeVariant =
  | "neutral"
  | "sale"
  | "success"
  | "warning"
  | "error";

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-ink text-white",
  sale: "bg-sale text-white shadow-sm shadow-red-500/30",
  success: "bg-success text-white shadow-sm shadow-green-600/25",
  warning: "bg-warning text-white shadow-sm shadow-amber-500/30",
  error: "bg-error text-white shadow-sm shadow-red-500/30",
};

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}