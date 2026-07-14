import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";
import { Text } from "../Text/Text";

const meta = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  args: {
    direction: "column",
    gap: 16,
  },
  argTypes: {
    direction: {
      control: "radio",
      options: ["row", "column"],
    },
    gap: {
      control: { type: "number", min: 0, max: 128, step: 4 },
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    direction: "column",
    gap: 20,
  },
  render: (args) => (
    <Stack {...args} direction="column" gap={20}>
      <Text variant="h3">Vertical Stack</Text>
      <Text variant="body">First item</Text>
      <Text variant="body">Second item</Text>
      <Text variant="body">Third item</Text>
    </Stack>
  ),
};

export const Horizontal: Story = {
  args: {
    direction: "row",
    gap: 12,
  },
  render: (args) => (
    <Stack {...args} direction="row" gap={12}>
      <div className="px-4 py-2 bg-(--color-primary) rounded text-white">
        <Text variant="label" color="current">Item 1</Text>
      </div>
      <div className="px-4 py-2 bg-(--color-secondary) rounded text-white">
        <Text variant="label" color="current">Item 2</Text>
      </div>
      <div className="px-4 py-2 bg-(--color-info) rounded text-white">
        <Text variant="label" color="current">Item 3</Text>
      </div>
    </Stack>
  ),
};

export const NestedStacks: Story = {
  args: {
    direction: "column",
    gap: 24,
  },
  render: (args) => (
    <Stack direction="column" gap={24}>
      <Text variant="h3">Nested Stacks</Text>
      
      <Stack direction="row" gap={12}>
        <div className="px-3 py-2 bg-(--color-background) rounded border border-(--color-border)">
          <Text variant="body">Row Item 1</Text>
        </div>
        <div className="px-3 py-2 bg-(--color-background) rounded border border-(--color-border)">
          <Text variant="body">Row Item 2</Text>
        </div>
        <div className="px-3 py-2 bg-(--color-background) rounded border border-(--color-border)">
          <Text variant="body">Row Item 3</Text>
        </div>
      </Stack>

      <Stack direction="column" gap={8}>
        <Text variant="label" color="textMuted">Column list:</Text>
        <Text variant="body">• Item A</Text>
        <Text variant="body">• Item B</Text>
        <Text variant="body">• Item C</Text>
      </Stack>
    </Stack>
  ),
};

export const WithCustomGap: Story = {
  args: {
    direction: "column",
    gap: 32,
  },
  render: (args) => (
    <Stack direction="column" gap={32}>
      <Text variant="h4">Large Gap (32px)</Text>
      <Text variant="body">First section with plenty of space</Text>
      <Text variant="body">Second section</Text>
      <Text variant="body">Third section</Text>
    </Stack>
  ),
};
