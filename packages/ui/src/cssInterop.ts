"use client";

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

  const cssStyle = { $$css: true as const, [className]: className };

  if (!style) return cssStyle;
  if (Array.isArray(style)) return [...style, cssStyle];
  return [style, cssStyle];
}
