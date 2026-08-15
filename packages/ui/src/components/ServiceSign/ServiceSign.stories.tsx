import type { Meta, StoryObj } from "@storybook/react";
import { ROAD_SIGN_COLOUR_OPTIONS } from "../WarningSign/roadSignColors";
import { SERVICE_SIGN_SYMBOL_OPTIONS } from "./serviceSignSymbols";
import { ServiceSign } from "./ServiceSign";

const meta = {
  title: "Road Signs/ServiceSign",
  component: ServiceSign,
  tags: ["autodocs"],
  args: {
    backgroundColour: "white",
    backgroundBorderColour: "capitalBlue",
    borderColour: "black",
    iconColour: "black",
    symbol: "PetrolStation",
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
    iconColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    symbol: {
      control: "select",
      options: [undefined, ...SERVICE_SIGN_SYMBOL_OPTIONS],
    },
    size: {
      control: { type: "number", min: 60, max: 480, step: 10 },
    },
  },
} satisfies Meta<typeof ServiceSign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};

export const PetrolStation: Story = {
  args: { symbol: "PetrolStation" },
};

export const CarRental: Story = {
  args: { symbol: "Car", rental: true },
};

export const AllSymbols: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start" }}>
      {SERVICE_SIGN_SYMBOL_OPTIONS.map((symbol) => (
        <ServiceSign
          key={symbol}
          {...args}
          symbol={symbol}
          firstLineText={symbol === "RadioStation" ? "Rás 1" : undefined}
          secondLineText={symbol === "RadioStation" ? "93,5" : undefined}
          size={120}
        />
      ))}
    </div>
  ),
};
