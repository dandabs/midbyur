"use client";

import type { ReactNode } from "react";
import { Platform, Text as RNText, type TextProps as RNTextProps, type TextStyle } from "react-native";
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

const nativeMonoFontFamily = Platform.OS === "ios" ? "Menlo" : "monospace";

const fontFamilyValues: Readonly<Record<TextFontFamily, string>> = {
  text: Platform.OS === "web" ? '"Stack Sans Text", ui-sans-serif, system-ui, sans-serif' : "Stack Sans Text",
  notch: Platform.OS === "web" ? '"Stack Sans Notch", ui-sans-serif, system-ui, sans-serif' : "Stack Sans Notch",
  headline:
    Platform.OS === "web" ? '"Stack Sans Headline", ui-sans-serif, system-ui, sans-serif' : "Stack Sans Headline",
  mono:
    Platform.OS === "web"
      ? 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
      : nativeMonoFontFamily,
};

const textColorClassNames: Readonly<Record<TextColor, string>> = {
  background: "text-[var(--color-background)]",
  backgroundAccent: "text-[var(--color-backgroundAccent)]",
  surface: "text-[var(--color-surface)]",
  surfaceAccent: "text-[var(--color-surfaceAccent)]",
  primary: "text-[var(--color-primary)]",
  primaryHover: "text-[var(--color-primaryHover)]",
  primaryForeground: "text-[var(--color-primaryForeground)]",
  secondary: "text-[var(--color-secondary)]",
  secondaryHover: "text-[var(--color-secondaryHover)]",
  secondaryForeground: "text-[var(--color-secondaryForeground)]",
  text: "text-[var(--color-text)]",
  textMuted: "text-[var(--color-textMuted)]",
  muted: "text-[var(--color-textMuted)]",
  border: "text-[var(--color-border)]",
  borderStrong: "text-[var(--color-borderStrong)]",
  success: "text-[var(--color-success)]",
  successHover: "text-[var(--color-successHover)]",
  successForeground: "text-[var(--color-successForeground)]",
  warning: "text-[var(--color-warning)]",
  warningHover: "text-[var(--color-warningHover)]",
  warningForeground: "text-[var(--color-warningForeground)]",
  danger: "text-[var(--color-danger)]",
  dangerHover: "text-[var(--color-dangerHover)]",
  dangerForeground: "text-[var(--color-dangerForeground)]",
  info: "text-[var(--color-info)]",
  infoHover: "text-[var(--color-infoHover)]",
  infoForeground: "text-[var(--color-infoForeground)]",
  disabled: "text-[var(--color-disabled)]",
  disabledText: "text-[var(--color-disabledText)]",
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
  inline?: boolean;
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
  inline = false,
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
    inline ? "" : "block",
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