import type { Meta, StoryObj } from "@storybook/react";
import { Navigation } from "./Navigation";

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
  title: "Components/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  args: {
    color: "text",
    gap: 20,
    items: [
      { title: "Home", href: "#", active: true },
      { title: "About", href: "#about" },
      { title: "Services", href: "#services" },
      { title: "Contact", href: "#contact" },
    ],
  },
  argTypes: {
    color: {
      control: "select",
      options: textColorOptions,
    },
    gap: {
      control: "text",
    },
    items: {
      control: "object",
    },
  },
} satisfies Meta<typeof Navigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
