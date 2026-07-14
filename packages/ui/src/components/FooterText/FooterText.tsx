"use client";

import { View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { Text } from "../Text/Text";

export type FooterTextProps = Readonly<{
  className?: string;
}> & Omit<ViewProps, "children">;

export function FooterText({ className, style, ...props }: FooterTextProps) {
  const currentYear = new Date().getFullYear();

  return (
    <View
      style={withClassName(className ?? "", style as ViewStyle) as ViewStyle}
      {...props}
    >
      <Text variant="bodySm" color="current">
        © 2011-{currentYear} Daniel Adams. All rights reserved. Rekstur á Íslandi er starfræktur á kt. 050705-3660. Educatr® and the Educatr® logo are registered trademarks of dandabs, a limited company by guarantee registered in Northern Ireland (no. NI737161). Registered office: 103 BT42 4PP. Airline logos provided by{" "}
        <Text
          variant="bodySm"
          color="current"
          inline
          className="underline"
          accessibilityRole="link"
          onPress={() => {
            if (typeof window !== "undefined") {
              window.open("https://logostream.dev/", "_blank", "noopener,noreferrer");
            }
          }}
        >
          logostream.dev
        </Text>
        .
      </Text>
    </View>
  );
}