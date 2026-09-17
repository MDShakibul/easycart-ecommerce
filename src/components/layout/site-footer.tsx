import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import {
  COMPANY_LINKS,
  CONTACT_EMAIL,
  CONTACT_HOURS,
  CONTACT_PHONE,
  LEGAL_LINKS,
  SUPPORT_LINKS,
  type FooterLink,
} from "@/lib/footer";
import { CATEGORY_NAV } from "@/lib/navigation";

/**
 * Social links are text pills. This icon set no longer ships brand glyphs,
 * and a generic globe next to "Instagram" would read worse than the word.
 */
const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
] as const;

const columnHeading =
  "text-xs font-semibold tracking-wide text-ink uppercase";

const columnLink =
  "text-sm text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded";

function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h2 className={columnHeading}>{heading}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={columnLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 border-b border-line py-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Stay in the loop
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              New arrivals, restocks and occasional offers. No spam.
            </p>
          </div>
          <div className="md:justify-self-end">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-ink-soft">
              Everyday essentials across electronics, fashion, home, beauty and
              more — curated, priced fairly, and shipped fast.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
            <p className="mt-2 text-xs text-ink-muted">{CONTACT_HOURS}</p>

            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 items-center rounded-full border border-line-strong px-3.5 text-xs font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <LinkColumn
            heading="Shop"
            links={[{ label: "All Products", href: "/products" }, ...CATEGORY_NAV]}
          />
          <LinkColumn heading="Customer Service" links={SUPPORT_LINKS} />
          <LinkColumn heading="Company" links={COMPANY_LINKS} />
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">
            © {year} XM Store. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-ink-muted transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}