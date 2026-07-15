"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ImageBackground, View, type ImageStyle, type TextStyle, type ViewProps, type ViewStyle } from "react-native";
import { Text, type TextVariant } from "../Text/Text";
import { withClassName } from "../../cssInterop";

export type HeroHeightPreset = "full" | "twoThirds" | "oneThird";

export type HeroProps = Readonly<{
  title: ReactNode;
  subtitle?: ReactNode;
  titleVariant?: TextVariant;
  backgroundImageUrl?: string;
  backgroundImageUrls?: string[];
  slideshowIntervalMs?: number;
  overlayOpacity?: number;
  heightPreset?: HeroHeightPreset;
  height?: number | string;
}> & Omit<ViewProps, "children">;

const heroHeightPresetValues: Readonly<Record<HeroHeightPreset, string>> = {
  full: "100dvh",
  twoThirds: "66.6667vh",
  oneThird: "33.3333vh",
};

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

export function Hero({
  title,
  subtitle,
  titleVariant = "display",
  backgroundImageUrl,
  backgroundImageUrls,
  slideshowIntervalMs = 6000,
  overlayOpacity = 0.45,
  heightPreset = "full",
  height,
  className,
  style,
  ...props
}: HeroProps) {
  const images = useMemo(() => {
    if (backgroundImageUrls && backgroundImageUrls.length > 0) {
      return backgroundImageUrls;
    }

    return backgroundImageUrl ? [backgroundImageUrl] : [];
  }, [backgroundImageUrl, backgroundImageUrls]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);

    if (images.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, Math.max(1000, slideshowIntervalMs));

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images, slideshowIntervalMs]);

  const hasSubtitle = Boolean(subtitle);
  const useVerticalTextLayout =
    heightPreset === "twoThirds" || heightPreset === "oneThird";
  const titleStyle: TextStyle | undefined =
    titleVariant === "display" ? { lineHeight: 0.90 } : undefined;
  const titleClassName = "text-white";

  const rootClassName = [
    "relative flex h-full w-full flex-col justify-end overflow-hidden pt-24 pb-2",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedHeight = height ?? heroHeightPresetValues[heightPreset];

  const rootStyle: ViewStyle = {
    minHeight: resolveHeightValue(resolvedHeight) as any,
    ...(style as ViewStyle),
  };

  return (
    <View
      style={withClassName(rootClassName, rootStyle) as ViewStyle}
      {...props}
    >
      <ImageBackground
        source={images[activeImageIndex] ? { uri: images[activeImageIndex] } : undefined}
        style={withClassName("absolute inset-0") as any}
        imageStyle={{ resizeMode: "cover" } as ImageStyle}
      />
      <View
        style={withClassName("absolute inset-0 bg-black", { opacity: clampOpacity(overlayOpacity) }) as ViewStyle}
      />

      <View style={withClassName("relative z-10 w-full px-4 sm:px-6 lg:px-8") as any}>
        <View
          style={withClassName(
            hasSubtitle
              ? useVerticalTextLayout
                ? "w-full flex flex-col gap-4"
                : "w-full flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-start sm:gap-8"
              : "w-full"
          ) as any}
        >
          <View
            style={withClassName(
              hasSubtitle && !useVerticalTextLayout
                ? "w-full sm:w-fit sm:max-w-[40%] sm:flex-none"
                : "w-full"
            ) as any}
          >
            <Text
              variant={titleVariant}
              className={titleClassName}
              style={titleStyle}
            >
              {title}
            </Text>
          </View>
          {hasSubtitle ? (
            <View
              style={withClassName(
                useVerticalTextLayout ? "w-full" : "w-full sm:w-fit sm:max-w-[40%] sm:flex-none"
              ) as any}
            >
              <Text className="text-white/90">{subtitle}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
