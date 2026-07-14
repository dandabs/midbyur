"use client";

import { View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { FooterText } from "../FooterText/FooterText";

export type FooterProps = Readonly<{
  className?: string;
}> & Omit<ViewProps, "children">;

export function Footer({ className, style, ...props }: FooterProps) {
  return (
    <View
      style={withClassName(["w-full bg-black text-white", className].filter(Boolean).join(" "), style as ViewStyle) as ViewStyle}
      {...props}
    >
      <View style={withClassName("flex w-full flex-row") as ViewStyle}>
        <View style={withClassName("w-1/2 p-6") as ViewStyle}>
          <FooterText />
        </View>
        <View style={withClassName("w-1/2") as ViewStyle} />
      </View>
    </View>
  );
}