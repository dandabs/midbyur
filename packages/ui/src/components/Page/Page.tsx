"use client";

import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  type KeyboardAvoidingViewProps,
  type ScrollViewProps,
  type ViewProps,
  type ViewStyle,
} from "react-native";
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
  const rootClassName = ["flex flex-1 w-full", className].filter(Boolean).join(" ");

  let content = children;

  // Wrap in ScrollView if enabled
  if (scroll) {
    content = (
      <ScrollView
        style={withClassName(rootClassName) as ViewStyle}
        contentContainerStyle={withClassName("flex-grow") as ViewStyle}
        {...scrollViewProps}
      >
        {content}
      </ScrollView>
    );
  }

  // Wrap in SafeAreaView if enabled
  if (safeArea) {
    content = (
      <SafeAreaView
        style={withClassName(rootClassName) as ViewStyle}
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
