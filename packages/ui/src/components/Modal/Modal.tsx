"use client";

import type { ReactNode } from "react";
import { themeModes } from "@midbyur/theme";
import { X } from "lucide-react-native";
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal as RNModal,
  Platform,
  Pressable,
  ScrollView,
  View,
  type ViewStyle,
} from "react-native";
import { withClassName } from "../../cssInterop";
import { useMidbyurTheme } from "../../provider";
import { IconButton } from "../IconButton/IconButton";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";

export type ModalProps = Readonly<{
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  dismissOnBackdropPress?: boolean;
  /**
   * Whether the content area scrolls as a plain ScrollView (the default — fine for forms and
   * short content). Set to false when a child manages its own scrolling (e.g. a FlatList), since
   * nesting a VirtualizedList inside a ScrollView breaks its scroll behavior.
   */
  scrollable?: boolean;
}>;

const backdropStyle: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
};

// A percentage maxHeight resolves against this View's laid-out parent, which is the
// KeyboardAvoidingView — when the keyboard opens and that view's `padding` behavior adds bottom
// padding, that parent's own content-box height doesn't shrink, so `85%` of it can put the
// sheet's bottom edge behind the space now occupied by the keyboard-avoiding padding, clipping
// the bottom of the sheet's content (e.g. a single search result) with no visible affordance to
// scroll to it. An absolute pixel cap derived from the actual screen height avoids that.
const MAX_SHEET_HEIGHT = Math.round(Dimensions.get("window").height * 0.85);

const sheetStyle: ViewStyle = {
  width: "100%",
  maxWidth: 480,
  maxHeight: MAX_SHEET_HEIGHT,
  borderRadius: 12,
};

const headerStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 24,
  paddingTop: 24,
  paddingBottom: 12,
};

const contentPadding: ViewStyle = {
  paddingHorizontal: 24,
  paddingBottom: 24,
  gap: 16,
};

/**
 * A generic popup modal — a centered card over a dimmed backdrop, with an optional title/close
 * button and scrollable content. Use ConfirmModal instead for a simple confirm/cancel prompt;
 * use this one for anything with real content (a form, a list, custom actions).
 */
export function Modal({
  visible,
  onClose,
  title,
  children,
  dismissOnBackdropPress = true,
  scrollable = true,
}: ModalProps) {
  const theme = useMidbyurTheme();
  // `var(--color-surface)` only resolves through the css-interop `withClassName` pipeline on
  // plain style objects it never processed here — plain inline style props silently keep the
  // literal string, which React Native then just ignores, rendering no background at all. Resolve
  // the real color from the theme instead, the same fix applied to Slider/bottom-sheet.
  const surfaceColor = themeModes[theme]?.surface ?? themeModes.light.surface;

  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={backdropStyle}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable
          style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}
          onPress={dismissOnBackdropPress ? onClose : undefined}
        >
          {/* Inner pressable stops tap-through to the backdrop */}
          <Pressable onPress={() => undefined} style={{ width: "100%" }}>
            <View
              style={withClassName("bg-surface", {
                ...sheetStyle,
                backgroundColor: surfaceColor,
              }) as ViewStyle}
            >
              {title ? (
                <View style={headerStyle}>
                  <Text size="lg" weight="bold">
                    {title}
                  </Text>
                  <IconButton icon={X} onPress={onClose} color="textMuted" size={20} />
                </View>
              ) : null}

              {scrollable ? (
                <ScrollView
                  contentContainerStyle={{
                    ...contentPadding,
                    paddingTop: title ? 0 : 24,
                  }}
                  keyboardShouldPersistTaps="handled"
                >
                  <Stack gap={16}>{children}</Stack>
                </ScrollView>
              ) : (
                <View style={{ ...contentPadding, paddingTop: title ? 0 : 24, flexShrink: 1 }}>
                  <Stack gap={16} style={{ flexShrink: 1 }}>
                    {children}
                  </Stack>
                </View>
              )}
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </RNModal>
  );
}
