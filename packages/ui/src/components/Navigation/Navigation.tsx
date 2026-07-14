"use client";

import { Pressable, View, type ViewProps, type ViewStyle } from "react-native";
import { Text, type TextColor } from "../Text/Text";
import { withClassName } from "../../cssInterop";

export type NavigationItem = Readonly<{
  title: string;
  href: string;
  active?: boolean;
}>;

export type NavigationProps = Readonly<{
  items: NavigationItem[];
  color?: TextColor;
  gap?: number | string;
}> & Omit<ViewProps, "children">;

function resolveGapValue(gap: number | string): string {
  return typeof gap === "number" ? `${gap}px` : gap;
}

export function Navigation({
  items,
  color = "text",
  gap = 16,
  className,
  style,
  ...props
}: NavigationProps) {
  const rootClassName = ["w-full", className].filter(Boolean).join(" ");

  const listStyle: ViewStyle = {
    gap: resolveGapValue(gap),
  };

  return (
    <View
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      {...props}
    >
      <View
        style={withClassName("flex w-full flex-row items-center", listStyle) as ViewStyle}
      >
        {items.map((item) => (
          <View key={`${item.href}-${item.title}`}>
            <Pressable
              accessibilityRole="link"
              accessibilityState={{ selected: item.active }}
              style={withClassName([
                "inline-flex items-center justify-center rounded-none px-0 py-0 transition-colors duration-150",
                item.active ? "underline decoration-2 underline-offset-4" : "hover:underline hover:decoration-2 hover:underline-offset-4",
              ].join(" ")) as ViewStyle}
            >
              <Text
                variant="body"
                color={color}
                className="text-current"
              >
                {item.title}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
