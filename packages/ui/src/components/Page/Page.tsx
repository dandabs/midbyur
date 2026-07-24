"use client";

import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  type KeyboardAvoidingViewProps,
  type ScrollViewProps,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { withClassName } from "../../cssInterop";

export type PageProps = Readonly<{
  children?: ReactNode;
  keyboardAvoiding?: boolean;
  safeArea?: boolean;
  scroll?: boolean;
  className?: string;
  scrollViewProps?: Omit<ScrollViewProps, "children">;
  keyboardAvoidingProps?: Omit<KeyboardAvoidingViewProps, "children" | "behavior">;
  safeAreaProps?: Omit<ViewProps, "children">;
}>;

export function Page({
  children,
  keyboardAvoiding = false,
  safeArea = true,
  scroll = true,
  className,
  scrollViewProps,
  keyboardAvoidingProps,
  safeAreaProps,
}: PageProps) {
  const rootClassName = [
    "mb-page",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  let content = children;
  const nativeTopPaddingStyle: ViewStyle | undefined = Platform.OS === "web"
    ? undefined
    : { paddingTop: 32 };

  // Wrap in ScrollView if enabled
  if (scroll) {
    const mergedContentContainerStyle = [
      withClassName("mb-page__grow") as ViewStyle,
      nativeTopPaddingStyle,
      scrollViewProps?.contentContainerStyle as ViewStyle | undefined,
    ].filter(Boolean) as ViewStyle[];

    content = (
      <ScrollView
        style={withClassName(rootClassName) as ViewStyle}
        contentContainerStyle={mergedContentContainerStyle}
        {...scrollViewProps}
      >
        {content}
      </ScrollView>
    );
  }

  // Wrap in SafeAreaView if enabled
  if (safeArea) {
    const mergedSafeAreaStyle = [
      withClassName(rootClassName) as ViewStyle,
      !scroll ? nativeTopPaddingStyle : undefined,
      safeAreaProps?.style as ViewStyle | undefined,
    ].filter(Boolean) as ViewStyle[];

    content = (
      <SafeAreaView
        style={mergedSafeAreaStyle}
        {...safeAreaProps}
      >
        {content}
      </SafeAreaView>
    );
  }

  // Wrap in KeyboardAvoidingView if enabled
  if (keyboardAvoiding) {
    content = (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={withClassName(rootClassName) as ViewStyle}
        {...keyboardAvoidingProps}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  // If no wrappers are enabled, return basic flex container
  if (!keyboardAvoiding && !safeArea && !scroll) {
    return <View style={withClassName(rootClassName) as ViewStyle}>{children}</View>;
  }

  return content;
}
