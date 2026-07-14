"use client";

import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import type { TextColor } from "../Text/Text";

const iconColorValues: Readonly<Record<TextColor, string>> = {
  background: "var(--color-background)",
  backgroundAccent: "var(--color-backgroundAccent)",
  surface: "var(--color-surface)",
  surfaceAccent: "var(--color-surfaceAccent)",
  primary: "var(--color-primary)",
  primaryHover: "var(--color-primaryHover)",
  primaryForeground: "var(--color-primaryForeground)",
  secondary: "var(--color-secondary)",
  secondaryHover: "var(--color-secondaryHover)",
  secondaryForeground: "var(--color-secondaryForeground)",
  text: "var(--color-text)",
  textMuted: "var(--color-textMuted)",
  muted: "var(--color-textMuted)",
  border: "var(--color-border)",
  borderStrong: "var(--color-borderStrong)",
  success: "var(--color-success)",
  successHover: "var(--color-successHover)",
  successForeground: "var(--color-successForeground)",
  warning: "var(--color-warning)",
  warningHover: "var(--color-warningHover)",
  warningForeground: "var(--color-warningForeground)",
  danger: "var(--color-danger)",
  dangerHover: "var(--color-dangerHover)",
  dangerForeground: "var(--color-dangerForeground)",
  info: "var(--color-info)",
  infoHover: "var(--color-infoHover)",
  infoForeground: "var(--color-infoForeground)",
  disabled: "var(--color-disabled)",
  disabledText: "var(--color-disabledText)",
  current: "currentColor",
};

export type IconProps = Readonly<{
  icon: LucideIcon;
  color?: TextColor;
  size?: number;
  strokeWidth?: number;
}> & Omit<ComponentPropsWithoutRef<LucideIcon>, "color" | "size" | "strokeWidth">;

export function Icon({
  icon: Lucide,
  color = "text",
  size = 20,
  strokeWidth = 2,
  ...props
}: IconProps) {
  return (
    <Lucide
      color={iconColorValues[color]}
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}
