import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Text } from "../Text/Text";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ['autodocs'],
  args: {
    children: <Text variant="label">Continue</Text>,
    variant: "primary",
    type: "solid",
    fluid: true,
    loading: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info"],
    },
    type: {
      control: "select",
      options: ["solid", "outline", "link"],
    },
    fluid: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    type: "outline",
    variant: "primary",
    children: <Text variant="label">Outline</Text>,
  },
};

export const Link: Story = {
  args: {
    type: "link",
    variant: "info",
    children: <Text variant="label">Read More</Text>,
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: <Text variant="label">Save</Text>,
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: <Text variant="label">Delete</Text>,
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: <Text variant="label">Acknowledge</Text>,
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: <Text variant="label">Learn More</Text>,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const InlineButton: Story = {
  args: {
    fluid: false,
    children: <Text variant="label">Inline Action</Text>,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: <Text variant="label">Submitting</Text>,
  },
};

export const LoadingVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Button {...args} variant="primary" loading>
        <Text variant="label">Primary Loading</Text>
      </Button>
      <Button {...args} variant="secondary" loading>
        <Text variant="label">Secondary Loading</Text>
      </Button>
      <Button {...args} variant="success" loading>
        <Text variant="label">Success Loading</Text>
      </Button>
      <Button {...args} variant="danger" loading>
        <Text variant="label">Danger Loading</Text>
      </Button>
      <Button {...args} variant="warning" loading>
        <Text variant="label">Warning Loading</Text>
      </Button>
      <Button {...args} variant="info" loading>
        <Text variant="label">Info Loading</Text>
      </Button>
      <Button {...args} type="outline" variant="primary" loading>
        <Text variant="label">Outline Loading</Text>
      </Button>
      <Button {...args} type="link" variant="info" loading fluid={false}>
        <Text variant="label">Link Loading</Text>
      </Button>
    </div>
  ),
};

export const VariantColorMatrix: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Button {...args} variant="primary">
        <Text variant="label">Primary</Text>
      </Button>
      <Button {...args} variant="secondary">
        <Text variant="label">Secondary</Text>
      </Button>
      <Button {...args} variant="success">
        <Text variant="label">Success</Text>
      </Button>
      <Button {...args} variant="danger">
        <Text variant="label">Danger</Text>
      </Button>
      <Button {...args} variant="warning">
        <Text variant="label">Warning</Text>
      </Button>
      <Button {...args} variant="info">
        <Text variant="label">Info</Text>
      </Button>
    </div>
  ),
};

export const LabelColorMapping: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Button {...args} variant="primary" type="solid">Solid Label</Button>
      <Button {...args} variant="secondary" type="outline">Outline Label</Button>
      <Button {...args} variant="info" type="link" fluid={false}>Link Label</Button>
      <Button {...args} variant="primary" type="solid" disabled>Disabled Label</Button>
    </div>
  ),
};
