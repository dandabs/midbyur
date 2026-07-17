import type { Meta, StoryObj } from "@storybook/react";
import { Bell, Home, Search } from "lucide-react";
import { Icon } from "./Icon";

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
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: {
    icon: Home,
    color: "primary",
    size: 24,
    strokeWidth: 2,
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
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};

export const IconSet: Story = {
  render: (args) => (
    <div className="flex items-center gap-6 text-[var(--color-text)]">
      <Icon {...args} icon={Home} />
      <Icon {...args} icon={Search} color="info" />
      <Icon {...args} icon={Bell} color="warning" />
    </div>
  ),
};
