"use client";

import type { ReactNode } from "react";
import { Image, View, type ImageStyle, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";

export type CardProps = Readonly<{
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageHeight?: number | string;
  className?: string;
  contentClassName?: string;
  contentStyle?: ViewStyle;
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
  contentClassName,
  contentStyle,
  ...props
}: CardProps) {
  const rootClassName = ["mb-card", className]
    .filter(Boolean)
    .join(" ");

  const cardImageStyle: ImageStyle = {
    height: resolveHeightValue(imageHeight) as any,
  };

  const contentRootClassName = ["mb-card__content", contentClassName]
    .filter(Boolean)
    .join(" ");

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
          style={withClassName("mb-card__image", cardImageStyle) as ImageStyle}
        />
      ) : null}

      <View style={withClassName(contentRootClassName, contentStyle) as any}>{children}</View>
    </View>
  );
}
