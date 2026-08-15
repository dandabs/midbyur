/**
 * Shared geometry for Icelandic route-sign sub-elements (`RouteSign*`) --
 * the small reusable pieces (road-number boxes, and more to come) that get
 * composed together or stacked onto other signs, as opposed to the larger
 * fixed-artwork sign classes (`WarningSign`/`ProhibitorySign`/etc.) that
 * each have one full board layout of their own.
 *
 * Unlike those classes, route-sign elements aren't traced from one single
 * piece of reference artwork -- they're small procedural shapes (rounded
 * boxes, thin dividing lines, etc.) sized in simple ratios so they can be
 * mixed and matched at a consistent scale. Ratios below were chosen to
 * visually match the proportions on the reference composite artwork (e.g.
 * the road-number boxes on `Iceland_road_sign_F05.51.svg`) rather than
 * measured from a single self-contained piece of artwork.
 */

/** Build an SVG path `d` string for a rounded rectangle. */
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

/** How many characters `RouteSignRoadNumber`'s box is fixed-width for -- its width never grows with `text`, so it stays a predictable size when stacked onto other signs. Text longer than this still fits, but shrinks below the normal, height-derived font size to do so (see `ROUTE_SIGN_ROAD_NUMBER_FONT_HEIGHT_RATIO`). */
export const ROUTE_SIGN_ROAD_NUMBER_MAX_CHARACTERS = 4;

/** Width of a `RouteSignRoadNumber` box, as a multiple of its (fixed) height -- sized so `ROUTE_SIGN_ROAD_NUMBER_MAX_CHARACTERS` characters fit at the normal font size with `ROUTE_SIGN_ROAD_NUMBER_TEXT_PADDING_X_RATIO` padding on each side. */
export const ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO = 1.95;

/** How much of a `RouteSignRoadNumber`'s allotted `size` its drawn box (background + border) actually occupies vertically, centred within that space -- kept below 1 so the box hugs its (fairly small) digit text more tightly rather than leaving a large vertical gap above/below it, while `size` itself stays the full slot height for consistent row alignment when stacked (e.g. in `DestinationSign`). Note this also sets a floor on the visible gap between two stacked boxes even when the stacking gap itself is 0 -- each box leaves `(1 - this ratio) / 2` of its own slot height as margin above and below, so this needs to stay fairly close to 1 for tightly stacked road numbers. */
export const ROUTE_SIGN_ROAD_NUMBER_BOX_HEIGHT_RATIO = 0.92;

/** Corner radius of a `RouteSignRoadNumber` box, as a fraction of its (drawn, `ROUTE_SIGN_ROAD_NUMBER_BOX_HEIGHT_RATIO`-scaled) height. */
export const ROUTE_SIGN_ROAD_NUMBER_CORNER_RADIUS_RATIO = 0.16;

/** Outline stroke width of a `RouteSignRoadNumber` box, as a fraction of its (drawn) height -- used for both `"solid"` and `"dashed"` border styles. */
export const ROUTE_SIGN_ROAD_NUMBER_BORDER_WIDTH_RATIO = 0.07;

/** Dash length of a `"dashed"` `RouteSignRoadNumber` border, as a fraction of its (drawn) height. */
export const ROUTE_SIGN_ROAD_NUMBER_DASH_LENGTH_RATIO = 0.3;

/** Gap length of a `"dashed"` `RouteSignRoadNumber` border, as a fraction of its (drawn) height. */
export const ROUTE_SIGN_ROAD_NUMBER_DASH_GAP_RATIO = 0.2;

/** Horizontal padding between a `RouteSignRoadNumber` box's inner edge and its text, on each side, as a fraction of its (drawn) height. */
export const ROUTE_SIGN_ROAD_NUMBER_TEXT_PADDING_X_RATIO = 0.18;

/** Normal font size for a `RouteSignRoadNumber`'s text, as a fraction of its allotted `size` (not the smaller drawn box height) -- used as long as `text` is short enough to fit the fixed-width box at this size; longer text shrinks below it instead of the box growing. Kept slightly smaller than `DESTINATION_SIGN_TEXT_FONT_HEIGHT_RATIO` so road-number digits read a touch smaller than a neighbouring destination name. */
export const ROUTE_SIGN_ROAD_NUMBER_FONT_HEIGHT_RATIO = 0.58;

/** Downward offset of a `RouteSignRoadNumber`'s text baseline from the box's vertical centre, as a fraction of its (own, possibly shrunk) font size -- text is anchored by baseline, not visual centre, so this nudges it down to visually centre it within the box. */
export const ROUTE_SIGN_ROAD_NUMBER_TEXT_BASELINE_OFFSET_RATIO = 0.4;

/** Approximate advance width of one road-sign-font character, as a fraction of its own font size -- used to estimate whether `text` needs to shrink below the normal font size to fit the fixed-width box. */
export const ROUTE_SIGN_ROAD_NUMBER_AVERAGE_CHAR_WIDTH_RATIO = 0.62;
