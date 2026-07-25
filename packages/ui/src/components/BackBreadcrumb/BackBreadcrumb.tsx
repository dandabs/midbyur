"use client";

import { Pressable, type PressableProps } from "react-native";
import { Text } from "../Text/Text";

export type BackBreadcrumbProps = Readonly<{
  label: string;
  onPress: () => void;
}> &
  Omit<PressableProps, "onPress" | "children">;

export function BackBreadcrumb({ label, onPress, ...props }: BackBreadcrumbProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Back to ${label}`}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start" })}
      {...props}
    >
      <Text size="sm" color="primary" weight="medium">‹</Text>
      <Text size="sm" color="primary" weight="medium">{label}</Text>
    </Pressable>
  );
}
