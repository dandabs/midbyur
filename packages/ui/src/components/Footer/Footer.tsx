"use client";

import { View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { Container } from "../Container/Container";
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
      <Container>
        <View style={withClassName("flex w-full flex-col sm:flex-row") as ViewStyle}>
          <View style={withClassName("w-full py-6 sm:w-1/2") as ViewStyle}>
            <FooterText />
          </View>
          <View style={withClassName("hidden sm:block sm:w-1/2") as ViewStyle} />
        </View>
      </Container>
    </View>
  );
}