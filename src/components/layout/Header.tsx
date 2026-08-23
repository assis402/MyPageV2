"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/lib/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations();
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
          <div className="perfil">
            <Link href="/" className="my-photo-wrapper">
              <Image
                className={`my-photo${scrolled ? " is-scrolled" : ""}`}
                src="/images/perfil.webp"
                alt={t("ProfilePhotoAlt")}
                width={80}
                height={80}
                priority
              />
            </Link>
            <p>
              <Link href="/" className="site-name">
                matheusassis
              </Link>
            </p>
          </div>

          <nav className="menu-items" aria-label="Main">
            <Link href="/" className="menu-item">
              {t("AboutMenu")}
            </Link>
            <Link href="/projects" className="menu-item">
              {t("ProjectsMenu")}
            </Link>
            <LocaleSwitcher variant="desktop" />
          </nav>

          <button
            type="button"
            className={`menu-btn${menuOpen ? " is-open" : ""}`}
            onClick={handleMobileMenu}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>

        <div
          className={`menu-mobile${menuMounted ? " is-mounted" : ""}${menuOpen ? " is-open" : ""}`}
        >
          <nav className="menu-items-mobile">
            <Link href="/" className="menu-item">
              {t("AboutMenu")}
            </Link>
            <Link href="/projects" className="menu-item">
              {t("ProjectsMenu")}
            </Link>
          </nav>
          <LocaleSwitcher variant="mobile" />
        </div>
      </div>
    </header>
  );
}
