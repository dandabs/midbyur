"use client";

import { Platform } from "react-native";
import * as nativeStylesheetModule from "react-native-css-interop/dist/runtime/native/stylesheet";

type NativeThemeVariables = Readonly<Record<string, string>>;
type GetGlobalStyleFn = (className: string) => object | object[] | undefined;
type NativeStylesheetModule = {
  getGlobalStyle?: GetGlobalStyleFn;
  default?: {
    getGlobalStyle?: GetGlobalStyleFn;
  };
};

let nativeThemeVariables: NativeThemeVariables = {};
let nativeTextScale = 1;

const getGlobalStyle =
  (
    (nativeStylesheetModule as unknown as NativeStylesheetModule).getGlobalStyle ??
    (nativeStylesheetModule as unknown as NativeStylesheetModule).default?.getGlobalStyle
  ) ??
  (() => undefined);

export function setNativeThemeVariables(variables: NativeThemeVariables): void {
  nativeThemeVariables = variables;
}

export function setNativeTextScale(scale: number): void {
  nativeTextScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
}

function isRuntimeVarNode(value: unknown): value is {
  type: "runtime";
  name: "var";
  arguments: [string, unknown?];
} {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { type?: unknown }).type === "runtime" &&
    (value as { name?: unknown }).name === "var" &&
    Array.isArray((value as { arguments?: unknown }).arguments)
  );
}

function resolveRuntimeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(resolveRuntimeValue);
  }

  if (isRuntimeVarNode(value)) {
    const [variableName, fallback] = value.arguments;
    return nativeThemeVariables[variableName] ?? fallback ?? undefined;
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nested]) => {
        const resolvedNested = resolveRuntimeValue(nested);

        if (
          (key === "fontSize" || key === "lineHeight" || key === "letterSpacing") &&
          typeof resolvedNested === "number"
        ) {
          return [key, resolvedNested * nativeTextScale];
        }

        return [key, resolvedNested];
      }),
    );
  }

  return value;
}

function resolveNativeStyleForClass(name: string): object | object[] | undefined {
  const directStyle = getGlobalStyle(name);
  if (directStyle) return resolveRuntimeValue(directStyle) as object | object[];

  const arbitraryVarMatch = /^(bg|text|border|outline)-\[var\((--color-[^)]+)\)\]$/.exec(name);
  if (arbitraryVarMatch) {
    const [, prefix, token] = arbitraryVarMatch;
    const fallbackStyle = getGlobalStyle(`${prefix}-(${token})`);
    return fallbackStyle ? (resolveRuntimeValue(fallbackStyle) as object | object[]) : undefined;
  }

  const parenthesisMatch = /^(bg|text|border|outline)-\((--color-[^)]+)\)$/.exec(name);
  if (parenthesisMatch) {
    const [, prefix, token] = parenthesisMatch;
    const fallbackStyle = getGlobalStyle(`${prefix}-[var(${token})]`);
    return fallbackStyle ? (resolveRuntimeValue(fallbackStyle) as object | object[]) : undefined;
  }

  return undefined;
}

/**
 * Converts a className string into a react-native-web $$css style object and
 * merges it with an optional existing style. react-native-web recognises
 * { $$css: true, [classes]: classes } as literal CSS class names and attaches
 * them to the DOM element, which lets Tailwind utility classes apply normally.
 */
export function withClassName(
  className: string | undefined,
  style?: object | object[] | null,
): object | object[] | undefined {
  if (!className) return style ?? undefined;

  const classNames = className.split(/\s+/).filter(Boolean);

  if (Platform.OS !== "web") {
    const staticClassNames = classNames.filter(
      (name) =>
        !name.startsWith("transition-") &&
        !name.startsWith("duration-") &&
        !name.startsWith("ease-") &&
        !name.startsWith("animate-") &&
        !name.startsWith("motion-")
    );

    const nativeClassStyles = staticClassNames
      .flatMap((name) => {
        const globalStyle = resolveNativeStyleForClass(name);
        if (!globalStyle) return [];
        return Array.isArray(globalStyle) ? globalStyle.filter(Boolean) : [globalStyle];
      })
      .filter(Boolean);

    if (!nativeClassStyles.length) return style ?? undefined;

    if (!style) {
      return nativeClassStyles.length === 1 ? nativeClassStyles[0] : nativeClassStyles;
    }

    if (Array.isArray(style)) {
      return [...nativeClassStyles, ...style];
    }

    return [...nativeClassStyles, style];
  }

  const cssStyle = {
    $$css: true as const,
    ...Object.fromEntries(classNames.map((name) => [name, name] as const)),
  };

  if (!style) return cssStyle;
  if (Array.isArray(style)) return [...style, cssStyle];
  return [style, cssStyle];
}
