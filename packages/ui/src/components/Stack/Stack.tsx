"use client";

import type { ReactNode } from "react";
import { View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { resolveGapValue, type GapValue } from "../../spacing";

export type StackDirection = "row" | "column";

export type StackProps = Readonly<{
  children?: ReactNode;
  direction?: StackDirection;
  gap?: GapValue;
  className?: string;
}> & Omit<ViewProps, "children">;

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

  const rootStyle: ViewStyle = {
    ...gapStyle,
    ...(style as ViewStyle),
  };

  return (
    <View
      style={withClassName(rootClassName, rootStyle) as ViewStyle}
      {...props}
    >
      {children}
    </View>
  );
}
