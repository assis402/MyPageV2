import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  tone?: "plain" | "tinted";
};

export function Section({ children, className, tone = "plain", ...props }: SectionProps) {
  return (
    <section className={cn("ui-section", tone === "tinted" && "ui-section-tinted", className)} {...props}>
      <div className="ui-section-inner">{children}</div>
    </section>
  );
}
