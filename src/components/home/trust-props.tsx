import { RotateCcw, ShieldCheck, Truck, Headphones } from "lucide-react";

const PROPS = [
  {
    Icon: Truck,
    title: "Free shipping over $50",
    description: "Flat $4.95 below that. Dispatched same business day.",
  },
  {
    Icon: RotateCcw,
    title: "30-day returns",
    description: "Unused, in original packaging. Prepaid return label.",
  },
  {
    Icon: ShieldCheck,
    title: "Secure checkout",
    description: "Card, PayPal or cash on delivery where supported.",
  },
  {
    Icon: Headphones,
    title: "Real support",
    description: "A person answers. Usually within one business day.",
  },
] as const;

export function TrustProps() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="sr-only">Why shop with XM Store</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROPS.map(({ Icon, title, description }) => (
            <li key={title} className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft shadow-sm">
                <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}