"use client";

import { Pressable, View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { Container } from "../Container/Container";
import { Text } from "../Text/Text";

export type RootNavbarLink = Readonly<{
  title: string;
  href: string;
}>;

// Shared across every Miðbýur-built site — keep this list in sync network-wide.
const ROOT_NAVBAR_BRAND = "dan adams";

const ROOT_NAVBAR_LINKS: readonly RootNavbarLink[] = [
  { title: "Portfolio/CV", href: "https://dsk.is" },
  { title: "Personal", href: "https://dandabs.io" },
  { title: "Planning Poker", href: "https://poker.dsk.is" },
  { title: "Tengsli", href: "https://tengsli.is" },
  { title: "Veginn", href: "https://veginn.is" },
  { title: "Umferðarmerki", href: "https://d12vru5q1xiug5.cloudfront.net" },
  { title: "Miðbýur UI", href: "https://midbyur.dsk.is" }
];

export type RootNavbarProps = Readonly<{
  showBrand?: boolean;
  className?: string;
}> & Omit<ViewProps, "children">;

function navigateToHref(href: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.location.href = href;
}

export function RootNavbar({
  showBrand = false,
  className,
  style,
  ...props
}: RootNavbarProps) {
  const rootClassName = ["mb-root-navbar", className].filter(Boolean).join(" ");

  return (
    <View
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      {...props}
    >
      <Container>
        <View style={withClassName("mb-root-navbar__row") as ViewStyle}>
          {showBrand ? (
            <Text variant="caption" className="mb-root-navbar__brand">
              {ROOT_NAVBAR_BRAND}
            </Text>
          ) : (
            <View />
          )}

          <View style={withClassName("mb-root-navbar__links") as ViewStyle}>
            {ROOT_NAVBAR_LINKS.map((link) => (
              <Pressable
                key={`${link.href}-${link.title}`}
                accessibilityRole="link"
                onPress={() => navigateToHref(link.href)}
              >
                <Text variant="caption" className="mb-root-navbar__link">
                  {link.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Container>
    </View>
  );
}
