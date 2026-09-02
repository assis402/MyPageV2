"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { usePathname } from "@/lib/i18n/navigation";

const FADE_MS = 550;

export function RouteBackground() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mounted, setMounted] = useState(isHome);
  const [visible, setVisible] = useState(isHome);

  useEffect(() => {
    if (isHome) {
      setMounted(true);
      setVisible(true);
      return;
    }

    setVisible(false);
    const timeout = window.setTimeout(() => setMounted(false), FADE_MS);
    return () => window.clearTimeout(timeout);
  }, [isHome]);

  if (!mounted) return null;

  return <div className={cn("route-background", "is-nebula", visible && "is-visible")} aria-hidden="true" />;
}
