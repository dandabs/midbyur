/**
 * Shared geometry ratio constants for `DistanceSign`, all expressed as a
 * fraction of its `rowHeight` prop -- the height of one location-name/
 * distance-number row. See `DistanceSign.tsx` for how these combine into
 * the full board layout. Ratios were chosen to visually match the
 * proportions of the reference artwork
 * (https://upload.wikimedia.org/wikipedia/commons/a/a3/F19.51.svg) rather
 * than measured from it directly, since that file is a single fixed-content
 * composite rather than a parametric template.
 */

/** Horizontal padding between the board's inner edge and its content (the `roadNumber` box, location names, and distance numbers), on the left and right. */
export const DISTANCE_SIGN_PADDING_X_RATIO = 0.32;

/** Vertical padding between the board's inner edge and its content, on the top and bottom. */
export const DISTANCE_SIGN_PADDING_Y_RATIO = 0.2;

/** Gap between adjacent stacked location rows, as a fraction of `rowHeight`. */
export const DISTANCE_SIGN_ROW_GAP_RATIO = 0.1;

/**
 * How far each location row advances vertically, as a fraction of the
 * font size (not `rowHeight`) -- `rowHeight` itself is deliberately taller
 * than the text so the font isn't oversized, but rows shouldn't advance
 * by the full slot height when stacked tightly, so this controls the
 * actual line-to-line spacing independently of `DISTANCE_SIGN_ROW_GAP_RATIO`.
 */
export const DISTANCE_SIGN_ROW_LINE_HEIGHT_RATIO = 1.15;

/** Size (both width and height) of the `roadNumber` box at the top, as a fraction of `rowHeight`, matching how a `RouteSignRoadNumber` box lines up with a neighbouring text row elsewhere (e.g. `DestinationSign`). */
export const DISTANCE_SIGN_ROAD_NUMBER_SIZE_RATIO = 1;

/** Gap between the `roadNumber` box and the first location row below it, as a fraction of `rowHeight` -- matches `DESTINATION_SIGN_ROAD_NUMBER_GAP_RATIO`'s tighter spacing so the road number doesn't sit with noticeably more room around it than it does on `DestinationSign`. */
export const DISTANCE_SIGN_ROAD_NUMBER_GAP_RATIO = 0.32;

/** Corner radius of the board, as a fraction of `rowHeight`. */
export const DISTANCE_SIGN_CORNER_RADIUS_RATIO = 0.16;

/** Outline stroke width of the board, as a fraction of `rowHeight`. */
export const DISTANCE_SIGN_BORDER_WIDTH_RATIO = 0.1;

/** Letter spacing for location names and distance numbers, as a fraction of font size -- a touch wider than `DESTINATION_SIGN_TEXT_LETTER_SPACING_RATIO` since this table-style layout reads better with slightly more breathing room between letters. Kept as a ratio (rather than only a CSS string) so the text-width estimate can account for the extra space it adds. */
export const DISTANCE_SIGN_TEXT_LETTER_SPACING_RATIO = 0.12;

/** CSS `letter-spacing` value derived from `DISTANCE_SIGN_TEXT_LETTER_SPACING_RATIO`, ready to pass straight to `SvgText`. */
export const DISTANCE_SIGN_TEXT_LETTER_SPACING = `${DISTANCE_SIGN_TEXT_LETTER_SPACING_RATIO}em`;

/**
 * Minimum gap between a location name and its distance number, as a
 * fraction of `rowHeight` -- since names share a left-aligned start and
 * numbers share a right-aligned distance-number column, this is the gap
 * seen on the row with the longest name (shorter names get an even wider
 * gap for free). Sized to match the fairly generous gap between a
 * mid-length name and its number (e.g. "Akureyri" and "426"), so every row
 * gets at least that much breathing room.
 */
export const DISTANCE_SIGN_NAME_NUMBER_GAP_RATIO = 1.6;
