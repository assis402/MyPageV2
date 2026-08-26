import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionTitleProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  as?: "p" | "h2";
};

export function SectionTitle({ children, className, as: Tag = "p", ...props }: SectionTitleProps) {
  return (
    <Tag className={cn("ui-section-title", className)} {...props}>
      {children}
    </Tag>
  );
}
