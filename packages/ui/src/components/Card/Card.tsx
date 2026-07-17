"use client";

import type { ReactNode } from "react";
import { Image, View, type ImageStyle, type ViewProps } from "react-native";
import { withClassName } from "../../cssInterop";

export type CardProps = Readonly<{
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageHeight?: number | string;
}> & Omit<ViewProps, "children">;

function resolveHeightValue(height: number | string): number | string {
  return height;
}

export function Card({
  children,
  imageSrc,
  imageAlt = "",
  imageHeight = "48em",
  className,
  ...props
}: CardProps) {
  const rootClassName = ["w-full overflow-hidden bg-[var(--color-surface)]", className]
    .filter(Boolean)
    .join(" ");

  const cardImageStyle: ImageStyle = {
    height: resolveHeightValue(imageHeight) as any,
  };

  return (
    <View
      style={withClassName(rootClassName) as any}
      {...props}
    >
      {imageSrc ? (
        <Image
          source={{ uri: imageSrc }}
          accessibilityLabel={imageAlt}
          resizeMode="cover"
          style={withClassName("w-full", cardImageStyle) as ImageStyle}
        />
      ) : null}

      <View style={withClassName("px-6 py-6") as any}>{children}</View>
    </View>
  );
}
