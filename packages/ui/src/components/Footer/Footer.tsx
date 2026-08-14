"use client";

import { Pressable, View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { Container } from "../Container/Container";
import { FooterText } from "../FooterText/FooterText";
import { Text } from "../Text/Text";

export type FooterLink = Readonly<{
  title: string;
  href: string;
}>;

export type FooterProps = Readonly<{
  links?: FooterLink[];
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

export function Footer({ links, className, style, ...props }: FooterProps) {
  const hasLinks = Boolean(links && links.length > 0);

  return (
    <View
      style={withClassName(["mb-footer", className].filter(Boolean).join(" "), style as ViewStyle) as ViewStyle}
      {...props}
    >
      <Container>
        <View style={withClassName("mb-footer__layout") as ViewStyle}>
          {hasLinks ? (
            <View style={withClassName("mb-footer__links") as ViewStyle}>
              {links!.map((link) => (
                <Pressable
                  key={`${link.href}-${link.title}`}
                  accessibilityRole="link"
                  onPress={() => navigateToHref(link.href)}
                >
                  <Text variant="bodySm" color="current" className="mb-footer-text__link">
                    {link.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}

          <View style={withClassName("mb-footer__content") as ViewStyle}>
            <FooterText />
          </View>

          {hasLinks ? null : <View style={withClassName("mb-footer__spacer") as ViewStyle} />}
        </View>
      </Container>
    </View>
  );
}
