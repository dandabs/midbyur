import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta = {
  title: "Components/Text",
  component: Text,
  tags: ['autodocs'],
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
    variant: "body",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "display",
        "h1",
        "h1Subheading",
        "h2",
        "h2Subheading",
        "h3",
        "h3Subheading",
        "h4",
        "h4Subheading",
        "h5",
        "h5Subheading",
        "body",
        "bodySm",
        "label",
        "caption",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold", "extrabold"],
    },
    lineHeight: {
      control: "select",
      options: ["tight", "snug", "normal", "relaxed"],
    },
    fontFamily: {
      control: "select",
      options: ["text", "notch", "headline", "mono"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};

export const VariantScale: Story = {
  render: () => (
    <div className="grid gap-3">
      <Text variant="display">Display</Text>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h1Subheading">Heading 1 Subheading</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h2Subheading">Heading 2 Subheading</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h3Subheading">Heading 3 Subheading</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h4Subheading">Heading 4 Subheading</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h5Subheading">Heading 5 Subheading</Text>
      <Text variant="body">Body text for longer reading content.</Text>
      <Text variant="bodySm">Small body text for compact layouts.</Text>
      <Text variant="label">Field Label</Text>
      <Text variant="caption">Caption text and metadata.</Text>
    </div>
  ),
};