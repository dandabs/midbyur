"use client";

import type { ReactNode } from "react";
import { View, type ViewProps } from "react-native";
import { withClassName } from "../../cssInterop";

type ContainerMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

const maxWidthClassNames: Readonly<Record<ContainerMaxWidth, string>> = {
  sm: "mb-container--sm",
  md: "mb-container--md",
  lg: "mb-container--lg",
  xl: "mb-container--xl",
  "2xl": "mb-container--2xl",
  full: "mb-container--full",
};

export type ContainerProps = Readonly<{
  children?: ReactNode;
  maxWidth?: ContainerMaxWidth;
  fill?: boolean;
  className?: string;
}> & Omit<ViewProps, "children">;

export function Container({
  children,
  maxWidth = "xl",
  fill = false,
  className,
  style,
  ...props
}: ContainerProps) {
  const rootClassName = [
    "mb-container",
    maxWidthClassNames[maxWidth],
    fill ? "mb-container--fill" : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <View
      style={withClassName(rootClassName, style as any) as any}
      {...props}
    >
      {children}
    </View>
  );
}
