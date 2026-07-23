"use client";

import { Children, cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";
import { Platform } from "react-native";
import { View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { resolveGapNumber, resolveGapValue, type GapValue } from "../../spacing";
import { Button } from "../Button/Button";

export type ButtonGroupDirection = "horizontal" | "vertical";

export type ButtonGroupProps = Readonly<{
  children?: ReactNode;
  direction?: ButtonGroupDirection;
  gap?: GapValue;
  className?: string;
}> & Omit<ViewProps, "children">;

export function ButtonGroup({
  children,
  direction = "horizontal",
  gap = 12,
  className,
  style,
  ...props
}: ButtonGroupProps) {
  const mappedGap =
    typeof gap === "string" && (gap === "sm" || gap === "md" || gap === "lg")
      ? gap
      : undefined;
  const numericGap = typeof gap === "number" ? gap : undefined;
  const resolvedGapNumber = resolveGapNumber(
    mappedGap ?? numericGap,
  );

  const rootClassName = [
    "mb-button-group",
    direction === "horizontal"
      ? "mb-button-group--horizontal"
      : "mb-button-group--vertical",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const rootStyle: ViewStyle = {
    gap: Platform.OS === "web" ? resolveGapValue(gap) : (resolvedGapNumber ?? 0),
    ...(style as ViewStyle),
  };

  const normalizedChildren = direction === "horizontal"
    ? Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child;
      }

      if (child.type !== Button) {
        return child;
      }

      const buttonChild = child as ReactElement<{ fluid?: boolean }>;

      return cloneElement(buttonChild, {
        ...buttonChild.props,
        fluid: false,
      });
    })
    : children;

  return (
    <View
      style={withClassName(rootClassName, rootStyle) as ViewStyle}
      {...props}
    >
      {normalizedChildren}
    </View>
  );
}
