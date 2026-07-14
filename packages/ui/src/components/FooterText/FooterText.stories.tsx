import type { Meta, StoryObj } from "@storybook/react";
import { FooterText } from "./FooterText";

const meta = {
  title: "Components/FooterText",
  component: FooterText,
  tags: ["autodocs"],
} satisfies Meta<typeof FooterText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full">
        <FooterText {...args} />
    </div>
  ),
};