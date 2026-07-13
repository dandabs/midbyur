import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { ButtonGroup } from "./ButtonGroup";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  args: {
    direction: "horizontal",
    gap: 12,
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    gap: {
      control: "text",
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="info" type="link">Learn More</Button>
    </ButtonGroup>
  ),
};
