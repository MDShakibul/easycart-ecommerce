import Link from "next/link";

import { DESKTOP_NAV } from "@/lib/navigation";

export function DesktopNav() {
  return (
    <nav aria-label="Product categories" className="hidden lg:block">
      <ul className="flex items-center gap-1 overflow-x-auto">
        {DESKTOP_NAV.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex h-11 items-center rounded-full px-3.5 text-sm font-medium whitespace-nowrap text-ink-soft transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}