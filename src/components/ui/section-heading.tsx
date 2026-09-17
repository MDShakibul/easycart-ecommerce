import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  title: string;
  description?: string;
  action?: ReactNode;
  as?: "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  title,
  description,
  action,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-wrap items-end justify-between gap-4",
        className,
      )}
    >
      <div>
        <Tag className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </Tag>
        {description && (
          <p className="mt-1.5 text-sm text-ink-soft">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}