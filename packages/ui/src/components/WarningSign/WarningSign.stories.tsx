import type { Meta, StoryObj } from "@storybook/react";
import { ROAD_SIGN_COLOUR_OPTIONS } from "./roadSignColors";
import { WARNING_SIGN_SYMBOL_OPTIONS } from "./warningSignSymbols";
import { WarningSign } from "./WarningSign";

const meta = {
  title: "Road Signs/WarningSign",
  component: WarningSign,
  tags: ["autodocs"],
  args: {
    borderColour: "red",
    backgroundColour: "yellow",
    symbolColour: "black",
    symbol: "CurveRight",
    gradientPercent: 10,
    size: 200,
  },
  argTypes: {
    borderColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    backgroundColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    symbolColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    symbol: {
      control: "select",
      options: WARNING_SIGN_SYMBOL_OPTIONS,
    },
    gradientPercent: {
      control: { type: "number", min: 1, max: 99, step: 1 },
      description: 'Gradient percentage shown on SteepDescent/SteepAscent signs (e.g. "10" renders as "10%"). Ignored for other symbols.',
    },
    size: {
      control: { type: "number", min: 60, max: 480, step: 10 },
    },
  },
} satisfies Meta<typeof WarningSign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};

export const CurveRight: Story = {
  args: {
    symbol: "CurveRight",
  },
};

export const AllSymbols: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start" }}>
      {WARNING_SIGN_SYMBOL_OPTIONS.map((symbol) => (
        <WarningSign key={symbol} {...args} symbol={symbol} size={120} />
      ))}
    </div>
  ),
};

export const SteepGrade: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
      <WarningSign {...args} symbol="SteepDescent" gradientPercent={args.gradientPercent} />
      <WarningSign {...args} symbol="SteepAscent" gradientPercent={args.gradientPercent} />
    </div>
  ),
  args: {
    gradientPercent: 12,
  },
};
