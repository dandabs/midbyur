export type ThemeMode = "light" | "dark";

export type ThemeColors = Readonly<{
  background: string;
  backgroundAccent: string;
  surface: string;
  surfaceAccent: string;
  primary: string;
  primaryHover: string;
  primaryForeground: string;
  secondary: string;
  secondaryHover: string;
  secondaryForeground: string;
  text: string;
  textMuted: string;
  border: string;
  borderStrong: string;
  success: string;
  successHover: string;
  successForeground: string;
  warning: string;
  warningHover: string;
  warningForeground: string;
  danger: string;
  dangerHover: string;
  dangerForeground: string;
  info: string;
  infoHover: string;
  infoForeground: string;
  disabled: string;
  disabledText: string;
}>;

export const themeModes: Readonly<Record<ThemeMode, ThemeColors>> = {
  light: {
    background: "#F7F7F7",
    backgroundAccent: "#EDEDED",
    surface: "#FFFFFF",
    surfaceAccent: "#F3F3F3",
    primary: "#1D4ED8",
    primaryHover: "#1E40AF",
    primaryForeground: "#FFFFFF",
    secondary: "#4B5563",
    secondaryHover: "#374151",
    secondaryForeground: "#FFFFFF",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#D1D5DB",
    borderStrong: "#4B5563",
    success: "#15803D",
    successHover: "#166534",
    successForeground: "#FFFFFF",
    warning: "#B45309",
    warningHover: "#92400E",
    warningForeground: "#FFFFFF",
    danger: "#B91C1C",
    dangerHover: "#991B1B",
    dangerForeground: "#FFFFFF",
    info: "#0369A1",
    infoHover: "#075985",
    infoForeground: "#FFFFFF",
    disabled: "#E5E7EB",
    disabledText: "#9CA3AF",
  },
  dark: {
    background: "#111111",
    backgroundAccent: "#1B1B1B",
    surface: "#1F1F1F",
    surfaceAccent: "#2B2B2B",
    primary: "#3B82F6",
    primaryHover: "#2563EB",
    primaryForeground: "#F8FAFC",
    secondary: "#6B7280",
    secondaryHover: "#9CA3AF",
    secondaryForeground: "#F8FAFC",
    text: "#F8FAFC",
    textMuted: "#94A3B8",
    border: "#374151",
    borderStrong: "#9CA3AF",
    success: "#22C55E",
    successHover: "#16A34A",
    successForeground: "#F8FAFC",
    warning: "#F59E0B",
    warningHover: "#D97706",
    warningForeground: "#111827",
    danger: "#F87171",
    dangerHover: "#EF4444",
    dangerForeground: "#111827",
    info: "#38BDF8",
    infoHover: "#0EA5E9",
    infoForeground: "#111827",
    disabled: "#374151",
    disabledText: "#9CA3AF",
  },
} as const;