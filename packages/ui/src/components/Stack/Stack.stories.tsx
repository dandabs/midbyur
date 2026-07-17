import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";
import { Text } from "../Text/Text";

const gapOptions = ["sm", "md", "lg"] as const;

const meta = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  args: {
    direction: "column",
    gap: "md",
  },
  argTypes: {
    direction: {
      control: "radio",
      options: ["row", "column"],
    },
    gap: {
      control: "select",
      options: gapOptions,
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    direction: "column",
    gap: "lg",
  },
  render: (args) => (
    <Stack {...args} direction="column">
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
    gap: "md",
  },
  render: (args) => (
    <Stack {...args} direction="row">
      <div className="px-4 py-2 bg-[var(--color-primary)] rounded text-white">
        <Text variant="label" color="current">Item 1</Text>
      </div>
      <div className="px-4 py-2 bg-[var(--color-secondary)] rounded text-white">
        <Text variant="label" color="current">Item 2</Text>
      </div>
      <div className="px-4 py-2 bg-[var(--color-info)] rounded text-white">
        <Text variant="label" color="current">Item 3</Text>
      </div>
    </Stack>
  ),
};

export const NestedStacks: Story = {
  args: {
    direction: "column",
    gap: "lg",
  },
  render: (args) => (
    <Stack {...args} direction="column">
      <Text variant="h3">Nested Stacks</Text>
      
      <Stack direction="row" gap="md">
        <div className="px-3 py-2 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
          <Text variant="body">Row Item 1</Text>
        </div>
        <div className="px-3 py-2 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
          <Text variant="body">Row Item 2</Text>
        </div>
        <div className="px-3 py-2 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
          <Text variant="body">Row Item 3</Text>
        </div>
      </Stack>

      <Stack direction="column" gap="sm">
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
    gap: "lg",
  },
  render: (args) => (
    <Stack {...args} direction="column">
      <Text variant="h4">Large Gap (lg)</Text>
      <Text variant="body">First section with plenty of space</Text>
      <Text variant="body">Second section</Text>
      <Text variant="body">Third section</Text>
    </Stack>
  ),
};

export const NativeGapFallback: Story = {
  args: {
    direction: "column",
    gap: "lg",
  },
  render: (args) => (
    <Stack {...args} direction="column">
      <Text variant="h4">First item</Text>
      <Text variant="body">Second item with native spacing fallback.</Text>
      <Text variant="body">Third item with the same spacing.</Text>
    </Stack>
  ),
};

export const NumericGap: Story = {
  args: {
    direction: "column",
    gap: 16,
  },
  render: (args) => (
    <Stack {...args} direction="column">
      <Text variant="h4">First item</Text>
      <Text variant="body">Second item with numeric gap.</Text>
      <Text variant="body">Third item with numeric gap.</Text>
    </Stack>
  ),
};
