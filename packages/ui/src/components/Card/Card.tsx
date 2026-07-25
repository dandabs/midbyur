"use client";

import type { ReactNode } from "react";
import { Image, Pressable, View, type ImageStyle, type PressableProps, type ViewProps, type ViewStyle } from "react-native";
import { Text } from "../Text/Text";
import { withClassName } from "../../cssInterop";

export type CardVariant = "default" | "accent";

export type CardProps = Readonly<{
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageHeight?: number | string;
  className?: string;
  contentClassName?: string;
  contentStyle?: ViewStyle;
  variant?: CardVariant;
  onPress?: () => void;
}> & Omit<ViewProps & PressableProps, "children">;

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
  variant = "default",
  onPress,
  ...props
}: CardProps) {
  const isPressable = Boolean(onPress);

  const rootClassName = [
    "mb-card",
    `mb-card--${variant}`,
    isPressable ? "mb-card--pressable" : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const cardImageStyle: ImageStyle = {
    height: resolveHeightValue(imageHeight) as any,
  };

  const contentRootClassName = ["mb-card__content", contentClassName]
    .filter(Boolean)
    .join(" ");

  const actionVariant = variant === "default" ? "default" : "accent";
  const actionClassName = `mb-card__action mb-card__action--${actionVariant}`;

  const inner = (
    <>
      {imageSrc ? (
        <Image
          source={{ uri: imageSrc }}
          accessibilityLabel={imageAlt}
          resizeMode="cover"
          style={withClassName("mb-card__image", cardImageStyle) as ImageStyle}
        />
      ) : null}

      <View style={[withClassName(contentRootClassName, contentStyle) as ViewStyle, isPressable ? { flex: 1 } : undefined]}>
        {children}
      </View>

      {isPressable ? (
        <View style={withClassName(actionClassName) as ViewStyle}>
          <Text size="lg" color="textMuted" weight="regular">›</Text>
        </View>
      ) : null}
    </>
  );

  if (isPressable) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [withClassName(rootClassName) as ViewStyle, pressed ? { opacity: 0.7 } : undefined]}
        accessibilityRole="button"
        {...(props as PressableProps)}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View
      style={withClassName(rootClassName) as any}
      {...(props as ViewProps)}
    >
      {inner}
    </View>
  );
}
