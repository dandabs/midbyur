import type { Meta, StoryObj } from "@storybook/react";
import { BackBreadcrumb } from "./BackBreadcrumb";

const meta = {
  title: "Navigation/BackBreadcrumb",
  component: BackBreadcrumb,
  tags: ["autodocs"],
  args: {
    label: "Settings",
    onPress: () => {
      // No-op story handler; the component is interactive through the control panel.
    },
  },
  argTypes: {
    label: {
      control: "text",
    },
    onPress: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof BackBreadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-24 items-start bg-[var(--color-background)] p-6 text-[var(--color-text)]">
      <BackBreadcrumb {...args} />
    </div>
  ),
};

export const LongLabel: Story = {
  args: {
    label: "Account preferences and profile settings",
  },
};
