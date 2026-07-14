import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Text } from "../Text/Text";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ['autodocs'],
  args: {
    children: <Text variant="label">Continue</Text>,
    variant: "primary",
    type: "solid",
    fluid: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info"],
    },
    type: {
      control: "select",
      options: ["solid", "outline", "link"],
    },
    fluid: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    type: "outline",
    variant: "primary",
    children: <Text variant="label">Outline</Text>,
  },
};

export const Link: Story = {
  args: {
    type: "link",
    variant: "info",
    children: <Text variant="label">Read More</Text>,
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: <Text variant="label">Save</Text>,
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: <Text variant="label">Delete</Text>,
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: <Text variant="label">Acknowledge</Text>,
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: <Text variant="label">Learn More</Text>,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const InlineButton: Story = {
  args: {
    fluid: false,
    children: <Text variant="label">Inline Action</Text>,
  },
};
