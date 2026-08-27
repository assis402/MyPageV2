"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { usePathname } from "@/lib/i18n/navigation";

const FADE_MS = 550;

type RouteBackgroundProps = {
  nebula?: boolean;
};

export function RouteBackground({ nebula = false }: RouteBackgroundProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mounted, setMounted] = useState(isHome);
  const [visible, setVisible] = useState(isHome);

  useEffect(() => {
    if (isHome) {
      setMounted(true);
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }

    setVisible(false);
    const timeout = window.setTimeout(() => setMounted(false), FADE_MS);
    return () => window.clearTimeout(timeout);
  }, [isHome]);

  if (!mounted) return null;

  return (
    <div className={cn("route-background", visible && "is-visible", nebula && "is-nebula")} aria-hidden="true">
      {nebula ? null : (
        <Image
          src="/images/background.webp"
          alt=""
          fill
          priority={isHome}
          sizes="100vw"
          quality={65}
          className="hero-background-img"
        />
      )}
    </div>
  );
}
