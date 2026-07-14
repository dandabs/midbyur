"use client";

import type { ReactNode } from "react";
import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from "react-native";
import { withClassName } from "../../cssInterop";

export type TextSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

export type TextWeight = "regular" | "medium" | "semibold" | "bold" | "extrabold";

export type TextLineHeight = "tight" | "snug" | "normal" | "relaxed";

export type TextFontFamily = "text" | "notch" | "headline" | "mono";

export type TextColor =
  | "background"
  | "backgroundAccent"
  | "surface"
  | "surfaceAccent"
  | "primary"
  | "primaryHover"
  | "primaryForeground"
  | "secondary"
  | "secondaryHover"
  | "secondaryForeground"
  | "text"
  | "textMuted"
  | "muted"
  | "border"
  | "borderStrong"
  | "success"
  | "successHover"
  | "successForeground"
  | "warning"
  | "warningHover"
  | "warningForeground"
  | "danger"
  | "dangerHover"
  | "dangerForeground"
  | "info"
  | "infoHover"
  | "infoForeground"
  | "disabled"
  | "disabledText"
  | "current";

export type TextVariant =
  | "display"
  | "h1"
  | "h1Subheading"
  | "h2"
  | "h2Subheading"
  | "h3"
  | "h3Subheading"
  | "h4"
  | "h4Subheading"
  | "h5"
  | "h5Subheading"
  | "body"
  | "bodySm"
  | "label"
  | "caption";

type TextVariantDefinition = Readonly<{
  size: TextSize;
  weight: TextWeight;
  lineHeight: TextLineHeight;
  fontFamily: TextFontFamily;
}>;

const textSizeClassNames: Readonly<Record<TextSize, string>> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

const textWeightClassNames: Readonly<Record<TextWeight, string>> = {
  regular: "font-light",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const lineHeightClassNames: Readonly<Record<TextLineHeight, string>> = {
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
};

const fontFamilyValues: Readonly<Record<TextFontFamily, string>> = {
  text: '"Stack Sans Text", ui-sans-serif, system-ui, sans-serif',
  notch: '"Stack Sans Notch", ui-sans-serif, system-ui, sans-serif',
  headline: '"Stack Sans Headline", ui-sans-serif, system-ui, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const textColorClassNames: Readonly<Record<TextColor, string>> = {
  background: "text-(--color-background)",
  backgroundAccent: "text-(--color-backgroundAccent)",
  surface: "text-(--color-surface)",
  surfaceAccent: "text-(--color-surfaceAccent)",
  primary: "text-(--color-primary)",
  primaryHover: "text-(--color-primaryHover)",
  primaryForeground: "text-(--color-primaryForeground)",
  secondary: "text-(--color-secondary)",
  secondaryHover: "text-(--color-secondaryHover)",
  secondaryForeground: "text-(--color-secondaryForeground)",
  text: "text-(--color-text)",
  textMuted: "text-(--color-textMuted)",
  muted: "text-(--color-textMuted)",
  border: "text-(--color-border)",
  borderStrong: "text-(--color-borderStrong)",
  success: "text-(--color-success)",
  successHover: "text-(--color-successHover)",
  successForeground: "text-(--color-successForeground)",
  warning: "text-(--color-warning)",
  warningHover: "text-(--color-warningHover)",
  warningForeground: "text-(--color-warningForeground)",
  danger: "text-(--color-danger)",
  dangerHover: "text-(--color-dangerHover)",
  dangerForeground: "text-(--color-dangerForeground)",
  info: "text-(--color-info)",
  infoHover: "text-(--color-infoHover)",
  infoForeground: "text-(--color-infoForeground)",
  disabled: "text-(--color-disabled)",
  disabledText: "text-(--color-disabledText)",
  current: "text-current",
};

export const textVariantDefinitions: Readonly<Record<TextVariant, TextVariantDefinition>> = {
  display: {
    size: "5xl",
    weight: "regular",
    lineHeight: "tight",
    fontFamily: "notch",
  },
  h1: {
    size: "5xl",
    weight: "medium",
    lineHeight: "tight",
    fontFamily: "headline",
  },
  h1Subheading: {
    size: "4xl",
    weight: "regular",
    lineHeight: "tight",
    fontFamily: "headline",
  },
  h2: {
    size: "4xl",
    weight: "medium",
    lineHeight: "tight",
    fontFamily: "headline",
  },
  h2Subheading: {
    size: "3xl",
    weight: "regular",
    lineHeight: "tight",
    fontFamily: "headline",
  },
  h3: {
    size: "3xl",
    weight: "medium",
    lineHeight: "snug",
    fontFamily: "headline",
  },
  h3Subheading: {
    size: "2xl",
    weight: "regular",
    lineHeight: "snug",
    fontFamily: "headline",
  },
  h4: {
    size: "2xl",
    weight: "medium",
    lineHeight: "snug",
    fontFamily: "notch",
  },
  h4Subheading: {
    size: "xl",
    weight: "regular",
    lineHeight: "snug",
    fontFamily: "notch",
  },
  h5: {
    size: "xl",
    weight: "medium",
    lineHeight: "normal",
    fontFamily: "notch",
  },
  h5Subheading: {
    size: "lg",
    weight: "regular",
    lineHeight: "normal",
    fontFamily: "notch",
  },
  body: {
    size: "md",
    weight: "regular",
    lineHeight: "relaxed",
    fontFamily: "text",
  },
  bodySm: {
    size: "sm",
    weight: "regular",
    lineHeight: "relaxed",
    fontFamily: "text",
  },
  label: {
    size: "sm",
    weight: "medium",
    lineHeight: "normal",
    fontFamily: "text",
  },
  caption: {
    size: "xs",
    weight: "regular",
    lineHeight: "normal",
    fontFamily: "text",
  },
};

export type TextProps = Readonly<{
  children: ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  size?: TextSize;
  weight?: TextWeight;
  lineHeight?: TextLineHeight;
  fontFamily?: TextFontFamily;
  className?: string;
}> & Omit<RNTextProps, "children">;

export function Text({
  children,
  variant = "body",
  color = "text",
  size,
  weight,
  lineHeight,
  fontFamily,
  className,
  style,
  ...props
}: TextProps) {
  const definition = textVariantDefinitions[variant];

  const resolvedSize = size ?? definition.size;
  const resolvedColor = color;
  const resolvedWeight = weight ?? definition.weight;
  const resolvedLineHeight = lineHeight ?? definition.lineHeight;
  const resolvedFontFamily = fontFamily ?? definition.fontFamily;

  const textClassName = [
    textColorClassNames[resolvedColor],
    textSizeClassNames[resolvedSize],
    variant === "display" ? "text-[clamp(6.25rem,10vw,10rem)]" : "",
    textWeightClassNames[resolvedWeight],
    lineHeightClassNames[resolvedLineHeight],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textStyle: TextStyle = {
    fontFamily: fontFamilyValues[resolvedFontFamily],
    ...(style as TextStyle),
  };

  return (
    <RNText
      style={withClassName(textClassName, textStyle) as TextStyle}
      {...props}
    >
      {children}
    </RNText>
  );
}