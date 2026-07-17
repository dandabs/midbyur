import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";
import { Text } from "../Text/Text";

const meta = {
  title: "Components/Container",
  component: Container,
  tags: ['autodocs'],
  args: {
    maxWidth: "xl",
  },
  argTypes: {
    maxWidth: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-full bg-[var(--color-surfaceAccent)] py-8">
      <Container
        {...args}
        className="border border-dashed border-[var(--color-borderStrong)] py-6"
      >
        <Text variant="h4">Container</Text>
        <Text className="mt-3">
          This content is constrained by max width while remaining responsive.
        </Text>
      </Container>
    </div>
  ),
};
