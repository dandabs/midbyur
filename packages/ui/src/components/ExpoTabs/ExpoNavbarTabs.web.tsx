"use client";

import type { ReactNode } from "react";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Navbar } from "../Navbar/Navbar";

export type ExpoNavbarTabRoute = Readonly<{
  name: string;
  href: string;
  title: string;
  icon?: Readonly<{
    sf?: string | Readonly<{ default?: string; selected: string }>;
    md?: string | Readonly<{ default?: string; selected: string }>;
  }>;
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

  return (
    <View style={[styles.appRoot, { minHeight: viewportHeight }]}>
      <Tabs>
        <Navbar
          brand={brand}
          links={routes.map((route) => ({
            title: route.title,
            href: route.href,
            active: pathname === route.href || pathname.startsWith(`${route.href}/`),
          }))}
          className="mb-expo-web-navbar"
        />

        <TabSlot style={[styles.tabSlot, { paddingTop: webContentTopPadding }]} />

        <TabList asChild>
          <WebTabRegistrationList>
            {routes.map((route) => (
              <TabTrigger key={route.name} name={route.name} href={route.href} asChild>
                <View style={styles.hiddenTrigger} />
              </TabTrigger>
            ))}
          </WebTabRegistrationList>
        </TabList>
      </Tabs>
    </View>
  );
}

function WebTabRegistrationList({ children }: Readonly<{ children?: ReactNode }>) {
  return <View style={styles.webTabRegistrationList}>{children}</View>;
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
  hiddenTrigger: {
    width: 0,
    height: 0,
  },
});
