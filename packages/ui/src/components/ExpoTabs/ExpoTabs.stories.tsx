import type { Meta, StoryObj } from "@storybook/react";
import { ExpoTabList, ExpoTabSlot, ExpoTabsRoot, ExpoTabTrigger } from "./ExpoTabs";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";

const meta = {
  title: "Expo only/Router Tabs",
  component: ExpoTabsRoot,
  tags: ["autodocs"],
} satisfies Meta<typeof ExpoTabsRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PreviewStructure: Story = {
  render: () => (
    <ExpoTabsRoot>
      <ExpoTabList>
        <ExpoTabTrigger name="home" href="/">
          Home
        </ExpoTabTrigger>
        <ExpoTabTrigger name="activity" href="/activity">
          Activity
        </ExpoTabTrigger>
      </ExpoTabList>
      <ExpoTabSlot>
        <Stack gap={12} className="p-4">
          <Text variant="h4">Expo-only component</Text>
          <Text color="textMuted">
            This preview renders a fallback shell on web. Real navigation behavior
            is available in the Expo example app via expo-router/ui.
          </Text>
        </Stack>
      </ExpoTabSlot>
    </ExpoTabsRoot>
  ),
};
