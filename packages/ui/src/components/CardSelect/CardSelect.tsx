"use client";

import type { ReactNode } from "react";
import { Pressable, View, type PressableProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";

export type CardSelectProps = Readonly<{
  children?: ReactNode;
  value: string;
  selected?: boolean;
  onPress?: (value: string) => void;
  className?: string;
  contentClassName?: string;
  contentStyle?: ViewStyle;
}> & Omit<PressableProps, "children" | "onPress">;

export function CardSelect({
  children,
  value,
  selected = false,
  onPress,
  className,
  contentClassName,
  contentStyle,
  style,
  ...props
}: CardSelectProps) {
  const rootClassName = [
    "mb-card-select",
    selected ? "mb-card-select--selected" : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contentRootClassName = ["mb-card-select__content", contentClassName].filter(Boolean).join(" ");

  return (
    <Pressable
      onPress={() => onPress?.(value)}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        withClassName(rootClassName, style as ViewStyle) as ViewStyle,
        pressed ? { opacity: 0.85 } : undefined,
      ]}
      {...props}
    >
      <View style={withClassName(contentRootClassName, contentStyle) as ViewStyle}>{children}</View>
    </Pressable>
  );
}
