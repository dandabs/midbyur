"use client";

import type { ReactNode } from "react";
import { Platform, View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { resolveGapNumber, resolveGapValue, type GapValue } from "../../spacing";

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
  const mappedGap =
    typeof gap === "string" && (gap === "sm" || gap === "md" || gap === "lg")
      ? gap
      : undefined;
  const numericGap = typeof gap === "number" ? gap : undefined;
  const resolvedGapNumber = resolveGapNumber(mappedGap ?? numericGap);
  const resolvedGap = resolveGapValue(gap);
  const directionClass = direction === "row" ? "mb-stack--row" : "mb-stack--column";
  const rootClassName = [
    "mb-stack",
    directionClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const gapStyle: ViewStyle = Platform.OS === "web"
    ? { gap: resolvedGap }
    : { gap: resolvedGapNumber ?? 0 };

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
