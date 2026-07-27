"use client";

import { Modal, Pressable, View, type ViewStyle } from "react-native";
import { Button } from "../Button/Button";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";

export type ConfirmModalProps = Readonly<{
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "danger" | "primary" | "warning";
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}>;

const backdropStyle: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
};

const sheetStyle: ViewStyle = {
  width: "100%",
  maxWidth: 400,
  borderRadius: 12,
  padding: 24,
  backgroundColor: "var(--color-surface)" as unknown as string,
  gap: 16,
};

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={backdropStyle} onPress={onCancel}>
        {/* Inner pressable stops tap-through to the backdrop */}
        <Pressable onPress={() => undefined}>
          <View className="bg-surface" style={sheetStyle}>
            <Stack gap={6}>
              <Text size="lg" weight="bold">
                {title}
              </Text>
              {message ? (
                <Text size="sm" color="textMuted">
                  {message}
                </Text>
              ) : null}
            </Stack>

            <ButtonGroup gap={8} className="w-full" style={{ width: "100%" }}>
              <Button
                variant="secondary"
                onPress={onCancel}
                disabled={loading}
                className="flex-1"
                style={{ flex: 1 }}
              >
                {cancelLabel}
              </Button>
              <Button
                variant={confirmVariant}
                onPress={() => void onConfirm()}
                loading={loading}
                className="flex-1"
                style={{ flex: 1 }}
              >
                {confirmLabel}
              </Button>
            </ButtonGroup>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
