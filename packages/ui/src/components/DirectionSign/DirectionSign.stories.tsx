import type { Meta, StoryObj } from "@storybook/react";
import { ROAD_SIGN_COLOUR_OPTIONS } from "../WarningSign/roadSignColors";
import { DirectionSign } from "./DirectionSign";

const meta = {
  title: "Road Signs/DirectionSign",
  component: DirectionSign,
  tags: ["autodocs"],
  args: {
    backgroundColour: "blue",
    backgroundBorderColour: "white",
    borderColour: "black",
    arrowColour: "white",
    size: 200,
    lanes: [{ arrow: "up" }],
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
    arrowColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    size: {
      control: { type: "number", min: 60, max: 480, step: 10 },
    },
  },
} satisfies Meta<typeof DirectionSign>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A single lane, straight ahead -- the sign's minimum (square) size. */
export const Playground: Story = {
  args: {},
};

/** "Reduction of available lanes (option 1)" -- a lane ending and merging right into the straight-ahead lane beside it. */
export const ReductionOfAvailableLanes: Story = {
  args: {
    lanes: [{ arrow: "laneEndRight" }, { arrow: "up" }],
  },
};

/** "Reduction of available lanes (option 2)" -- two through lanes with a third lane ending and merging left into the middle lane. */
export const ReductionOfAvailableLanesThreeLanes: Story = {
  args: {
    lanes: [{ arrow: "up" }, { arrow: "up" }, { arrow: "laneEndLeft" }],
  },
};

/** "Lane directions and restriction (bus lane on right)" -- a straight lane next to a straight lane restricted to a specific vehicle type, with a text exemption box. */
export const RestrictedLane: Story = {
  args: {
    lanes: [
      { arrow: "up" },
      {
        arrow: "up",
        restriction: {
          roundelColour: "yellow",
          ringColour: "red",
          text: ["NEMA", "SVR", "TAXI"],
        },
      },
    ],
  },
};

/** A restriction roundel can show any prohibitory sign (here, "no trucks") instead of just a plain colour circle -- same `symbol`/`strikethroughColour`/`alternateStrikethroughColour` props as `ProhibitorySign`. */
export const RestrictedLaneWithProhibitorySymbol: Story = {
  args: {
    lanes: [{
      "arrow": "up"
    }, {
      "arrow": "up",

      "restriction": {
        "roundelColour": "yellow",
        "ringColour": "red",
        "symbol": "Snowmobile"
      }
    }],
  },
};

/** "Lane directions and recommendation (heavy vehicles on right)" -- a down lane, a straight lane, and a straight lane recommended for the given vehicle types. */
/** "Lane directions and recommendation (heavy vehicles on right)" -- a down lane, a straight lane, and a straight lane recommended for the given vehicle types. `vehicles` also accepts "snowmobile", "bicycle", and "motorbike" (sourced from the matching `ProhibitorySign` symbols), alongside "truck"/"bus"/"caravanCar". */
export const HeavyVehiclesOnRight: Story = {
  args: {
    lanes: [
      { arrow: "down" },
      { arrow: "up" },
      { arrow: "up", vehicles: ["truck", "bus", "caravanCar", "snowmobile", "bicycle", "motorbike"] },
    ],
  },
};

/** "Approach lane merges right" -- an oncoming-direction lane next to a straight lane with a small merge arrow overlaid on its stem from the right. */
export const ApproachLaneMergesRight: Story = {
  args: {
    lanes: [{ arrow: "down" }, { arrow: "up", merge: "right" }],
  },
};

/** A curving lane that keeps its own natural (shorter) height, bottom-aligned with the straight lane beside it (unlike `laneEndLeft`/`Right`'s softer diagonal merge, or the shorter `left`/`right` turn-only hook, which is solo-only). */
export const CurveOutLeft: Story = {
  args: {
    lanes: [{ arrow: "curveOutLeft" }, { arrow: "up" }],
  },
};

/** "Mandatory direction (straight ahead or turn left)" -- a single lane forking straight+left, filling the whole board (solo-only, like `upRight`/`upLeftRight`). */
export const UpLeft: Story = {
  args: {
    lanes: [{ arrow: "upLeft" }],
  },
};

/** "Mandatory direction (straight ahead or turn right)" -- a single lane forking straight+right, filling the whole board (solo-only, like `upLeft`/`upLeftRight`). */
export const UpRight: Story = {
  args: {
    lanes: [{ arrow: "upRight" }],
  },
};

/** A single lane forking in all three directions, filling the whole board (solo-only, like `upLeft`/`upRight`). */
export const ThreeWayFork: Story = {
  args: {
    lanes: [{ arrow: "upLeftRight" }],
  },
};

/** Four lanes -- demonstrates the board stretching wider than its minimum square size. */
export const FourLanes: Story = {
  args: {
    lanes: [{
      "arrow": "curveOutLeft"
    }, {
      "arrow": "up"
    }, {
      "arrow": "up"
    }, {
      "arrow": "diagonalUpRight"
    }],
  },
};
