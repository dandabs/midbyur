"use client";

import type { ComponentProps } from "react";
import { NativeTabs } from "expo-router/unstable-native-tabs";

type ExpoNativeTabIcon = Readonly<{
  sf?: string | Readonly<{ default?: string; selected: string }>;
  md?: string | Readonly<{ default?: string; selected: string }>;
}>;

export type ExpoNavbarTabRoute = Readonly<{
  name: string;
  href: string;
  title: string;
  icon?: ExpoNativeTabIcon;
}>;

export type ExpoNavbarTabsProps = Readonly<{
  brand: string;
  pathname: string;
  routes: ExpoNavbarTabRoute[];
  webContentTopPadding?: number;
}>;

export function ExpoNavbarTabs({ routes }: ExpoNavbarTabsProps) {
  return (
    <NativeTabs tabBarRespectsIMEInsets>
      {routes.map((route) => (
        <NativeTabs.Trigger key={route.name} name={route.name}>
          {route.icon ? (
            <NativeTabs.Trigger.Icon
              {...(route.icon as ComponentProps<typeof NativeTabs.Trigger.Icon>)}
            />
          ) : null}
          <NativeTabs.Trigger.Label>{route.title}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
