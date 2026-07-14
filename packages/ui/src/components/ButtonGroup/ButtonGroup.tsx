"use client";

import type { ReactNode } from "react";
import { View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";

export type ButtonGroupDirection = "horizontal" | "vertical";

export type ButtonGroupProps = Readonly<{
  children?: ReactNode;
  direction?: ButtonGroupDirection;
  gap?: number | string;
}> & Omit<ViewProps, "children">;

function resolveGapValue(gap: number | string): string {
  return typeof gap === "number" ? `${gap}px` : gap;
}

export function ButtonGroup({
  children,
  direction = "horizontal",
  gap = 12,
  className,
  style,
  ...props
}: ButtonGroupProps) {
  const rootClassName = [
    "flex w-full",
    direction === "horizontal"
      ? "flex-row items-center [&>*]:min-w-0 [&>*]:flex-1"
      : "flex-col",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const rootStyle: ViewStyle = {
    gap: resolveGapValue(gap),
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
