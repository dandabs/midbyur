"use client";

import { useEffect, useState } from "react";
import { View, type ViewProps, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { Container } from "../Container/Container";
import { Navigation, type NavigationItem } from "../Navigation/Navigation";
import { Text } from "../Text/Text";

export type NavbarProps = Readonly<{
  brand: string;
  links: NavigationItem[];
  linksGap?: number | string;
}> & Omit<ViewProps, "children">;

function hasScrolledPastFirstViewportHeight(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.scrollY > window.innerHeight;
}

export function Navbar({
  brand,
  links,
  linksGap = 20,
  className,
  style,
  ...props
}: NavbarProps) {
  const [isPastFirstViewport, setIsPastFirstViewport] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateScrollState = () => {
      setIsPastFirstViewport(hasScrolledPastFirstViewportHeight());
    };

    updateScrollState();

    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const rootClassName = [
    "fixed top-0 left-0 z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-300",
    isPastFirstViewport
      ? "bg-black border-black"
      : "bg-black/45 border-white/15 backdrop-blur-xl supports-[backdrop-filter]:bg-black/35",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <View
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      {...props}
    >
      <Container>
        <View style={withClassName("flex w-full flex-row items-center gap-6 py-4") as ViewStyle}>
          <Text variant="h5Subheading" className="text-white">
            {brand}
          </Text>

          <View style={withClassName("ml-auto") as ViewStyle}>
            <Navigation
              items={links}
              gap={linksGap}
              color="current"
              className="w-auto text-white"
            />
          </View>
        </View>
      </Container>
    </View>
  );
}
