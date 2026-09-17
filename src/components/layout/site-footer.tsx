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
  "text-xs font-semibold tracking-wide text-white uppercase";

const columnLink =
  "text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded";

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
    <footer className="bg-footer text-footer-ink">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 border-b border-white/10 py-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-white">
              Stay in the loop
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              New arrivals, restocks and occasional offers. No spam.
            </p>
          </div>
          <div className="md:justify-self-end">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo className="text-white [&_span:last-child]:text-white" />
            <p className="mt-4 max-w-sm text-sm text-slate-300">
              Everyday essentials across electronics, fashion, home, beauty and
              more — curated, priced fairly, and shipped fast.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
            <p className="mt-2 text-xs text-footer-muted">{CONTACT_HOURS}</p>

            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 items-center rounded-full border border-white/15 px-3.5 text-xs font-medium text-slate-300 transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
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

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-footer-muted">
            © {year} Easy Cart. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-footer-muted transition-colors hover:text-white">
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