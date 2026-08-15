import type { Meta, StoryObj } from "@storybook/react";
import { ROAD_SIGN_COLOUR_OPTIONS } from "../WarningSign/roadSignColors";
import { StopSign } from "./StopSign";

const meta = {
  title: "Road Signs/StopSign",
  component: StopSign,
  tags: ["autodocs"],
  args: {
    backgroundColour: "red",
    backgroundBorderColour: "yellow",
    borderColour: "black",
    text: "STOP",
    textColour: "white",
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
    textColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    size: {
      control: { type: "number", min: 60, max: 480, step: 10 },
    },
  },
} satisfies Meta<typeof StopSign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    backgroundBorderColour: "white"
  },
};
