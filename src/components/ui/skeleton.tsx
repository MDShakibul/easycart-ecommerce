import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/cn";

export type SkeletonProps = ComponentPropsWithRef<"div">;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-surface", className)}
      aria-hidden="true"
      {...props}
    />
  );
}