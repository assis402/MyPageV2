"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { usePathname } from "@/lib/i18n/navigation";

type HeaderChromeProps = {
  brand: ReactNode;
  nav: ReactNode;
  mobileNav: ReactNode;
  mobileFlags: ReactNode;
  menuLabel: string;
};

export function HeaderChrome({
  brand,
  nav,
  mobileNav,
  mobileFlags,
  menuLabel,
}: HeaderChromeProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMenuMounted(false);
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setMenuOpen(false);
        setMenuMounted(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function handleMobileMenu() {
    if (menuOpen) {
      setMenuOpen(false);
      window.setTimeout(() => setMenuMounted(false), 200);
      return;
    }

    setMenuMounted(true);
    window.setTimeout(() => setMenuOpen(true), 1);
  }

  const backgroundClass = [
    "menu-background",
    scrolled || menuOpen ? "is-visible" : "",
    scrolled ? "is-scrolled" : "",
    menuOpen ? "is-menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header>
      <div className="menu">
        <div className={backgroundClass} />
        <div className={`menu-container${scrolled ? " is-scrolled" : ""}`}>
          <div className="perfil">{brand}</div>
          {nav}
          <button
            type="button"
            className={`menu-btn${menuOpen ? " is-open" : ""}`}
            onClick={handleMobileMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuLabel}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`menu-mobile${menuMounted ? " is-mounted" : ""}${menuOpen ? " is-open" : ""}`}
        >
          {mobileNav}
          {mobileFlags}
        </div>
      </div>
    </header>
  );
}
