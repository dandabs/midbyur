import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    value: "",
    onChangeText: fn(),
    placeholder: "Enter text…",
    editable: true,
  },
  argTypes: {
    editable: { control: "boolean" },
    secureTextEntry: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: { value: "Hello world" },
};

export const Disabled: Story = {
  args: { editable: false, value: "Cannot edit" },
};

export const Password: Story = {
  args: { secureTextEntry: true, placeholder: "Enter password…" },
};
