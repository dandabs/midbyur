"use client";

import type { ReactNode } from "react";
import { View, type ViewProps } from "react-native";
import { withClassName } from "../../cssInterop";

export type GridProps = Readonly<{
  children?: ReactNode;
  cols?: number | string;
  gap?: number | string;
}> & Omit<ViewProps, "children">;

function resolveSpacingValue(value: number | string): string {
  return typeof value === "number" ? `${value}px` : value;
}

function resolveColumnsValue(cols: number | string): string {
  if (typeof cols === "number") {
    return `repeat(${cols}, minmax(0, 1fr))`;
  }

  return cols;
}

export function Grid({
  children,
  cols = 3,
  gap = 24,
  className,
  style,
  ...props
}: GridProps) {
  const rootClassName = ["grid w-full", className].filter(Boolean).join(" ");

  const rootStyle = {
    ...(style as any),
    gridTemplateColumns: resolveColumnsValue(cols),
    gap: resolveSpacingValue(gap),
  } as any;

  return (
    <View
      style={withClassName(rootClassName, rootStyle) as any}
      {...props}
    >
      {children}
    </View>
  );
}
