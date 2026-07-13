import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Continue",
    variant: "primary",
    type: "solid",
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
    children: "Outline",
  },
};

export const Link: Story = {
  args: {
    type: "link",
    variant: "info",
    children: "Read More",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Save",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Delete",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Acknowledge",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Learn More",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
