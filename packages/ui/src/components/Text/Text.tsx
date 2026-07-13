"use client";

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

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

export type TextVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "button"
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

export const textVariantDefinitions: Readonly<Record<TextVariant, TextVariantDefinition>> = {
  display: {
    size: "5xl",
    weight: "medium",
    lineHeight: "tight",
    fontFamily: "notch",
  },
  h1: {
    size: "5xl",
    weight: "medium",
    lineHeight: "tight",
    fontFamily: "headline",
  },
  h2: {
    size: "4xl",
    weight: "medium",
    lineHeight: "tight",
    fontFamily: "headline",
  },
  h3: {
    size: "3xl",
    weight: "medium",
    lineHeight: "snug",
    fontFamily: "headline",
  },
  h4: {
    size: "2xl",
    weight: "medium",
    lineHeight: "snug",
    fontFamily: "notch",
  },
  h5: {
    size: "xl",
    weight: "medium",
    lineHeight: "normal",
    fontFamily: "notch",
  },
  button: {
    size: "sm",
    weight: "medium",
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

const variantElementTagMap: Readonly<Record<TextVariant, ElementType>> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  button: "span",
  body: "p",
  bodySm: "p",
  label: "label",
  caption: "small",
};

export type TextProps = Readonly<{
  children: ReactNode;
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  lineHeight?: TextLineHeight;
  fontFamily?: TextFontFamily;
  as?: ElementType;
}> & Omit<HTMLAttributes<HTMLElement>, "children">;

export function Text({
  children,
  variant = "body",
  size,
  weight,
  lineHeight,
  fontFamily,
  as,
  className,
  style,
  ...props
}: TextProps) {
  const definition = textVariantDefinitions[variant];

  const resolvedSize = size ?? definition.size;
  const resolvedWeight = weight ?? definition.weight;
  const resolvedLineHeight = lineHeight ?? definition.lineHeight;
  const resolvedFontFamily = fontFamily ?? definition.fontFamily;

  const Component = (as ?? variantElementTagMap[variant]) as ElementType;

  const textClassName = [
    "text-(--color-text)",
    textSizeClassNames[resolvedSize],
    variant === "display" ? "text-[clamp(3.25rem,9vw,7rem)]" : "",
    textWeightClassNames[resolvedWeight],
    lineHeightClassNames[resolvedLineHeight],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textStyle: CSSProperties = {
    fontFamily: fontFamilyValues[resolvedFontFamily],
    ...style,
  };

  return (
    <Component
      className={textClassName}
      style={textStyle}
      {...props}
    >
      {children}
    </Component>
  );
}