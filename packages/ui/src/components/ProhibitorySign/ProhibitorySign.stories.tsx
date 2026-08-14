import type { Meta, StoryObj } from "@storybook/react";
import { ROAD_SIGN_COLOUR_OPTIONS } from "../WarningSign/roadSignColors";
import { PROHIBITORY_SIGN_SYMBOL_OPTIONS } from "./prohibitorySignSymbols";
import { ProhibitorySign } from "./ProhibitorySign";

const meta = {
  title: "Road Signs/ProhibitorySign",
  component: ProhibitorySign,
  tags: ["autodocs"],
  args: {
    backgroundColour: "yellow",
    borderColour: "red",
    symbolColour: "black",
    symbol: "Car",
    size: 200,
  },
  argTypes: {
    backgroundColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    borderColour: {
      control: "select",
      options: [undefined, ...ROAD_SIGN_COLOUR_OPTIONS],
    },
    strikethroughColour: {
      control: "select",
      options: [undefined, ...ROAD_SIGN_COLOUR_OPTIONS],
    },
    alternateStrikethroughColour: {
      control: "select",
      options: [undefined, ...ROAD_SIGN_COLOUR_OPTIONS],
    },
    symbolColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    symbol: {
      control: "select",
      options: [undefined, ...PROHIBITORY_SIGN_SYMBOL_OPTIONS],
    },
    squareBackgroundColour: {
      control: "select",
      options: [undefined, ...ROAD_SIGN_COLOUR_OPTIONS],
    },
    squareBackgroundBorderColour: {
      control: "select",
      options: [undefined, ...ROAD_SIGN_COLOUR_OPTIONS],
    },
    size: {
      control: { type: "number", min: 60, max: 480, step: 10 },
    },
  },
} satisfies Meta<typeof ProhibitorySign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};

export const ClosedToAllVehicles: Story = {
  args: {
    symbol: undefined,
  },
};

export const CarsProhibited: Story = {
  args: {
    symbol: "Car",
  },
};

export const ParkingProhibited: Story = {
  args: {
    backgroundColour: "blue",
    borderColour: undefined,
    strikethroughColour: "red",
    symbol: undefined,
  },
};

export const StoppingProhibited: Story = {
  args: {
    backgroundColour: "blue",
    borderColour: undefined,
    alternateStrikethroughColour: "red",
    symbol: undefined,
  },
};

export const EndOfOvertakingProhibition: Story = {
  args: {
    symbol: "OvertakingProhibited",
    symbolColour: "gray",
    borderColour: undefined,
    endOfProhibition: true,
  },
};

export const MaximumSpeedLimit: Story = {
  args: {
    symbol: undefined,
    firstLineText: "50",
  },
};

export const HeightLimit: Story = {
  args: {
    symbol: "HeightLimit",
    firstLineText: "4,2",
    secondLineText: "m",
  },
};

export const WidthLimit: Story = {
  args: {
    symbol: "WidthLimit",
    firstLineText: "2,2",
    secondLineText: "m",
  },
};

export const LengthLimit: Story = {
  args: {
    symbol: "LengthLimit",
    firstLineText: "10",
    secondLineText: "m",
  },
};

export const TotalWeightLimitCombination: Story = {
  args: {
    symbol: "TotalWeightLimitCombination",
    firstLineText: "20t",
  },
};

export const AxleWeightLimit: Story = {
  args: {
    symbol: "AxleWeightLimit",
    firstLineText: "5t",
  },
};

export const MinimumSpaceBetweenVehicles: Story = {
  args: {
    symbol: "MinimumSpaceBetweenVehicles",
    firstLineText: "50",
    secondLineText: "m",
  },
};

export const SpeedZone: Story = {
  args: {
    symbol: undefined,
    firstLineText: "30",
    squareBackgroundColour: "yellow",
  },
};

export const EndOfSpeedZone: Story = {
  args: {
    symbol: undefined,
    symbolColour: "gray",
    firstLineText: "30",
    borderColour: undefined,
    squareBackgroundColour: "yellow",
    squareBackgroundBorderColour: "black",
    endOfProhibition: true,
  },
};

export const AllSymbols: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start" }}>
      {PROHIBITORY_SIGN_SYMBOL_OPTIONS.map((symbol) => (
        <ProhibitorySign key={symbol} {...args} symbol={symbol} size={120} />
      ))}
    </div>
  ),
};
