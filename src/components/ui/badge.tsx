import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/cn";

export type BadgeVariant =
  | "neutral"
  | "sale"
  | "success"
  | "warning"
  | "error";

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-ink text-paper",
  sale: "bg-sale text-white",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
  error: "bg-error text-white",
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