import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type TagProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  selected?: boolean;
  interactive?: boolean;
};

export function Tag({ children, selected, interactive, className, type = "button", ...props }: TagProps) {
  const classes = cn("ui-tag", selected && "is-selected", className);

  if (interactive) {
    return (
      <button type={type} className={classes} aria-pressed={selected} {...props}>
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
}
