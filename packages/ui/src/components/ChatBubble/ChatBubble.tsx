"use client";

import type { ReactNode } from "react";
import { View, type ViewProps, type ViewStyle } from "react-native";
import { Text } from "../Text/Text";
import { withClassName } from "../../cssInterop";

export type ChatBubbleVariant = "remote" | "local" | "system";

export type ChatBubbleProps = Readonly<{
  children: ReactNode;
  variant?: ChatBubbleVariant;
  className?: string;
}> & Omit<ViewProps, "children">;

export function ChatBubble({
  children,
  variant = "remote",
  className,
  style,
  ...props
}: ChatBubbleProps) {
  const rootClassName = [
    "mb-chat-bubble",
    `mb-chat-bubble--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textColor = resolveTextColor(variant);

  return (
    <View
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      {...props}
    >
      <Text size="sm" color={textColor}>
        {children}
      </Text>
    </View>
  );
}

function resolveTextColor(variant: ChatBubbleVariant): "primaryForeground" | "textMuted" | "text" {
  if (variant === "local") return "primaryForeground";
  if (variant === "system") return "textMuted";
  return "text";
}
