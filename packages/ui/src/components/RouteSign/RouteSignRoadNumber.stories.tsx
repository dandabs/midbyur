import type { Meta, StoryObj } from "@storybook/react";
import { ROAD_SIGN_COLOUR_OPTIONS } from "../WarningSign/roadSignColors";
import { RouteSignRoadNumber } from "./RouteSignRoadNumber";

const meta = {
  title: "Road Signs/RouteSign/RoadNumber",
  component: RouteSignRoadNumber,
  tags: ["autodocs"],
  args: {
    text: "1",
    textColour: "black",
    backgroundColour: "white",
    borderColour: "black",
    borderStyle: "solid",
    size: 150,
  },
  argTypes: {
    textColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    backgroundColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    borderColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    borderStyle: {
      control: "select",
      options: ["solid", "dashed"],
    },
    size: {
      control: { type: "number", min: 60, max: 320, step: 10 },
    },
  },
} satisfies Meta<typeof RouteSignRoadNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};

/** A single-digit route number with a solid border, matching the "49" box on the reference artwork. */
export const SolidBorder: Story = {
  args: { text: "49", borderStyle: "solid" },
};

/** A route number with a dashed border, matching the "1" box on the reference artwork (used there for a proposed/temporary route number). */
export const DashedBorder: Story = {
  args: { text: "1", borderStyle: "dashed" },
};

/** The box's width is fixed for four characters at the normal font size -- longer text shrinks to fit rather than the box growing. */
export const FourCharacters: Story = {
  args: { text: "1249" },
};
