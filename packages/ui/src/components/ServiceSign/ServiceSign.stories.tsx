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
    backgroundBorderColour: "blue",
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

export const FirstAidOrHospital: Story = {
  args: { symbol: "FirstAidOrHospital", iconColour: "red" },
};

export const PoliceStation: Story = {
  args: { symbol: "PoliceStation" },
};

export const Pharmacy: Story = {
  args: { symbol: "Pharmacy", iconColour: "red" },
};

export const Information: Story = {
  args: { symbol: "Information" },
};

export const PublicTelephone: Story = {
  args: { symbol: "PublicTelephone" },
};

export const PublicLavatory: Story = {
  args: { symbol: "PublicLavatory" },
};

export const RadioStation: Story = {
  args: { symbol: "RadioStation", firstLineText: "Rás 1", secondLineText: "93,5" },
};

export const PetrolStation: Story = {
  args: { symbol: "PetrolStation" },
};

export const RepairOrWorkshop: Story = {
  args: { symbol: "RepairOrWorkshop" },
};

export const Restaurant: Story = {
  args: { symbol: "Restaurant" },
};

export const HotelOrMotel: Story = {
  args: { symbol: "HotelOrMotel" },
};

export const Campsite: Story = {
  args: { symbol: "Campsite" },
};

export const CaravanPark: Story = {
  args: { symbol: "CaravanPark" },
};

export const Church: Story = {
  args: { symbol: "Church" },
};

export const Bank: Story = {
  args: { symbol: "Bank" },
};

export const ATM: Story = {
  args: { symbol: "ATM" },
};

export const Ferry: Story = {
  args: { symbol: "Ferry" },
};

export const Airport: Story = {
  args: { symbol: "Airport" },
};

export const CarRental: Story = {
  args: { symbol: "Car", rental: true },
};

export const SnowmobileRental: Story = {
  args: { symbol: "Snowmobile", rental: true },
};

export const BikeRental: Story = {
  args: { symbol: "Bike", rental: true },
};

export const BoatRental: Story = {
  args: { symbol: "Boat", rental: true },
};
