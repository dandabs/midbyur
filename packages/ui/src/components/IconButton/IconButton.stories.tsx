import type { Meta, StoryObj } from "@storybook/react";
import { Bell, Home, Search } from "lucide-react";
import { IconButton } from "./IconButton";

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
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    icon: Home,
    color: "primary",
    size: 20,
    strokeWidth: 2,
    onPress: () => {
      // Storybook interaction placeholder.
    },
  },
  argTypes: {
    icon: {
      control: false,
    },
    color: {
      control: "select",
      options: textColorOptions,
    },
    size: {
      control: { type: "number", min: 8, max: 96, step: 1 },
    },
    strokeWidth: {
      control: { type: "number", min: 0.5, max: 6, step: 0.25 },
    },
    onPress: {
      control: false,
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};

export const IconSet: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} icon={Home} />
      <IconButton {...args} icon={Search} color="info" />
      <IconButton {...args} icon={Bell} color="warning" />
    </div>
  ),
};
