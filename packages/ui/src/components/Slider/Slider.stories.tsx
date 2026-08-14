import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider } from "./Slider";

const meta = {
  title: "Forms/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: {
    min: 0,
    max: 100,
    step: 1,
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);

    return <Slider {...args} value={value} onValueChange={setValue} />;
  },
};

export const RadiusExample: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        min={10}
        max={300}
        step={10}
        onValueChange={setValue}
        formatValue={(v) => `${v} km`}
      />
    );
  },
};
