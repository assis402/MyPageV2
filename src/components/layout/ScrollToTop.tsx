"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function ScrollToTop() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const [zooming, setZooming] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setZooming(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setZooming(true));
    });
  }

  return (
    <button
      type="button"
      className={`scroll-up-button${visible ? " is-visible" : ""}${zooming ? " zoom-animation" : ""}`}
      onClick={scrollUp}
      onAnimationEnd={() => setZooming(false)}
      aria-label={t("ScrollToTop")}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/top-arrow.svg" alt="" />
    </button>
  );
}
