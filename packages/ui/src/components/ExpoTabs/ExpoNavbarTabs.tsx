"use client";

import type { ComponentProps, ComponentType, ReactNode } from "react";
import { Platform, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { Navbar } from "../Navbar/Navbar";
import { Text } from "../Text/Text";

type ExpoRouterUiModule = {
  Tabs: ComponentType<Readonly<{ children?: ReactNode; asChild?: boolean }>>;
  TabList: ComponentType<Readonly<{ children?: ReactNode; asChild?: boolean }>>;
  TabTrigger: ComponentType<
    Readonly<{
      name: string;
      href: string;
      asChild?: boolean;
      children?: ReactNode;
    }>
  >;
  TabSlot: ComponentType<Readonly<{ style?: ComponentProps<typeof View>["style"] }>>;
};

function getExpoRouterUiModule(): ExpoRouterUiModule | null {
  try {
    const runtimeRequire = (0, eval)("require") as ((id: string) => unknown);
    const moduleId = ["expo-router", "ui"].join("/");
    return runtimeRequire(moduleId) as ExpoRouterUiModule;
  } catch {
    return null;
  }
}

export type ExpoNavbarTabRoute = Readonly<{
  name: string;
  href: string;
  title: string;
}>;

export type ExpoNavbarTabsProps = Readonly<{
  brand: string;
  pathname: string;
  routes: ExpoNavbarTabRoute[];
  webContentTopPadding?: number;
}>;

export function ExpoNavbarTabs({
  brand,
  pathname,
  routes,
  webContentTopPadding = 84,
}: ExpoNavbarTabsProps) {
  const { height: viewportHeight } = useWindowDimensions();
  const expoRouterUi = getExpoRouterUiModule();

  if (!expoRouterUi) {
    return (
      <View style={[styles.appRoot, Platform.OS === "web" ? { minHeight: viewportHeight } : null]}>
        {Platform.OS === "web" ? (
          <Navbar
            brand={brand}
            links={routes.map((route) => ({
              title: route.title,
              href: route.href,
              active: pathname === route.href || pathname.startsWith(`${route.href}/`),
            }))}
            className="mb-expo-web-navbar"
          />
        ) : null}
        <View style={[styles.tabSlot, Platform.OS === "web" ? { paddingTop: webContentTopPadding } : null]} />
      </View>
    );
  }

  const Tabs = expoRouterUi.Tabs;
  const TabSlot = expoRouterUi.TabSlot;
  const TabList = expoRouterUi.TabList;
  const TabTrigger = expoRouterUi.TabTrigger;

  return (
    <View style={[styles.appRoot, Platform.OS === "web" ? { minHeight: viewportHeight } : null]}>
      <Tabs>
        {Platform.OS === "web" ? (
          <Navbar
            brand={brand}
            links={routes.map((route) => ({
              title: route.title,
              href: route.href,
              active: pathname === route.href || pathname.startsWith(`${route.href}/`),
            }))}
            className="mb-expo-web-navbar"
          />
        ) : null}

        <TabSlot style={[styles.tabSlot, Platform.OS === "web" ? { paddingTop: webContentTopPadding } : null]} />

        <TabList asChild>
          {Platform.OS === "web" ? (
            <WebTabRegistrationList>
              {routes.map((route) => (
                <TabTrigger key={route.name} name={route.name} href={route.href} asChild>
                  <View style={styles.hiddenTrigger} />
                </TabTrigger>
              ))}
            </WebTabRegistrationList>
          ) : (
            <MobileTabList>
              {routes.map((route) => (
                <TabTrigger key={route.name} name={route.name} href={route.href} asChild>
                  <TabButton>{route.title}</TabButton>
                </TabTrigger>
              ))}
            </MobileTabList>
          )}
        </TabList>
      </Tabs>
    </View>
  );
}

type TabButtonProps = Omit<ComponentProps<typeof Pressable>, "children" | "style"> & {
  children?: ReactNode;
  isFocused?: boolean;
};

function TabButton({ children, isFocused, ...props }: TabButtonProps) {
  return (
    <Pressable
      {...props}
      style={[
        styles.tabButton,
        isFocused ? styles.tabButtonFocused : null,
      ]}
    >
      <Text color={isFocused ? "text" : "textMuted"}>{children}</Text>
    </Pressable>
  );
}

function WebTabRegistrationList({ children }: Readonly<{ children?: ReactNode }>) {
  return <View style={styles.webTabRegistrationList}>{children}</View>;
}

function MobileTabList({ children }: Readonly<{ children?: ReactNode }>) {
  return <View style={styles.mobileTabList}>{children}</View>;
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    backgroundColor: "var(--color-background)",
  },
  tabSlot: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "var(--color-background)",
  },
  webTabRegistrationList: {
    position: "absolute",
    width: 0,
    height: 0,
    opacity: 0,
    pointerEvents: "none",
  },
  mobileTabList: {
    position: "absolute",
    bottom: 12,
    width: "100%",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  tabButton: {
    borderWidth: 1,
    borderColor: "#d4d4d8",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonFocused: {
    backgroundColor: "#f4f4f5",
  },
  hiddenTrigger: {
    width: 0,
    height: 0,
  },
});
