"use client";

import { ActivityIndicator, type ActivityIndicatorProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import type { TextColor } from "../Text/Text";

const spinnerColorValues: Readonly<Record<TextColor, string>> = {
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

export type SpinnerProps = Readonly<{
  color?: TextColor;
  className?: string;
}> & Omit<ActivityIndicatorProps, "color">;

export function Spinner({
  color = "primary",
  className,
  style,
  ...props
}: SpinnerProps) {
  return (
    <ActivityIndicator
      color={spinnerColorValues[color]}
      style={withClassName(className, style as ViewStyle) as ViewStyle}
      {...props}
    />
  );
}
