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
  className?: string;
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
    "mb-icon-button",
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
