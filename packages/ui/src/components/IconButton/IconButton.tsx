"use client";

import { Pressable, type PressableProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { Icon, type IconProps } from "../Icon/Icon";

export type IconButtonProps = Readonly<{
  icon: IconProps["icon"];
  color?: IconProps["color"];
  size?: IconProps["size"];
  strokeWidth?: IconProps["strokeWidth"];
  onPress: NonNullable<PressableProps["onPress"]>;
}> & Omit<PressableProps, "children" | "onPress">;

export function IconButton({
  icon,
  color = "text",
  size = 20,
  strokeWidth = 2,
  onPress,
  className,
  style,
  ...props
}: IconButtonProps) {
  const rootClassName = [
    "inline-flex items-center justify-center rounded-none transition-colors duration-150",
    "cursor-pointer enabled:hover:bg-white/10",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-borderStrong)",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      {...props}
    >
      <Icon
        icon={icon}
        color={color}
        size={size}
        strokeWidth={strokeWidth}
      />
    </Pressable>
  );
}
