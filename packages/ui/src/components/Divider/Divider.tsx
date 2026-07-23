"use client";

import { View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";

export type DividerProps = Readonly<{
  orientation?: "horizontal" | "vertical";
  className?: string;
}> & Omit<ViewProps, "children">;

export function Divider({
  orientation = "horizontal",
  className,
  style,
  ...props
}: DividerProps) {
  const rootClassName = ["mb-divider", `mb-divider--${orientation}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <View
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      accessibilityRole="separator"
      {...props}
    />
  );
}
