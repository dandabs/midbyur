"use client";

import type { ReactNode } from "react";
import { View, type ViewProps } from "react-native";
import { withClassName } from "../../cssInterop";

type ContainerMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

const maxWidthClassNames: Readonly<Record<ContainerMaxWidth, string>> = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-none",
};

export type ContainerProps = Readonly<{
  children?: ReactNode;
  maxWidth?: ContainerMaxWidth;
}> & Omit<ViewProps, "children">;

export function Container({
  children,
  maxWidth = "xl",
  className,
  ...props
}: ContainerProps) {
  const rootClassName = [
    "mx-auto w-full px-4 sm:px-6 lg:px-8",
    maxWidthClassNames[maxWidth],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <View
      style={withClassName(rootClassName) as any}
      {...props}
    >
      {children}
    </View>
  );
}
