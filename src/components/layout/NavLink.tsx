"use client";

import type { ReactNode } from "react";

import { Link, usePathname } from "@/lib/i18n/navigation";
import { cn } from "@/lib/cn";

type NavLinkProps = {
  href: "/" | "/projects";
  children: ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith("/projects");

  return (
    <Link href={href} className={cn("menu-item", active && "is-active")} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}
