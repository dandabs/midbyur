import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const textColorOptions = [
  "background",
  "backgroundAccent",
  "surface",
  "surfaceAccent",
  "primary",
  "primaryHover",
  "primaryForeground",
  "secondary",
  "secondaryHover",
  "secondaryForeground",
  "text",
  "textMuted",
  "muted",
  "border",
  "borderStrong",
  "success",
  "successHover",
  "successForeground",
  "warning",
  "warningHover",
  "warningForeground",
  "danger",
  "dangerHover",
  "dangerForeground",
  "info",
  "infoHover",
  "infoForeground",
  "disabled",
  "disabledText",
  "current",
] as const;

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: {
    color: "primary",
    size: "small",
    animating: true,
  },
  argTypes: {
    color: {
      control: "select",
      options: textColorOptions,
    },
    size: {
      control: "radio",
      options: ["small", "large"],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Spinner {...args} size="small" />
      <Spinner {...args} size="large" />
    </div>
  ),
};
