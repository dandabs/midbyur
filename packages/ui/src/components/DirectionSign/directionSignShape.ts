/**
 * Shared geometry constants for `DirectionSign` (Icelandic class G direction
 * signs). Unlike the fixed-viewBox circle/board shapes used by
 * `WarningSign`/`ProhibitorySign`/`ServiceSign`/`MandatorySign`, a direction
 * sign's board isn't a fixed size -- Wikipedia's reference artwork shows the
 * sign as a rounded-rect board that's a minimum of a square and stretches
 * wider to fit however many lanes it needs, so its outer frame/corner-radius
 * path has to be built procedurally for whatever width a given `lanes` array
 * produces (see `buildRoundedRectPath` and `DirectionSign.tsx`).
 *
 * All ratios below were measured from the reference artwork (extracted via
 * `svgelements`, e.g. `G10.11.svg`'s ~202x202 single-lane board) and are
 * expressed as a fraction of the sign's height (`size`), which is always the
 * fixed/minimum dimension.
 */

/** Reference blue used by the real Icelandic artwork -- see `MandatorySign`/`ServiceSign` for the same override pattern. */
export const DIRECTION_SIGN_REFERENCE_BLUE = "#2163AD";

/** Corner radius of the outer white frame and inner blue fill, as a fraction of `size`. */
export const DIRECTION_SIGN_CORNER_RADIUS_RATIO = 0.04;

/** Gap between the outer frame's edge and the inner blue fill, as a fraction of `size`. */
export const DIRECTION_SIGN_FRAME_INSET_RATIO = 0.018;

/** Stroke width of the thin outer border, as a fraction of `size`. */
export const DIRECTION_SIGN_BORDER_WIDTH_RATIO = 0.002;

/** Horizontal gap between the board's outer edge and the first/last lane's content box, as a fraction of `size`. */
export const DIRECTION_SIGN_CONTENT_PADDING_X_RATIO = 0.075;

/** Vertical gap between the board's outer edge and a lane's content box (top and bottom), as a fraction of `size`. */
export const DIRECTION_SIGN_CONTENT_PADDING_Y_RATIO = 0.09;

/** Width of a single lane's content box, as a fraction of `size` -- used for arrows that fit comfortably in a narrow slot (`up`/`down`/`left`/`right`/`leftRight`). */
export const DIRECTION_SIGN_LANE_WIDTH_RATIO = 0.24;

/**
 * Width ratio for arrows that only have reference artwork for a lane used
 * entirely on its own and are meant to fill the whole (square) board, with
 * just the standard content padding left as a margin around them --
 * `upLeft`/`upRight`/`upLeftRight`. Derived from the board width minus the
 * horizontal content padding on both sides.
 */
export const DIRECTION_SIGN_FULL_LANE_WIDTH_RATIO = 1 - 2 * DIRECTION_SIGN_CONTENT_PADDING_X_RATIO;

/**
 * Width ratio applied (as a minimum) to a lane carrying a `restriction` or
 * `vehicles` modifier, so its badge/box has enough room without needing to
 * grow so tall that it starts overlapping the arrowhead above it.
 */
export const DIRECTION_SIGN_MODIFIER_LANE_WIDTH_RATIO = 0.36;

/** Width ratio applied (as a minimum) to the sole lane when a sign has only one, so its arrow fills the board rather than staying pinched to the standard multi-lane slot width. */
export const DIRECTION_SIGN_SINGLE_LANE_WIDTH_RATIO = 0.66;

/** Horizontal gap between adjacent lanes, as a fraction of `size`. */
export const DIRECTION_SIGN_LANE_GAP_RATIO = 0.06;

/** Width of a lane's `merge` overlay glyph, as a fraction of that lane's own slot width. `DirectionSign` reserves this much extra room to the merge's side (beyond the lane's own arrow) so the overlay never overlaps it. */
export const DIRECTION_SIGN_MERGE_OVERLAY_WIDTH_RATIO = 1;

/** Height of a lane's `merge` overlay glyph, as a fraction of the lane's content height. */
export const DIRECTION_SIGN_MERGE_OVERLAY_HEIGHT_RATIO = 0.4;

/** Gap left between a lane's own arrow and its `merge` overlay glyph, as a fraction of the lane's slot width -- keeps the two reading as distinct shapes instead of touching. */
export const DIRECTION_SIGN_MERGE_OVERLAY_GAP_RATIO = 0;

/**
 * Build an SVG path `d` string for a rounded rectangle. Used for the sign's
 * outer/inner board frame (which must stretch to fit however many lanes are
 * requested) as well as the procedurally-drawn restriction/recommendation
 * modifier boxes.
 */
export function buildRoundedRectPath(x: number, y: number, width: number, height: number, radius: number): string {
  const r = Math.min(radius, width / 2, height / 2);
  return [
    `M ${x + r},${y}`,
    `H ${x + width - r}`,
    `A ${r},${r} 0 0 1 ${x + width},${y + r}`,
    `V ${y + height - r}`,
    `A ${r},${r} 0 0 1 ${x + width - r},${y + height}`,
    `H ${x + r}`,
    `A ${r},${r} 0 0 1 ${x},${y + height - r}`,
    `V ${y + r}`,
    `A ${r},${r} 0 0 1 ${x + r},${y}`,
    "Z",
  ].join(" ");
}
