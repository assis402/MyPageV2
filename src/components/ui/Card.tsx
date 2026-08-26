import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
};

export function Card({ as: Comp = "div", children, className, ...props }: CardProps) {
  return (
    <Comp className={cn("ui-card", className)} {...props}>
      {children}
    </Comp>
  );
}
