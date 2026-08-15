import type { Meta, StoryObj } from "@storybook/react";
import { ROAD_SIGN_COLOUR_OPTIONS } from "../WarningSign/roadSignColors";
import { DestinationSign } from "./DestinationSign";

const meta = {
  title: "Road Signs/RouteSign/DestinationSign",
  component: DestinationSign,
  tags: ["autodocs"],
  args: {
    text: ["Mosfellsbær"],
    textColour: "black",
    backgroundColour: "yellow",
    borderColour: "black",
    roadNumbers: [
      { text: "1", borderStyle: "dashed" },
      { text: "49" },
    ],
    arrow: "diagonalUpRight",
    rowHeight: 90,
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
    arrow: {
      control: "select",
      options: ["up", "left", "right", "turnLeft", "turnRight", "diagonalUpLeft", "diagonalUpRight"],
    },
    rowHeight: {
      control: { type: "number", min: 50, max: 200, step: 10 },
    },
  },
} satisfies Meta<typeof DestinationSign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    roadNumbers: [{
      "text": "1",
      "borderStyle": "dashed"
    }]
  },
};

/** Matches the reference artwork (https://upload.wikimedia.org/wikipedia/commons/0/0a/F05.51.svg): a single destination name centred alongside a dashed "1" box stacked above a solid "49" box, with a diagonal up-right arrow. */
export const ReferenceMatch: Story = {
  args: {},
};

/** No road numbers -- just a destination name and an arrow. */
export const NoRoadNumbers: Story = {
  args: { roadNumbers: [] },
};

/** No arrow. */
export const NoArrow: Story = {
  args: { arrow: undefined },
};

/** Multiple destination names, each lining up with its own road number below the last. */
export const MultipleLines: Story = {
  args: {
    text: ["Reykjavík", "Selfoss"],
    roadNumbers: [{ text: "1" }, { text: "1" }],
    arrow: "up",
  },
};

/** A left-pointing arrow, mirrored from the same base shape as `right`. */
export const LeftArrow: Story = {
  args: { arrow: "left", roadNumbers: [] },
};
