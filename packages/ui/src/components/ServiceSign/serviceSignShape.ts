/**
 * Shared board geometry for Icelandic class E service signs (rest area,
 * petrol station, hospital, rental, etc.), extracted from the reference
 * artwork (`Iceland_road_sign_<code>.svg` on Wikimedia Commons). Every
 * reference sign in this class uses the same layout: a rounded-corner white
 * board with a thin black outline, a coloured frame filling most of the
 * board, and a white square "icon slot" centred near the top of the board
 * where the frame colour shows only as a border around it.
 *
 * The frame colour in the reference artwork is `#2163AD`, which is
 * noticeably different from the shared `blue` in `roadSignColors.ts`
 * (`#0039A6`, taken from the class A/B warning/prohibitory signs) -- service
 * signs use their own, slightly brighter blue. `ServiceSign`'s
 * `backgroundBorderColour` prop still defaults to (and can be set to) the
 * shared `RoadSignColour` palette for consistency with the rest of the
 * sign components, but when left at its default value ("blue"), the
 * component renders the frame using `SERVICE_SIGN_REFERENCE_BLUE` below
 * instead of the shared palette's `#0039A6`, to match the real signs.
 */
export const SERVICE_SIGN_VIEW_BOX = "0 0 600.79077 671.07422";

export const SERVICE_SIGN_CENTER = { x: 300.395, y: 335.537 } as const;

/** The service sign class's own blue, as used in the reference artwork -- slightly brighter than the shared `RoadSignColour` "blue" (`#0039A6`). */
export const SERVICE_SIGN_REFERENCE_BLUE = "#2163AD";

/** Outer board outline (white board + thin black stroke). */
export const SERVICE_SIGN_BORDER_PATH =
  "m 30.1839,669.574198 c -15.8437,0 -28.6839,-14.34994 -28.6839,-32.05629 l 0,-603.961621 c 0,-17.681996 12.8402,-32.056289 28.6839,-32.056289 l 540.4012,0 c 15.8437,0 28.7057,14.374293 28.7057,32.056289 l 0,603.961621 c 0,17.70635 -12.862,32.05629 -28.7057,32.05629 l -540.4012,0 z";

/** Width of the outer border stroke, matching the reference artwork's `stroke-width`. */
export const SERVICE_SIGN_BORDER_WIDTH = 3;

/** Coloured frame, filling most of the board (masked by the icon slot on top of it). */
export const SERVICE_SIGN_FRAME_PATH =
  "m 13.4499,640.193338 l 0,-609.288624 c 0,-8.853184 6.4419,-16.052495 14.3638,-16.052495 l 545.1674,0 c 7.9217,0 14.3419,7.199288 14.3419,16.052495 l 0,609.288624 c 0,8.82885 -6.4201,16.02814 -14.3419,16.02814 l -545.1674,0 c -7.9219,0 -14.3638,-7.19929 -14.3638,-16.02814";

/** White square where the icon/pictogram is drawn, centred near the top of the board. */
export const SERVICE_SIGN_ICON_SLOT = {
  x: 86.336,
  y: 113.586,
  width: 429.906,
  height: 429.906,
} as const;

export function buildServiceSignIconSlotPath(): string {
  const { x, y, width, height } = SERVICE_SIGN_ICON_SLOT;
  return `M ${x},${y} h ${width} v ${height} h ${-width} z`;
}
