"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Pressable, View, type ViewProps, type ViewStyle } from "react-native";
import { themeModes, type ThemeMode } from "@midbyur/theme";
import { withClassName } from "../../cssInterop";
import type { GapValue } from "../../spacing";
import { Container } from "../Container/Container";
import { IconButton } from "../IconButton/IconButton";
import { Navigation, type NavigationItem } from "../Navigation/Navigation";
import { Text } from "../Text/Text";

export type NavbarProps = Readonly<{
  brand: string;
  links: NavigationItem[];
  linksGap?: GapValue;
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

function hasScrolledPastFirstViewportHeight(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.scrollY > window.innerHeight;
}

function getThemeRoot(element: HTMLElement | null): HTMLElement | null {
  if (element) {
    const closestThemeRoot = element.closest("[data-theme]");
    if (closestThemeRoot instanceof HTMLElement) {
      return closestThemeRoot;
    }
  }

  const firstThemeRoot = document.querySelector("[data-theme]");
  return firstThemeRoot instanceof HTMLElement ? firstThemeRoot : null;
}

function applyThemeToRoot(themeRoot: HTMLElement, theme: ThemeMode) {
  const colors = themeModes[theme];

  themeRoot.dataset.theme = theme;
  themeRoot.style.setProperty("--color-background", colors.background);
  themeRoot.style.setProperty("--color-backgroundAccent", colors.backgroundAccent);
  themeRoot.style.setProperty("--color-surface", colors.surface);
  themeRoot.style.setProperty("--color-surfaceAccent", colors.surfaceAccent);
  themeRoot.style.setProperty("--color-primary", colors.primary);
  themeRoot.style.setProperty("--color-primaryHover", colors.primaryHover);
  themeRoot.style.setProperty("--color-primaryForeground", colors.primaryForeground);
  themeRoot.style.setProperty("--color-secondary", colors.secondary);
  themeRoot.style.setProperty("--color-secondaryHover", colors.secondaryHover);
  themeRoot.style.setProperty("--color-secondaryForeground", colors.secondaryForeground);
  themeRoot.style.setProperty("--color-text", colors.text);
  themeRoot.style.setProperty("--color-textMuted", colors.textMuted);
  themeRoot.style.setProperty("--color-border", colors.border);
  themeRoot.style.setProperty("--color-borderStrong", colors.borderStrong);
  themeRoot.style.setProperty("--color-success", colors.success);
  themeRoot.style.setProperty("--color-successHover", colors.successHover);
  themeRoot.style.setProperty("--color-successForeground", colors.successForeground);
  themeRoot.style.setProperty("--color-warning", colors.warning);
  themeRoot.style.setProperty("--color-warningHover", colors.warningHover);
  themeRoot.style.setProperty("--color-warningForeground", colors.warningForeground);
  themeRoot.style.setProperty("--color-danger", colors.danger);
  themeRoot.style.setProperty("--color-dangerHover", colors.dangerHover);
  themeRoot.style.setProperty("--color-dangerForeground", colors.dangerForeground);
  themeRoot.style.setProperty("--color-info", colors.info);
  themeRoot.style.setProperty("--color-infoHover", colors.infoHover);
  themeRoot.style.setProperty("--color-infoForeground", colors.infoForeground);
  themeRoot.style.setProperty("--color-disabled", colors.disabled);
  themeRoot.style.setProperty("--color-disabledText", colors.disabledText);
}

export function Navbar({
  brand,
  links,
  linksGap = 20,
  className,
  style,
  ...props
}: NavbarProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isPastFirstViewport, setIsPastFirstViewport] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const themeRoot = getThemeRoot(rootRef.current);
    if (!themeRoot) {
      return;
    }

    const currentTheme = themeRoot.dataset.theme === "dark" ? "dark" : "light";
    setTheme(currentTheme);
  }, []);

  const handleThemeToggle = () => {
    if (typeof window === "undefined") {
      return;
    }

    const themeRoot = getThemeRoot(rootRef.current);
    if (!themeRoot) {
      return;
    }

    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    applyThemeToRoot(themeRoot, nextTheme);
    setTheme(nextTheme);
  };

  const rootClassName = [
    "mb-navbar",
    isPastFirstViewport ? "mb-navbar--scrolled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <View
      ref={(node) => {
        rootRef.current = node as HTMLElement | null;
      }}
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      {...props}
    >
      <Container>
        <View style={withClassName("mb-navbar__row") as ViewStyle}>
          <Text variant="h5Subheading" className="mb-navbar__brand">
            {brand}
          </Text>

          <View style={withClassName("mb-navbar__desktop") as ViewStyle}>
            <Navigation
              items={links}
              gap={linksGap}
              color="current"
              fullWidth={false}
              className="mb-navbar__desktop"
            />

            <IconButton
              icon={theme === "dark" ? Sun : Moon}
              color="current"
              size={18}
              strokeWidth={2}
              onPress={handleThemeToggle}
              className="mb-navbar__desktop"
              accessibilityLabel={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            />
          </View>

          <View style={withClassName("mb-navbar__mobile") as ViewStyle}>
            <IconButton
              icon={theme === "dark" ? Sun : Moon}
              color="current"
              size={18}
              strokeWidth={2}
              onPress={handleThemeToggle}
              className="mb-navbar__mobile"
              accessibilityLabel={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            />

            <IconButton
              icon={isMenuOpen ? X : Menu}
              color="current"
              size={24}
              strokeWidth={2}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
              className="mb-navbar__mobile"
              accessibilityLabel={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </View>
        </View>

        {isMenuOpen && (
          <View
            style={withClassName(
              "mb-navbar__menu",
            ) as ViewStyle}
          >
            <View style={withClassName("mb-navbar__menu-links") as ViewStyle}>
              {links.map((item) => (
                <Pressable
                  key={`${item.href}-${item.title}`}
                  accessibilityRole="link"
                  accessibilityState={{ selected: item.active }}
                  onPress={() => {
                    setIsMenuOpen(false);
                    navigateToHref(item.href);
                  }}
                  style={withClassName(
                    "mb-navbar__menu-link",
                  ) as ViewStyle}
                >
                  <Text
                    variant="body"
                    color="current"
                    className="mb-navbar__mobile-link"
                  >
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </Container>
    </View>
  );
}
