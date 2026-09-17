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
        <Tag className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          <span
            aria-hidden="true"
            className="h-7 w-1.5 rounded-full bg-gradient-to-b from-brand to-indigo-400"
          />
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