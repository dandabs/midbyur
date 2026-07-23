"use client";

import { createContext, createElement, useContext, type CSSProperties, type ReactNode } from "react";
import { Platform, View, useColorScheme } from "react-native";
import * as nativeRemModule from "react-native-css-interop/dist/runtime/native/rem";
import * as nativeVariablesModule from "react-native-css-interop/dist/runtime/native/variables";
import { themeModes, type ThemeMode } from "@midbyur/theme";
import type { ToastProviderProps } from "./components/ToastProvider/ToastProvider";
import { ToastProvider } from "./components/ToastProvider/ToastProvider";
import { setNativeTextScale, setNativeThemeVariables } from "./cssInterop";

const NATIVE_BASE_REM = 15;
const NATIVE_TEXT_SCALE = 1.08;

type NativeRem = {
  get(): number;
  set(nextValue: number): void;
};

type NativeRemModule = {
  rem?: NativeRem;
  default?: {
    rem?: NativeRem;
  };
};

type NativeVars = (variables: Readonly<Record<string, string>>) => object;

type NativeVarsModule = {
  vars?: NativeVars;
  default?: {
    vars?: NativeVars;
  };
};

const nativeRem =
  ((nativeRemModule as unknown as NativeRemModule).rem ??
    (nativeRemModule as unknown as NativeRemModule).default?.rem) ?? {
    get: () => 16,
    set: () => {
      // No-op fallback for environments where native rem interop module is unavailable.
    },
  };

const nativeVars =
  ((nativeVariablesModule as unknown as NativeVarsModule).vars ??
    (nativeVariablesModule as unknown as NativeVarsModule).default?.vars) ??
  (() => ({}));

type ThemeCssVariables = Readonly<Record<`--color-${string}`, string>>;

const MidbyurThemeContext = createContext<ThemeMode>("light");

function buildThemeVariables(theme: ThemeMode): ThemeCssVariables {
  const colors = themeModes[theme];

  return {
    "--color-background": colors.background,
    "--color-backgroundAccent": colors.backgroundAccent,
    "--color-surface": colors.surface,
    "--color-surfaceAccent": colors.surfaceAccent,
    "--color-primary": colors.primary,
    "--color-primaryHover": colors.primaryHover,
    "--color-primaryForeground": colors.primaryForeground,
    "--color-secondary": colors.secondary,
    "--color-secondaryHover": colors.secondaryHover,
    "--color-secondaryForeground": colors.secondaryForeground,
    "--color-text": colors.text,
    "--color-textMuted": colors.textMuted,
    "--color-border": colors.border,
    "--color-borderStrong": colors.borderStrong,
    "--color-success": colors.success,
    "--color-successHover": colors.successHover,
    "--color-successForeground": colors.successForeground,
    "--color-warning": colors.warning,
    "--color-warningHover": colors.warningHover,
    "--color-warningForeground": colors.warningForeground,
    "--color-danger": colors.danger,
    "--color-dangerHover": colors.dangerHover,
    "--color-dangerForeground": colors.dangerForeground,
    "--color-info": colors.info,
    "--color-infoHover": colors.infoHover,
    "--color-infoForeground": colors.infoForeground,
    "--color-disabled": colors.disabled,
    "--color-disabledText": colors.disabledText,
  };
}

export type MidbyurProviderProps = Readonly<{
  theme?: ThemeMode;
  children: ReactNode;
  toastConfig?: ToastProviderProps["config"];
}>;

export function useMidbyurTheme(): ThemeMode {
  return useContext(MidbyurThemeContext);
}

export function MidbyurProvider({
  theme,
  children,
  toastConfig,
}: MidbyurProviderProps) {
  const systemColorScheme = useColorScheme();
  const resolvedTheme: ThemeMode =
    theme ?? (Platform.OS !== "web" && systemColorScheme === "dark" ? "dark" : "light");

  if (Platform.OS !== "web") {
    // Slightly increase native rem baseline so em/rem-sized UI tokens render larger on mobile.
    nativeRem.set(NATIVE_BASE_REM);
    setNativeTextScale(NATIVE_TEXT_SCALE);

    const themeVariables = buildThemeVariables(resolvedTheme);
    setNativeThemeVariables(themeVariables);

    return createElement(
      MidbyurThemeContext.Provider,
      { value: resolvedTheme },
      createElement(
        View,
        { style: [{ flex: 1 }, nativeVars(themeVariables)] },
        children,
      ),
    );
  }

  return createElement(
    MidbyurThemeContext.Provider,
    { value: resolvedTheme },
    createElement(
      "div",
      {
        "data-theme": resolvedTheme,
        className: "bg-[var(--color-background)] text-[var(--color-text)]",
        style: buildThemeVariables(resolvedTheme) as CSSProperties,
      },
      createElement(ToastProvider, { config: toastConfig, children }),
    ),
  );
}
