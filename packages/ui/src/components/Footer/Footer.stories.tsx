import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="min-h-[320px] bg-[var(--color-background)]">
      <div className="flex min-h-[220px] items-end">
        <Footer {...args} />
      </div>
    </div>
  ),
};