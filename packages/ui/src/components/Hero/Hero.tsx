"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Text, type TextVariant } from "../Text/Text";

export type HeroHeightPreset = "full" | "twoThirds" | "oneThird";

export type HeroProps = Readonly<{
  title: ReactNode;
  subtitle?: ReactNode;
  titleVariant?: TextVariant;
  backgroundImageUrl?: string;
  overlayOpacity?: number;
  heightPreset?: HeroHeightPreset;
  height?: number | string;
}> & Omit<HTMLAttributes<HTMLElement>, "children">;

const heroHeightPresetValues: Readonly<Record<HeroHeightPreset, string>> = {
  full: "100vh",
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
  overlayOpacity = 0.45,
  heightPreset = "full",
  height,
  className,
  style,
  ...props
}: HeroProps) {
  const hasSubtitle = Boolean(subtitle);
  const useVerticalTextLayout =
    height === undefined && (heightPreset === "oneThird" || heightPreset === "twoThirds");
  const titleStyle: CSSProperties | undefined =
    titleVariant === "display" ? { lineHeight: 0.90 } : undefined;
  const titleClassName = hasSubtitle && !useVerticalTextLayout ? "inline-block text-white" : "text-white";

  const rootClassName = [
    "relative flex items-end overflow-hidden pt-24 pb-2",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedHeight = height ?? heroHeightPresetValues[heightPreset];

  const rootStyle: CSSProperties = {
    minHeight: resolveHeightValue(resolvedHeight),
    ...style,
  };

  return (
    <section
      className={rootClassName}
      style={rootStyle}
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black"
        style={{ opacity: clampOpacity(overlayOpacity) }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className={useVerticalTextLayout ? "w-full flex flex-col gap-4" : "w-full sm:flex sm:items-end sm:gap-8"}>
          <div className={hasSubtitle && !useVerticalTextLayout ? "sm:w-fit sm:max-w-[40%] sm:flex-none" : "w-full"}>
            <Text
              variant={titleVariant}
              className={titleClassName}
              style={titleStyle}
            >
              {title}
            </Text>
          </div>
          {hasSubtitle ? (
            <div
              className={
                useVerticalTextLayout
                  ? "w-full"
                  : "mt-6 sm:mt-0 sm:w-fit sm:max-w-[40%] sm:flex-none"
              }
            >
              <Text className="text-white/90">{subtitle}</Text>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
