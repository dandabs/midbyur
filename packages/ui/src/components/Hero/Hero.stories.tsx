import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";

const meta = {
  title: "Components/Hero",
  component: Hero,
  args: {
    title: "dan adams",
    subtitle:
      "Build bold experiences with reusable foundations, a shared visual language, and intentional component patterns.",
    titleVariant: "display",
    overlayOpacity: 0.45,
    heightPreset: "full",
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
  },
  argTypes: {
    titleVariant: {
      control: "select",
      options: ["display", "h1", "h2", "h3", "h4", "h5"],
    },
    overlayOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.05 },
    },
    heightPreset: {
      control: "select",
      options: ["full", "twoThirds", "oneThird"],
    },
    height: {
      control: "text",
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const NoSubtitle: Story = {
  args: {
    subtitle: undefined,
  },
};
