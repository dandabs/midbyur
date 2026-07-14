"use client";

import type { ReactNode } from "react";
import { View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";

export type StackDirection = "row" | "column";

export type StackProps = Readonly<{
  children?: ReactNode;
  direction?: StackDirection;
  gap?: number | string;
  className?: string;
}> & Omit<ViewProps, "children">;

function resolveGapValue(gap: number | string): string {
  return typeof gap === "number" ? `${gap}px` : gap;
}

export function Stack({
  children,
  direction = "column",
  gap = 16,
  className,
  style,
  ...props
}: StackProps) {
  const directionClass = direction === "row" ? "flex-row" : "flex-col";
  const rootClassName = [
    "flex",
    directionClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const gapStyle: ViewStyle = {
    gap: resolveGapValue(gap),
  };

  return (
    <View
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      {...props}
    >
      {children}
    </View>
  );
}
