import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { CartButton } from "@/components/layout/cart-button";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { HeaderSearch } from "@/components/layout/header-search";
import { Logo } from "@/components/layout/logo";
import { MobileHeader } from "@/components/layout/mobile-header";

export function SiteHeader() {
  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-30 w-full border-b border-line bg-white/90 shadow-[0_1px_12px_rgba(15,23,42,0.06)] backdrop-blur-md">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <MobileHeader />

          <div className="hidden lg:block">
            <div className="flex h-16 items-center gap-8">
              <Logo />
              <div className="flex-1">
                <HeaderSearch className="max-w-xl" />
              </div>
              <CartButton />
            </div>
            <div className="border-t border-line">
              <DesktopNav />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}