/**
 * Shared geometry ratio constants for `DestinationSign`, all expressed as a
 * fraction of its `rowHeight` prop -- the height of one road-number-and-text
 * row, matching `RouteSignRoadNumber`'s own `size` prop so a `roadNumbers`
 * entry lines up exactly with its neighbouring text line. See
 * `DestinationSign.tsx` for how these combine into the full board layout.
 * Ratios were chosen to visually match the proportions of the reference
 * artwork (`F05.51.svg`, the "Mosfellsbær" destination sign) rather than
 * measured from it directly, since that file is a single fixed-content
 * composite rather than a parametric template.
 */

/** Horizontal padding between the board's inner edge and its content (road-number column, text, or arrow), on the left and right. */
export const DESTINATION_SIGN_PADDING_X_RATIO = 0.32;

/** Vertical padding between the board's inner edge and its content, on the top and bottom. */
export const DESTINATION_SIGN_PADDING_Y_RATIO = 0.2;

/** Gap between adjacent stacked rows (road-number boxes, or text lines), as a fraction of `rowHeight`. */
export const DESTINATION_SIGN_ROW_GAP_RATIO = 0.00;

/** Corner radius of the board, as a fraction of `rowHeight`. */
export const DESTINATION_SIGN_CORNER_RADIUS_RATIO = 0.16;

/** Outline stroke width of the board, as a fraction of `rowHeight`. */
export const DESTINATION_SIGN_BORDER_WIDTH_RATIO = 0.1;

/** Gap between the `roadNumbers` column and the destination text, as a fraction of `rowHeight`. */
export const DESTINATION_SIGN_ROAD_NUMBER_GAP_RATIO = 0.32;

/** Gap between the destination text and the `arrow`, as a fraction of `rowHeight`. */
export const DESTINATION_SIGN_ARROW_GAP_RATIO = 0.36;

/** Font size for a destination text line, as a fraction of `rowHeight` -- matches `ROUTE_SIGN_ROAD_NUMBER_FONT_HEIGHT_RATIO` so destination text renders at the same size as the digits in a neighbouring `RouteSignRoadNumber` box. */
export const DESTINATION_SIGN_TEXT_FONT_HEIGHT_RATIO = 0.62;

/** Approximate advance width of one road-sign-font character in destination text, as a fraction of its own font size -- used to estimate a text line's rendered width (destination text is mixed-case, so this is a little narrower than `RouteSignRoadNumber`'s all-digit estimate) so the board can grow to fit it rather than shrinking the text. */
export const DESTINATION_SIGN_TEXT_AVERAGE_CHAR_WIDTH_RATIO = 0.56;

/** Letter spacing for destination text, as a fraction of its own font size -- wider than `ROAD_SIGN_LETTER_SPACING` (used everywhere else, including `roadNumbers`) since destination names read better with extra breathing room between letters at this size. Kept as a ratio (rather than only a CSS string) so the text-width estimate below can account for the extra space it adds. */
export const DESTINATION_SIGN_TEXT_LETTER_SPACING_RATIO = 0.09;

/** CSS `letter-spacing` value derived from `DESTINATION_SIGN_TEXT_LETTER_SPACING_RATIO`, ready to pass straight to `SvgText`. */
export const DESTINATION_SIGN_TEXT_LETTER_SPACING = `${DESTINATION_SIGN_TEXT_LETTER_SPACING_RATIO}em`;

/** Extra width reserved after the end of the longest destination text line, as a fraction of `rowHeight` -- keeps the text from butting directly up against the arrow (or the board's inner edge, when there's no arrow). */
export const DESTINATION_SIGN_TEXT_END_PADDING_RATIO = 0.24;

/** Height of the `arrow`, as a fraction of a single `rowHeight` -- fixed regardless of how many `roadNumbers`/text rows are stacked, so the arrow stays a consistent size instead of growing on a taller multi-row sign (matching the same size it renders at with no road numbers/single-line text). */
export const DESTINATION_SIGN_ARROW_HEIGHT_RATIO = 0.92;
