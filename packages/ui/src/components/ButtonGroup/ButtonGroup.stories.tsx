import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { ButtonGroup } from "./ButtonGroup";

const gapOptions = ["sm", "md", "lg"] as const;

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  args: {
    direction: "horizontal",
    gap: "md",
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    gap: {
      control: "select",
      options: gapOptions,
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="primary"><Text variant="label">Primary</Text></Button>
      <Button variant="secondary"><Text variant="label">Secondary</Text></Button>
      <Button variant="danger"><Text variant="label">Danger</Text></Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="primary"><Text variant="label">Save</Text></Button>
      <Button variant="secondary"><Text variant="label">Cancel</Text></Button>
      <Button variant="info" type="link"><Text variant="label">Learn More</Text></Button>
    </ButtonGroup>
  ),
};

export const NumericGap: Story = {
  args: {
    direction: "horizontal",
    gap: 16,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="primary"><Text variant="label">One</Text></Button>
      <Button variant="secondary"><Text variant="label">Two</Text></Button>
      <Button variant="info"><Text variant="label">Three</Text></Button>
    </ButtonGroup>
  ),
};
