"use client";

import { createElement, type CSSProperties, type ReactNode } from "react";
import { themeModes, type ThemeMode } from "@midbyur/theme";

type ThemeCssVariables = Readonly<Record<`--color-${string}`, string>>;

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

export function MidbyurProvider({
  theme = "light",
  children,
}: Readonly<{
  theme?: ThemeMode;
  children: ReactNode;
}>) {
  return createElement(
    "div",
    {
      "data-theme": theme,
      className: "bg-(--color-background) text-(--color-text)",
      style: buildThemeVariables(theme) as CSSProperties,
    },
    children,
  );
}
