import { Truck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="border-b border-line bg-surface">
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium text-ink-soft sm:text-sm">
        <Truck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Free shipping on orders over $50
      </p>
    </div>
  );
}