import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "../Container/Container";
import { Text } from "../Text/Text";
import { Section } from "./Section";

const meta = {
  title: "Components/Section",
  component: Section,
  tags: ['autodocs'],
  args: {
    type: "default",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["default", "image"],
    },
    overlayOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.05 },
    },
    height: {
      control: "number",
    },
  },
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Section
      {...args}
      type="default"
      className="bg-(--color-surface)"
    >
      <Container>
        <Text variant="h2">Section</Text>
        <Text className="mt-3 text-(--color-textMuted)">
          A reusable page section with consistent top spacing.
        </Text>
      </Container>
    </Section>
  ),
};

export const Image: Story = {
  args: {
    type: "image",
    height: 400,
    overlayOpacity: 0.45,
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
  },
  render: (args) => (
    <Section {...args}>
      <Container>
        <Text variant="display">Image Section</Text>
        <Text className="mt-4 max-w-2xl text-white/90">
          Image sections include a dark translucent overlay by default to keep text readable.
        </Text>
      </Container>
    </Section>
  ),
};
