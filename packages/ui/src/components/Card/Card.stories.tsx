import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../Text/Text";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ['autodocs'],
  args: {
    imageAlt: "",
    imageHeight: "48em",
  },
  argTypes: {
    imageHeight: {
      control: "text",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args}>
      <Text variant="h4">Card Title</Text>
      <Text className="mt-3" color="muted">
        This card uses consistent horizontal and vertical padding with a surface background.
      </Text>
    </Card>
  ),
};

export const WithImage: Story = {
  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Mountain landscape",
  },
  render: (args) => (
    <Card {...args}>
      <Text variant="h4">Card With Image</Text>
      <Text className="mt-3" color="muted">
        The image reaches the card edges, while text content remains inside padded content.
      </Text>
    </Card>
  ),
};

export const WithCustomImageHeight: Story = {
  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Night sky",
    imageHeight: "24em",
  },
  render: (args) => (
    <Card {...args}>
      <Text variant="h4">Custom Image Height</Text>
      <Text className="mt-3" color="muted">
        Image height can be customized using numbers (px) or CSS units.
      </Text>
    </Card>
  ),
};
