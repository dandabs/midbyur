import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";
import { Text } from "../Text/Text";

const meta = {
  title: "Components/Hero",
  component: Hero,
  tags: ['autodocs'],
  args: {
    title: <Text variant="display">dan adams</Text>,
    subtitle: (
      <Text variant="body">
        Build bold experiences with reusable foundations, a shared visual language, and intentional component patterns.
      </Text>
    ),
    titleVariant: "display",
    overlayOpacity: 0.45,
    heightPreset: "full",
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    backgroundImageUrls: undefined,
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
    backgroundImageUrls: {
      control: "object",
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

export const Slideshow: Story = {
  args: {
    title: <Text variant="display">Stories in Motion</Text>,
    subtitle: <Text variant="body">The hero rotates through multiple background images automatically.</Text>,
    backgroundImageUrl: undefined,
    backgroundImageUrls: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    ],
  },
};
