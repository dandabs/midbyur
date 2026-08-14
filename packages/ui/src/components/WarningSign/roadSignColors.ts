/**
 * Colour palette used across Icelandic road sign components.
 *
 * Values are taken directly from the official reference artwork (e.g. the
 * Wikimedia-hosted `Iceland_road_sign_A01.11.svg`) rather than the app theme,
 * since road sign colours are a fixed, regulated palette independent of the
 * Miðbýur UI theme (light/dark mode, brand colours, etc.).
 */
export type RoadSignColour = "red" | "yellow" | "black" | "white" | "blue" | "green";

export const roadSignColorValues: Readonly<Record<RoadSignColour, string>> = {
  red: "#D20000",
  yellow: "#F8C800",
  black: "#000000",
  white: "#FFFFFF",
  blue: "#0039A6",
  green: "#007A3D",
};

export const ROAD_SIGN_COLOUR_OPTIONS: readonly RoadSignColour[] = [
  "red",
  "yellow",
  "black",
  "white",
  "blue",
  "green",
];
