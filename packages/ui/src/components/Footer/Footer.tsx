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
      style={withClassName(["mb-footer", className].filter(Boolean).join(" "), style as ViewStyle) as ViewStyle}
      {...props}
    >
      <Container>
        <View style={withClassName("mb-footer__layout") as ViewStyle}>
          <View style={withClassName("mb-footer__content") as ViewStyle}>
            <FooterText />
          </View>
          <View style={withClassName("mb-footer__spacer") as ViewStyle} />
        </View>
      </Container>
    </View>
  );
}