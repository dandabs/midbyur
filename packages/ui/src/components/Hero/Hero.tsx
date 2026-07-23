"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ImageBackground, View, type ImageStyle, type ViewProps, type ViewStyle } from "react-native";
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
  className?: string;
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
  const titleClassName = "mb-hero__title";

  const rootClassName = [
    "mb-hero",
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
        style={withClassName("mb-hero__bg") as any}
        imageStyle={{ resizeMode: "cover" } as ImageStyle}
      />
      <View
        style={withClassName("mb-hero__overlay", { opacity: clampOpacity(overlayOpacity) }) as ViewStyle}
      />

      <View style={withClassName("mb-hero__content") as any}>
        <View
          style={withClassName(
            hasSubtitle
              ? useVerticalTextLayout
                ? "mb-hero__layout-vertical"
                : "mb-hero__layout"
              : "mb-hero__titleWrap"
          ) as any}
        >
          <View
            style={withClassName(
              hasSubtitle && !useVerticalTextLayout
                ? "mb-hero__titleWrap mb-hero__titleWrap-narrow"
                : "mb-hero__titleWrap"
            ) as any}
          >
            <Text
              variant={titleVariant}
              className={titleClassName}
            >
              {title}
            </Text>
          </View>
          {hasSubtitle ? (
            <View
              style={withClassName(
                useVerticalTextLayout
                  ? "mb-hero__subtitleWrap"
                  : "mb-hero__subtitleWrap mb-hero__subtitleWrap-narrow"
              ) as any}
            >
              <Text className="mb-hero__subtitle">{subtitle}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
