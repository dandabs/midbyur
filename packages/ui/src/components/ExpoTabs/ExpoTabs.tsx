"use client";

import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { Platform, Pressable, Text, View, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";

type ExpoRouterUiModule = {
  Tabs: React.ComponentType<Readonly<{ children?: ReactNode }>>;
  TabList: React.ComponentType<Readonly<{ children?: ReactNode }>>;
  TabTrigger: React.ComponentType<
    Readonly<{
      name: string;
      href: string;
      children?: ReactNode;
    }>
  >;
  TabSlot: React.ComponentType;
};

function getExpoRouterUiModule(): ExpoRouterUiModule | null {
  if (Platform.OS === "web") return null;

  try {
    return require("expo-router/ui") as ExpoRouterUiModule;
  } catch {
    return null;
  }
}

function mapChildrenToExpoRouterUi(
  children: ReactNode,
  module: ExpoRouterUiModule,
): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === ExpoTabSlot) {
      return <module.TabSlot />;
    }

    if (child.type === ExpoTabList) {
      const props = child.props as ExpoTabListProps;
      const listStyle = withClassName(
        [
          "mb-tabs-list",
          props.className,
        ]
          .filter(Boolean)
          .join(" "),
      ) as ViewStyle;

      return (
        <module.TabList asChild>
          <View style={listStyle}>{mapChildrenToExpoRouterUi(props.children, module)}</View>
        </module.TabList>
      );
    }

    if (child.type === ExpoTabTrigger) {
      const props = child.props as ExpoTabTriggerProps;
      const triggerStyle = withClassName(
        [
          "mb-tabs-trigger",
          props.className,
        ]
          .filter(Boolean)
          .join(" "),
      ) as ViewStyle;

      return (
        <module.TabTrigger name={props.name} href={props.href} asChild>
          <Pressable style={triggerStyle}>
            <Text>{props.children ?? props.name}</Text>
          </Pressable>
        </module.TabTrigger>
      );
    }

    const props = (child as ReactElement<{ children?: ReactNode }>).props;

    if (props && "children" in props) {
      return cloneElement(child as ReactElement<{ children?: ReactNode }>, {
        children: mapChildrenToExpoRouterUi(props.children, module),
      });
    }

    return child;
  });
}

export type ExpoTabsRootProps = Readonly<{
  children?: ReactNode;
  className?: string;
}>;

export function ExpoTabsRoot({ children, className }: ExpoTabsRootProps) {
  const module = getExpoRouterUiModule();
  const wrapperStyle = withClassName(
    ["mb-tabs-root", className].filter(Boolean).join(" "),
  ) as ViewStyle;

  if (!module) {
    return <View style={wrapperStyle}>{children}</View>;
  }

  const Tabs = module.Tabs;
  const mappedChildren = mapChildrenToExpoRouterUi(children, module);

  return (
    <Tabs asChild>
      <View style={wrapperStyle}>{mappedChildren}</View>
    </Tabs>
  );
}

export type ExpoTabListProps = Readonly<{
  children?: ReactNode;
  className?: string;
}>;

export function ExpoTabList({ children, className }: ExpoTabListProps) {
  const module = getExpoRouterUiModule();
  const listStyle = withClassName(
    [
      "mb-tabs-list",
      className,
    ]
      .filter(Boolean)
      .join(" "),
  ) as ViewStyle;

  if (!module) {
    return <View style={listStyle}>{children}</View>;
  }

  // Native rendering is handled by ExpoTabsRoot which remaps this wrapper into expo-router/ui primitives.
  return <View style={listStyle}>{children}</View>;
}

export type ExpoTabTriggerProps = Readonly<{
  name: string;
  href: string;
  children?: ReactNode;
  className?: string;
}>;

export function ExpoTabTrigger({ name, href, children, className }: ExpoTabTriggerProps) {
  const module = getExpoRouterUiModule();
  const triggerStyle = withClassName(
    [
      "mb-tabs-trigger",
      className,
    ]
      .filter(Boolean)
      .join(" "),
  ) as ViewStyle;

  if (!module) {
    return (
      <Pressable style={triggerStyle}>
        <Text>{children ?? name}</Text>
      </Pressable>
    );
  }

  // Native rendering is handled by ExpoTabsRoot which remaps this wrapper into expo-router/ui primitives.
  return (
    <Pressable style={triggerStyle}>
      <Text>{children ?? name}</Text>
    </Pressable>
  );
}

export type ExpoTabSlotProps = Readonly<{
  children?: ReactNode;
  className?: string;
}>;

export function ExpoTabSlot({ children, className }: ExpoTabSlotProps) {
  const module = getExpoRouterUiModule();
  const slotStyle = withClassName(["mb-tabs-slot", className].filter(Boolean).join(" ")) as ViewStyle;

  if (!module) {
    return <View style={slotStyle}>{children}</View>;
  }

  // Native rendering is handled by ExpoTabsRoot which remaps this wrapper into expo-router/ui primitives.
  return <View style={slotStyle}>{children}</View>;
}
