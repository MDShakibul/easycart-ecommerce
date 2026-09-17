"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { CartButton } from "@/components/layout/cart-button";
import { HeaderSearch } from "@/components/layout/header-search";
import { Logo } from "@/components/layout/logo";
import { CATEGORY_NAV } from "@/lib/navigation";

const iconButton =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink";

const menuLink =
  "flex h-11 items-center rounded-lg px-3 text-sm font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink";

export function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="lg:hidden">
      <div className="flex h-16 items-center gap-1">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className={iconButton}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <Logo className="mx-auto" />

        <button
          type="button"
          onClick={() => setSearchOpen((open) => !open)}
          aria-label={searchOpen ? "Close search" : "Open search"}
          aria-expanded={searchOpen}
          className={iconButton}
        >
          {searchOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Search className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <CartButton />
      </div>

      <AnimatePresence initial={false}>
        {searchOpen && (
          <m.div
            key="mobile-search"
            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-3">
              <HeaderSearch />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <>
            <m.div
              key="menu-backdrop"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
              aria-hidden="true"
            />
            <m.div
              key="menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={shouldReduceMotion ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={shouldReduceMotion ? undefined : { x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 flex h-full w-[85%] max-w-sm flex-col bg-paper shadow-xl"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className={iconButton}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav
                aria-label="Product categories"
                className="flex-1 overflow-y-auto p-4"
              >
                <Link
                  href="/products"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-11 items-center rounded-lg px-3 text-sm font-semibold text-ink transition-colors hover:bg-surface"
                >
                  All Products
                </Link>

                <p className="px-3 pt-5 pb-1 text-xs font-semibold tracking-wide text-ink-muted uppercase">
                  Categories
                </p>
                <ul>
                  {CATEGORY_NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={menuLink}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/products?sort=newest"
                  onClick={() => setMenuOpen(false)}
                  className={`${menuLink} mt-2`}
                >
                  New Arrivals
                </Link>
              </nav>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}