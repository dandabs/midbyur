"use client";

import { Pressable, View, type ViewProps, type ViewStyle } from "react-native";
import { Text, type TextColor } from "../Text/Text";
import { withClassName } from "../../cssInterop";
import { resolveGapValue, type GapValue } from "../../spacing";

export type NavigationItem = Readonly<{
  title: string;
  href: string;
  active?: boolean;
}>;

export type NavigationProps = Readonly<{
  items: NavigationItem[];
  color?: TextColor;
  gap?: GapValue;
  fullWidth?: boolean;
  className?: string;
}> & Omit<ViewProps, "children">;

function navigateToHref(href: string) {
  if (typeof window === "undefined") {
    return;
  }

  if (href.startsWith("#")) {
    const sectionId = href.slice(1);
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", href);
      return;
    }
  }

  window.location.href = href;
}

export function Navigation({
  items,
  color = "text",
  gap = 16,
  fullWidth = true,
  className,
  style,
  ...props
}: NavigationProps) {
  const rootClassName = [fullWidth ? "mb-navigation" : "mb-navigation mb-navigation--auto", className]
    .filter(Boolean)
    .join(" ");

  const listStyle: ViewStyle = {
    gap: resolveGapValue(gap),
  };

  return (
    <View
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      {...props}
    >
      <View
        style={withClassName(
          fullWidth ? "mb-navigation__list" : "mb-navigation__list mb-navigation__list--auto",
          listStyle,
        ) as ViewStyle}
      >
        {items.map((item) => (
          <View key={`${item.href}-${item.title}`}>
            <Pressable
              accessibilityRole="link"
              accessibilityState={{ selected: item.active }}
              onPress={() => navigateToHref(item.href)}
              style={withClassName([
                "mb-navigation__link",
                item.active ? "mb-navigation__link--active" : "",
              ].join(" ")) as ViewStyle}
            >
              <Text
                variant="body"
                color={color}
                className="mb-text-color-current"
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
