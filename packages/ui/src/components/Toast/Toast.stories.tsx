import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Button } from "../Button/Button";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import {
  showToast,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showAlert,
  showSuccessAlert,
  showErrorAlert,
  showHeartAlert,
  dismissAllToasts,
} from "../../toast";

const meta = {
  title: "Components/Toast Examples",
  component: View,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToastExamples: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Stack direction="column" gap={12}>
        <Text variant="h3">Toast Notifications</Text>

        <ButtonGroup gap={12}>
          <Button
            variant="primary"
            onPress={() =>
              showToast({
                title: "Custom Toast",
                message: "This is a custom toast notification",
                preset: "none",
              })
            }
          >
            Show Toast
          </Button>

          <Button
            variant="success"
            onPress={() =>
              showSuccessToast("Success!", "Operation completed successfully")
            }
          >
            Success
          </Button>

          <Button
            variant="danger"
            onPress={() => showErrorToast("Error!", "Something went wrong")}
          >
            Error
          </Button>
        </ButtonGroup>

        <ButtonGroup gap={12}>
          <Button
            variant="secondary"
            onPress={() => showWarningToast("Warning", "Please be careful")}
          >
            Warning
          </Button>

          <Button
            variant="secondary"
            onPress={() => showInfoToast("Info", "Here's some information")}
          >
            Info
          </Button>

          <Button
            variant="secondary"
            onPress={() => dismissAllToasts()}
          >
            Dismiss All
          </Button>
        </ButtonGroup>
      </Stack>

      <Stack direction="column" gap={12}>
        <Text variant="h3">Alert Notifications</Text>

        <ButtonGroup gap={12}>
          <Button
            variant="primary"
            onPress={() =>
              showAlert({
                title: "Custom Alert",
                message: "This is a custom alert",
                preset: "none",
              })
            }
          >
            Show Alert
          </Button>

          <Button
            variant="success"
            onPress={() => showSuccessAlert("Success!", "Operation completed")}
          >
            Success Alert
          </Button>

          <Button
            variant="danger"
            onPress={() => showErrorAlert("Error!", "Something failed")}
          >
            Error Alert
          </Button>
        </ButtonGroup>

        <ButtonGroup gap={12}>
          <Button
            variant="secondary"
            onPress={() => showHeartAlert("Love it!", "This is awesome")}
          >
            Heart Alert
          </Button>
        </ButtonGroup>
      </Stack>

      <Text variant="body" color="textMuted">
        Try clicking the buttons above to see different toast and alert variations. On web, toasts appear at the bottom-right.
        On iOS, alerts display as native popups. On Android, alerts fall back to toasts.
      </Text>
    </Stack>
  ),
};

export const SuccessToast: Story = {
  render: () => (
    <Button
      variant="success"
      onPress={() =>
        showSuccessToast("Operation Successful", "Your changes have been saved")
      }
    >
      Show Success Toast
    </Button>
  ),
};

export const ErrorToast: Story = {
  render: () => (
    <Button
      variant="danger"
      onPress={() =>
        showErrorToast("Operation Failed", "Please try again later")
      }
    >
      Show Error Toast
    </Button>
  ),
};

export const WarningToast: Story = {
  render: () => (
    <Button
      variant="secondary"
      onPress={() =>
        showWarningToast(
          "Be Careful",
          "This action cannot be undone",
        )
      }
    >
      Show Warning Toast
    </Button>
  ),
};

export const CustomToastWithHaptic: Story = {
  render: () => (
    <Button
      variant="primary"
      onPress={() =>
        showToast({
          title: "Custom Toast",
          message: "With haptic feedback",
          preset: "done",
          haptic: "success",
          duration: 3,
        })
      }
    >
      Show Custom Toast
    </Button>
  ),
};

export const HeartAlert: Story = {
  render: () => (
    <Button
      variant="secondary"
      onPress={() => showHeartAlert("Love it!", "This component is amazing")}
    >
      Show Heart Alert
    </Button>
  ),
};
