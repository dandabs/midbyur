import type { Meta, StoryObj } from "@storybook/react";
import { Pill } from "./Pill";

const meta = {
  title: "Forms/Pill",
  component: Pill,
  tags: ["autodocs"],
  args: {
    children: "Status",
    variant: "neutral",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "success", "warning", "danger", "info", "primary", "secondary"],
    },
  },
} satisfies Meta<typeof Pill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: {
    children: "Disconnected",
    variant: "neutral",
  },
};

export const Success: Story = {
  args: {
    children: "Connected",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Connecting",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "Error",
    variant: "danger",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Pill variant="neutral">Neutral</Pill>
      <Pill variant="success">Success</Pill>
      <Pill variant="warning">Warning</Pill>
      <Pill variant="danger">Danger</Pill>
      <Pill variant="info">Info</Pill>
      <Pill variant="primary">Primary</Pill>
      <Pill variant="secondary">Secondary</Pill>
    </div>
  ),
};
