export interface FooterLink {
  label: string;
  href: string;
}

export const SUPPORT_LINKS: FooterLink[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Refunds", href: "/returns" },
  { label: "FAQ", href: "/faq" },
];

export const COMPANY_LINKS: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/about#careers" },
  { label: "Sustainability", href: "/about#sustainability" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/privacy#cookies" },
];

export const CONTACT_EMAIL = "support@easycart.example";
export const CONTACT_PHONE = "+1 (555) 012-3456";
export const CONTACT_HOURS = "Monday to Friday, 9:00–18:00";