"use client";

import type { ReactNode } from "react";
import { View, type ViewProps, type ViewStyle } from "react-native";
import { Text, type TextColor } from "../Text/Text";
import { withClassName } from "../../cssInterop";

export type PillVariant =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary"
  | "secondary";

export type PillProps = Readonly<{
  children: ReactNode;
  variant?: PillVariant;
  className?: string;
}> & Omit<ViewProps, "children">;

const variantToTextColor: Readonly<Record<PillVariant, TextColor>> = {
  neutral: "text",
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
  primary: "primary",
  secondary: "secondary",
};

export function Pill({
  children,
  variant = "neutral",
  className,
  style,
  ...props
}: PillProps) {
  const rootClassName = [
    "mb-pill",
    `mb-pill--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <View
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      {...props}
    >
      <Text variant="bodySm" weight="medium" color={variantToTextColor[variant]} inline>
        {children}
      </Text>
    </View>
  );
}
