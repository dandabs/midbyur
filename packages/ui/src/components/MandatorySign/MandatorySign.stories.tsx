import type { Meta, StoryObj } from "@storybook/react";
import { ROAD_SIGN_COLOUR_OPTIONS } from "../WarningSign/roadSignColors";
import { MandatorySign } from "./MandatorySign";
import { MANDATORY_SIGN_SYMBOL_OPTIONS } from "./mandatorySignSymbols";

const meta = {
  title: "Road Signs/MandatorySign",
  component: MandatorySign,
  tags: ["autodocs"],
  args: {
    backgroundColour: "blue",
    backgroundBorderColour: "white",
    borderColour: "black",
    symbolColour: "white",
    symbol: "GoRight",
    size: 200,
  },
  argTypes: {
    backgroundColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    backgroundBorderColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    borderColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    symbolColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    symbol: {
      control: "select",
      options: [undefined, ...MANDATORY_SIGN_SYMBOL_OPTIONS],
    },
    secondSymbol: {
      control: "select",
      options: [undefined, ...MANDATORY_SIGN_SYMBOL_OPTIONS],
    },
    secondSymbolLocation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    size: {
      control: { type: "number", min: 60, max: 480, step: 10 },
    },
  },
} satisfies Meta<typeof MandatorySign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};

export const Roundabout: Story = {
  args: { symbol: "Roundabout" },
};

export const BikesAndPedestriansOnly: Story = {
  args: { symbol: "Pedestrian", secondSymbol: "Bike", secondSymbolLocation: "vertical" },
};

export const SeparateLanesForPedestriansAndBikes: Story = {
  args: { symbol: "Bike", secondSymbol: "Pedestrian", secondSymbolLocation: "horizontal" },
};

export const AllSymbols: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start" }}>
      {MANDATORY_SIGN_SYMBOL_OPTIONS.map((symbol) => (
        <MandatorySign key={symbol} {...args} symbol={symbol} secondSymbol={undefined} size={120} />
      ))}
    </div>
  ),
};
