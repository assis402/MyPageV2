import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/cn";

type ButtonVariant = "gradient" | "outlined";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: ButtonVariant;
  wide?: boolean;
  icon?: ReactNode;
  children: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  gradient: "gradient-button",
  outlined: "outlined-button",
};

export function AppButton({
  href,
  variant = "gradient",
  wide,
  icon,
  className,
  children,
  type = "button",
  ...props
}: AppButtonProps) {
  const classes = cn(variantClass[variant], wide && "second-button", className);
  const content = (
    <>
      {icon}
      <span className="inner-button">{children}</span>
    </>
  );

  if (href) {
    if (href.startsWith("#") || href.startsWith("http") || href.startsWith("/cv/")) {
      return (
        <a href={href} className={classes}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}

export function GradientButton(props: Omit<AppButtonProps, "variant">) {
  return <AppButton variant="gradient" {...props} />;
}

export function OutlinedButton(props: Omit<AppButtonProps, "variant">) {
  return <AppButton variant="outlined" {...props} />;
}
