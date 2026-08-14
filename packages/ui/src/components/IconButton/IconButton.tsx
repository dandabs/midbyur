"use client";

import { Pressable, type PressableProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { Icon, type IconProps } from "../Icon/Icon";
import { Spinner } from "../Spinner/Spinner";

export type IconButtonProps = Readonly<{
  icon: IconProps["icon"];
  color?: IconProps["color"];
  size?: IconProps["size"];
  strokeWidth?: IconProps["strokeWidth"];
  loading?: boolean;
  onPress: NonNullable<PressableProps["onPress"]>;
  className?: string;
}> & Omit<PressableProps, "children" | "onPress">;

export function IconButton({
  icon,
  color = "text",
  size = 20,
  strokeWidth = 2,
  loading = false,
  onPress,
  className,
  style,
  disabled,
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
      disabled={disabled || loading}
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      {...props}
    >
      {loading ? (
        <Spinner color={color} size="small" />
      ) : (
        <Icon
          icon={icon}
          color={color}
          size={size}
          strokeWidth={strokeWidth}
        />
      )}
    </Pressable>
  );
}
