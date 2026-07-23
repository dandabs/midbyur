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
  className?: string;
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
    "mb-section",
    hasFixedHeight ? "mb-section--fixed" : "",
    isImage ? "mb-section--image" : "",
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
            style={withClassName("mb-section__bg") as any}
            imageStyle={{ resizeMode: "cover" } as ImageStyle}
          />
          <View
            style={withClassName("mb-section__overlay", { opacity: clampOpacity(overlayOpacity) }) as ViewStyle}
          />
          <View style={withClassName("mb-section__content") as any}>{children}</View>
        </>
      ) : (
        children
      )}
    </View>
  );
}
