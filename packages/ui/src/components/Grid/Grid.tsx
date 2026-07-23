"use client";

import type { ReactNode } from "react";
import { View, type ViewProps } from "react-native";
import { withClassName } from "../../cssInterop";
import { resolveGapValue, type GapValue } from "../../spacing";

export type GridProps = Readonly<{
  children?: ReactNode;
  cols?: number | string;
  gap?: GapValue;
  className?: string;
}> & Omit<ViewProps, "children">;

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
  const rootClassName = ["mb-grid", className].filter(Boolean).join(" ");

  const rootStyle = {
    ...(style as any),
    gridTemplateColumns: resolveColumnsValue(cols),
    gap: resolveGapValue(gap),
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
