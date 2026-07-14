import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  args: {
    brand: "Miðbýur",
    linksGap: 20,
    links: [
      { title: "Home", href: "#home", active: true },
      { title: "Work", href: "#work" },
      { title: "Services", href: "#services" },
      { title: "Contact", href: "#contact" },
    ],
  },
  argTypes: {
    brand: {
      control: "text",
    },
    linksGap: {
      control: "text",
    },
    links: {
      control: "object",
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="min-h-[220vh] bg-(--color-background)">
      <Navbar {...args} />

      <div className="px-4 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8 py-10 text-(--color-text)">
          <h2 className="text-3xl font-medium">Scroll To See Navbar Transition</h2>
          <p className="text-lg text-(--color-textMuted)">
            The navbar starts with a liquid glass translucency effect and becomes
            solid black after scrolling beyond one viewport height.
          </p>
        </div>
      </div>
    </div>
  ),
};
