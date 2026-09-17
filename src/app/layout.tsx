import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { QueryProvider } from "@/components/query-provider";
import { MotionProvider } from "@/components/motion-provider";
import { CartPersistence } from "@/features/cart/cart-persistence";
import { ToastProvider } from "@/components/ui/toast";
import { CartDrawer } from "@/features/cart/cart-drawer";
import { CartDrawerProvider } from "@/features/cart/cart-drawer-context";
import { ReduxProvider } from "@/store/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Easy Cart",
    template: "%s | Easy Cart",
  },
  description: "Shop the latest electronics, fashion, home goods, and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-brand-ink focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:ring-offset-paper"
        >
          Skip to content
        </a>
        <ReduxProvider>
          <CartPersistence />
          <QueryProvider>
            <MotionProvider>
              <ToastProvider>
                <CartDrawerProvider>
                  <SiteHeader />
                  <div id="main-content" className="flex flex-1 flex-col">
                    {children}
                  </div>
                  <SiteFooter />
                  <CartDrawer />
                </CartDrawerProvider>
              </ToastProvider>
            </MotionProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
