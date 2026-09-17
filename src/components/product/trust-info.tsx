import { Phone, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const ITEMS = [
  {
    Icon: Truck,
    title: "Free shipping over $50",
    detail: "Standard delivery is flat $4.95 below that threshold.",
  },
  {
    Icon: RotateCcw,
    title: "30-day returns",
    detail: "Unused and in original packaging, prepaid label included.",
  },
  {
    Icon: ShieldCheck,
    title: "Secure checkout",
    detail: "Card, mobile banking or cash on delivery where available.",
  },
  {
    Icon: Phone,
    title: "Real support",
    detail: "A person replies, usually within one business day.",
  },
] as const;

export function TrustInfo() {
  return (
    <ul className="grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
      {ITEMS.map(({ Icon, title, detail }) => (
        <li key={title} className="flex gap-3">
          <Icon
            className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-medium text-ink">{title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
              {detail}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
