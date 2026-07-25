import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./components/Button/Button";
import { Stack } from "./components/Stack/Stack";
import { Text } from "./components/Text/Text";
import { showInfoToast } from "./toast";
import { MidbyurProvider } from "./provider";

const meta = {
  title: "Providers/MidbyurProvider",
  component: MidbyurProvider,
  tags: ["autodocs"],
  args: {
    theme: "light",
  },
  argTypes: {
    theme: {
      control: "select",
      options: ["light", "dark"],
    },
    toastConfig: {
      control: "object",
    },
  },
} satisfies Meta<typeof MidbyurProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <MidbyurProvider {...args}>
      <Stack gap={16} style={{ padding: 24 }}>
        <Text variant="h3">Midbyur Provider</Text>
        <Text color="textMuted">
          This provider applies theme variables and mounts the toast provider on web.
        </Text>
        <Button
          variant="secondary"
          onPress={() => {
            showInfoToast("Provider active", "Theme variables are available here.");
          }}
        >
          Show info toast
        </Button>
      </Stack>
    </MidbyurProvider>
  ),
};
