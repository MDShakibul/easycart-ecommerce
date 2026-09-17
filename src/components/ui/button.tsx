import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-brand-ink shadow-sm shadow-indigo-600/25 hover:bg-brand-hover hover:shadow-md hover:shadow-indigo-600/30 active:bg-brand-hover",
  secondary: "bg-brand-soft text-brand hover:bg-indigo-100",
  outline:
    "border border-line-strong bg-white text-ink hover:border-brand hover:bg-brand-soft hover:text-brand",
  ghost: "text-ink-soft hover:bg-brand-soft hover:text-brand",
  danger: "bg-error text-white shadow-sm shadow-red-500/25 hover:brightness-95",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(base, variantStyles[variant], sizeStyles[size], className);
}

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles(variant, size, className)}
      {...props}
    />
  );
}