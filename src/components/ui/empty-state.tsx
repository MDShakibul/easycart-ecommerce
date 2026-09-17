import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-xl border border-dashed border-line-strong px-6 py-16 text-center",
        className,
      )}
    >
      {Icon && (
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface">
          <Icon className="h-6 w-6 text-ink-muted" aria-hidden="true" />
        </span>
      )}
      <div>
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        {description && (
          <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-soft">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}