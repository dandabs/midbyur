"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

export type ButtonProps = Readonly<{
  children: ReactNode;
  variant?: ButtonVariant;
}> & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const variantClassNames: Readonly<Record<ButtonVariant, string>> = {
  primary:
    "bg-(--color-primary) text-(--color-primaryForeground) enabled:hover:bg-(--color-primaryHover)",
  secondary:
    "bg-(--color-secondary) text-(--color-secondaryForeground) enabled:hover:bg-(--color-secondaryHover)",
  success:
    "bg-(--color-success) text-(--color-successForeground) enabled:hover:bg-(--color-successHover)",
  danger:
    "bg-(--color-danger) text-(--color-dangerForeground) enabled:hover:bg-(--color-dangerHover)",
  warning:
    "bg-(--color-warning) text-(--color-warningForeground) enabled:hover:bg-(--color-warningHover)",
  info:
    "bg-(--color-info) text-(--color-infoForeground) enabled:hover:bg-(--color-infoHover)",
};

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const rootClassName = [
    "inline-flex cursor-pointer items-center justify-center rounded-none px-4 py-1.5 text-sm font-medium transition-colors duration-150",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-borderStrong)",
    "disabled:cursor-not-allowed disabled:bg-(--color-disabled) disabled:text-(--color-disabledText)",
    variantClassNames[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={rootClassName}
      type="button"
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
