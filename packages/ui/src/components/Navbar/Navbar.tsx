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
}> & Omit<ViewProps, "children">;

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
      ref={(node) => {
        rootRef.current = node as HTMLElement | null;
      }}
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      {...props}
    >
      <Container>
        <View style={withClassName("flex w-full flex-row items-center gap-6 py-4") as ViewStyle}>
          <Text variant="h5Subheading" className="text-white">
            {brand}
          </Text>

          <View style={withClassName("ml-auto hidden md:flex flex-row items-center gap-4") as ViewStyle}>
            <Navigation
              items={links}
              gap={linksGap}
              color="current"
              fullWidth={false}
              className="text-white"
            />

            <IconButton
              icon={theme === "dark" ? Sun : Moon}
              color="current"
              size={18}
              strokeWidth={2}
              onPress={handleThemeToggle}
              className="text-white"
              accessibilityLabel={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            />
          </View>

          <View style={withClassName("ml-auto md:hidden flex flex-row items-center gap-2") as ViewStyle}>
            <IconButton
              icon={theme === "dark" ? Sun : Moon}
              color="current"
              size={18}
              strokeWidth={2}
              onPress={handleThemeToggle}
              className="text-white"
              accessibilityLabel={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            />

            <IconButton
              icon={isMenuOpen ? X : Menu}
              color="current"
              size={24}
              strokeWidth={2}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
              accessibilityLabel={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </View>
        </View>

        {isMenuOpen && (
          <View
            style={withClassName(
              "flex md:hidden flex-col border-t border-white/15 bg-black/45 backdrop-blur-xl",
            ) as ViewStyle}
          >
            <View style={withClassName("flex flex-col py-4 px-0") as ViewStyle}>
              {links.map((item) => (
                <Pressable
                  key={`${item.href}-${item.title}`}
                  accessibilityRole="link"
                  accessibilityState={{ selected: item.active }}
                  onPress={() => {
                    setIsMenuOpen(false);
                    if (typeof window !== "undefined") {
                      window.location.href = item.href;
                    }
                  }}
                  style={withClassName(
                    "flex px-6 py-3 transition-colors duration-150 hover:bg-white/10",
                  ) as ViewStyle}
                >
                  <Text
                    variant="body"
                    color="current"
                    className="text-white"
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
