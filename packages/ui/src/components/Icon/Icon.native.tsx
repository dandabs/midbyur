"use client";

import { themeModes } from "@midbyur/theme";
import type { ComponentType } from "react";
import { useMidbyurTheme } from "../../provider";
import type { TextColor } from "../Text/Text";

export type NativeLucideIcon = ComponentType<{
  color?: string;
  size?: string | number;
  strokeWidth?: number;
}>;

export type IconProps = Readonly<{
  icon: NativeLucideIcon;
  color?: TextColor;
  size?: number;
  strokeWidth?: number;
}>;

function resolveIconColor(color: TextColor, theme: keyof typeof themeModes): string {
  const colors = themeModes[theme] ?? themeModes.light;

  switch (color) {
    case "current":
      return colors.text;
    case "muted":
      return colors.textMuted;
    case "border":
      return colors.border;
    case "borderStrong":
      return colors.borderStrong;
    case "disabled":
      return colors.disabled;
    case "disabledText":
      return colors.disabledText;
    default:
      return (colors as Readonly<Record<string, string>>)[color] ?? colors.text;
  }
}

/**
 * lucide-react's icon components (used by `Icon.tsx`, the web/Storybook build) render DOM
 * `<svg>` elements — unusable on native. This platform file (Metro/tsc prefer `Icon.native.tsx`
 * over `Icon.tsx` for iOS/Android) just renders whatever component it's given directly, with a
 * resolved (non-CSS-variable) color — there is no icon-name lookup/guessing here. Callers on
 * native must pass an icon component from `lucide-react-native` (react-native-svg based), not
 * `lucide-react` — an earlier version of this file tried to map from a `lucide-react` component
 * to its `lucide-react-native` equivalent by name, which was fragile and broke in practice.
 */
export function Icon({ icon: IconComponent, color = "text", size = 20, strokeWidth = 2 }: IconProps) {
  const theme = useMidbyurTheme();
  const resolvedColor = resolveIconColor(color, theme);

  return <IconComponent color={resolvedColor} size={size} strokeWidth={strokeWidth} />;
}
