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
  xs: "mb-text-size-xs",
  sm: "mb-text-size-sm",
  md: "mb-text-size-md",
  lg: "mb-text-size-lg",
  xl: "mb-text-size-xl",
  "2xl": "mb-text-size-2xl",
  "3xl": "mb-text-size-3xl",
  "4xl": "mb-text-size-4xl",
  "5xl": "mb-text-size-5xl",
};

const textWeightClassNames: Readonly<Record<TextWeight, string>> = {
  regular: "mb-text-weight-regular",
  medium: "mb-text-weight-medium",
  semibold: "mb-text-weight-semibold",
  bold: "mb-text-weight-bold",
  extrabold: "mb-text-weight-extrabold",
};

const lineHeightClassNames: Readonly<Record<TextLineHeight, string>> = {
  tight: "mb-text-line-height-tight",
  snug: "mb-text-line-height-snug",
  normal: "mb-text-line-height-normal",
  relaxed: "mb-text-line-height-relaxed",
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
  background: "mb-text-color-background",
  backgroundAccent: "mb-text-color-backgroundAccent",
  surface: "mb-text-color-surface",
  surfaceAccent: "mb-text-color-surfaceAccent",
  primary: "mb-text-color-primary",
  primaryHover: "mb-text-color-primaryHover",
  primaryForeground: "mb-text-color-primaryForeground",
  secondary: "mb-text-color-secondary",
  secondaryHover: "mb-text-color-secondaryHover",
  secondaryForeground: "mb-text-color-secondaryForeground",
  text: "mb-text-color-text",
  textMuted: "mb-text-color-textMuted",
  muted: "mb-text-color-muted",
  border: "mb-text-color-border",
  borderStrong: "mb-text-color-borderStrong",
  success: "mb-text-color-success",
  successHover: "mb-text-color-successHover",
  successForeground: "mb-text-color-successForeground",
  warning: "mb-text-color-warning",
  warningHover: "mb-text-color-warningHover",
  warningForeground: "mb-text-color-warningForeground",
  danger: "mb-text-color-danger",
  dangerHover: "mb-text-color-dangerHover",
  dangerForeground: "mb-text-color-dangerForeground",
  info: "mb-text-color-info",
  infoHover: "mb-text-color-infoHover",
  infoForeground: "mb-text-color-infoForeground",
  disabled: "mb-text-color-disabled",
  disabledText: "mb-text-color-disabledText",
  current: "mb-text-color-current",
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
    inline ? "mb-text--inline" : "mb-text--block",
    textColorClassNames[resolvedColor],
    textSizeClassNames[resolvedSize],
    variant === "display" ? "mb-text-size-display" : "",
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