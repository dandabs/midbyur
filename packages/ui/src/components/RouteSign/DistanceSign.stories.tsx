import type { Meta, StoryObj } from "@storybook/react";
import { ROAD_SIGN_COLOUR_OPTIONS } from "../WarningSign/roadSignColors";
import { DistanceSign } from "./DistanceSign";

const meta = {
  title: "Road Signs/RouteSign/DistanceSign",
  component: DistanceSign,
  tags: ["autodocs"],
  args: {
    roadNumber: { text: "1" },
    locations: [
      { name: "Egilsstaðir", distance: 701 },
      { name: "Ísafjörður", distance: 533 },
      { name: "Akureyri", distance: 426 },
      { name: "Borgarnes", distance: 107 },
    ],
    textColour: "black",
    backgroundColour: "yellow",
    borderColour: "black",
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
    rowHeight: {
      control: { type: "number", min: 50, max: 200, step: 10 },
    },
  },
} satisfies Meta<typeof DistanceSign>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Matches the reference artwork (https://upload.wikimedia.org/wikipedia/commons/a/a3/F19.51.svg): a "1" road-number box centred at the top, with four destinations stacked below, largest distance first. */
export const Playground: Story = {
  args: {},
};

/**
 * `locations` given out of distance order -- always redrawn with the
 * largest distance at the top regardless of input order.
 */
export const UnsortedInput: Story = {
  args: {
    locations: [
      { name: "Borgarnes", distance: 107 },
      { name: "Egilsstaðir", distance: 701 },
      { name: "Akureyri", distance: 426 },
      { name: "Ísafjörður", distance: 533 },
    ],
  },
};

/** No `roadNumber` box -- just the location/distance rows. */
export const NoRoadNumber: Story = {
  args: { roadNumber: undefined },
};

/** A single destination. */
export const SingleLocation: Story = {
  args: { locations: [{ name: "Selfoss", distance: 57 }] },
};
