"use client";

import { Children, type ReactNode } from "react";
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
  const resolvedGapNumber = resolveGapNumber(
    mappedGap ?? numericGap,
  );
  const resolvedGap = resolveGapValue(gap);
  const directionClass = direction === "row" ? "flex-row" : "flex-col";
  const rootClassName = [
    "flex",
    directionClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (Platform.OS !== "web") {
    const spacedChildren = Children.toArray(children).map((child, index) => {
      if (index === 0) return child;

      const childKey =
        typeof child === "object" &&
        child !== null &&
        "key" in child &&
        (typeof (child as { key: unknown }).key === "string" ||
          typeof (child as { key: unknown }).key === "number")
          ? String((child as { key: string | number }).key)
          : "stack-gap";

      const spacingStyle: ViewStyle =
        direction === "row"
          ? { marginLeft: resolvedGapNumber ?? 0 }
          : { marginTop: resolvedGapNumber ?? 0 };

      return (
        <View
          key={`stack-gap-${childKey}`}
          style={spacingStyle}
        >
          {child}
        </View>
      );
    });

    return (
      <View
        style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
        {...props}
      >
        {spacedChildren}
      </View>
    );
  }

  const gapStyle: ViewStyle = {
    gap: resolvedGap,
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
