import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { showSuccessToast } from "../../toast";
import { ToastProvider } from "./ToastProvider";

const meta = {
  title: "Components/ToastProvider",
  component: ToastProvider,
  tags: ["autodocs"],
  args: {
    config: {
      position: "top-right",
      theme: "system",
      richColors: false,
    },
  },
  argTypes: {
    config: {
      control: "object",
    },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <Stack gap={16} style={{ padding: 24 }}>
        <Text variant="h3">Toast Provider</Text>
        <Text color="textMuted">
          The provider mounts the web toaster container and passes through its children.
        </Text>
        <Button
          variant="primary"
          onPress={() => {
            showSuccessToast("Saved", "The toast provider is active.");
          }}
        >
          Show toast
        </Button>
      </Stack>
    </ToastProvider>
  ),
};
