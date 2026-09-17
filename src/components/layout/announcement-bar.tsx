import { Truck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-brand-hover via-brand to-indigo-500">
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        <Truck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Free shipping on orders over $50 — plus extra 10% off this week
      </p>
    </div>
  );
}