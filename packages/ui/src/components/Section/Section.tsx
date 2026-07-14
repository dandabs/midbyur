"use client";

import type { ReactNode } from "react";
import { ImageBackground, View, type ImageStyle, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";

export type SectionType = "default" | "image";

export type SectionProps = Readonly<{
  children?: ReactNode;
  type?: SectionType;
  imageUrl?: string;
  overlayOpacity?: number;
  height?: number | string;
}> & Omit<ViewProps, "children">;

function resolveHeightValue(height: number | string): string {
  return typeof height === "number" ? `${height}px` : height;
}

function clampOpacity(value: number): number {
  if (value < 0) {
    return 0;
  }

  if (value > 1) {
    return 1;
  }

  return value;
}

export function Section({
  children,
  type = "default",
  imageUrl,
  overlayOpacity = 0.45,
  height,
  className,
  style,
  ...props
}: SectionProps) {
  const isImage = type === "image";
  const resolvedHeight = isImage ? (height ?? 400) : height;
  const hasFixedHeight = resolvedHeight !== undefined;

  const rootClassName = [
    "relative w-full py-24",
    hasFixedHeight ? "flex items-center" : "",
    isImage ? "overflow-hidden" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sectionStyle: ViewStyle = {
    ...(resolvedHeight ? { minHeight: resolveHeightValue(resolvedHeight) as any } : {}),
    ...(style as ViewStyle),
  };

  return (
    <View
      style={withClassName(rootClassName, sectionStyle) as ViewStyle}
      {...props}
    >
      {isImage ? (
        <>
          <ImageBackground
            source={imageUrl ? { uri: imageUrl } : undefined}
            style={withClassName("absolute inset-0") as any}
            imageStyle={{ resizeMode: "cover" } as ImageStyle}
          />
          <View
            style={withClassName("absolute inset-0 bg-black", { opacity: clampOpacity(overlayOpacity) }) as ViewStyle}
          />
          <View style={withClassName("relative z-10 w-full") as any}>{children}</View>
        </>
      ) : (
        children
      )}
    </View>
  );
}
