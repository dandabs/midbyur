/**
 * Shared outline/background geometry for Icelandic circular prohibitory signs
 * (class B signs, e.g. B01.11 "Bannað að aka inn í götu" / closed to all
 * vehicles).
 *
 * The two circle paths below are extracted as-is from the reference artwork
 * `Iceland_road_sign_B01.11.svg` (Wikimedia Commons), keeping the original
 * `<g transform>` so the coordinates line up without needing to be
 * recomputed. Only the fill colours were stripped out, since those are
 * supplied by the `ProhibitorySign` component's props instead.
 *
 * Unlike `WarningSign`'s triangle (a fixed outline + inset shape), several
 * prohibitory-sign decorations (the strikethrough bar, the "end of
 * prohibition" stripes, the optional square backing plate) vary in extent
 * depending on props, so those are generated procedurally by the `build*`
 * helpers below instead of being baked into fixed path strings.
 */
export const PROHIBITORY_SIGN_VIEW_BOX = "0 0 601.04382 601.04388";

export const PROHIBITORY_SIGN_GROUP_TRANSFORM = "translate(536.01595,-69.764506)";

/** Outer circle — rendered first, coloured by `borderColour` (falls back to `backgroundColour` when unset). */
export const PROHIBITORY_SIGN_OUTER_CIRCLE_PATH =
  "m -535.81595,370.29825 c 0,-165.87252 134.4213,-300.31011 300.31011,-300.31011 165.90635,0 300.33374,134.43759 300.33374,300.31011 0,165.87253 -134.42739,300.33374 -300.33374,300.33374 -165.88881,0 -300.31011,-134.46121 -300.31011,-300.33374";

/** Inset circle — rendered on top of the outer circle, coloured by `backgroundColour`. */
export const PROHIBITORY_SIGN_INNER_CIRCLE_PATH =
  "m -475.75865,370.29825 c 0,-132.61765 107.63513,-240.25281 240.25281,-240.25281 132.63983,0 240.27645,107.63516 240.27645,240.25281 0,132.64129 -107.63662,240.27645 -240.27645,240.27645 -132.61768,0 -240.25281,-107.63516 -240.25281,-240.27645";

/** Local (pre-transform) centre point shared by every prohibitory sign shape helper. */
export const PROHIBITORY_SIGN_CENTER = { x: -235.50584, y: 370.29825 } as const;

/** Radius of the outer circle (border / full background when no border is drawn). */
export const PROHIBITORY_SIGN_OUTER_RADIUS = 300.31011;

/** Radius of the inner circle (background when a border is drawn on top of it). */
export const PROHIBITORY_SIGN_INNER_RADIUS = 240.25281;

const DEG_TO_RAD = Math.PI / 180;

function rotatedRectPath(
  center: { x: number; y: number },
  angleDeg: number,
  halfLength: number,
  halfWidth: number,
): string {
  const angle = angleDeg * DEG_TO_RAD;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const px = -dy;
  const py = dx;

  const corners = [
    [-halfLength, -halfWidth],
    [halfLength, -halfWidth],
    [halfLength, halfWidth],
    [-halfLength, halfWidth],
  ].map(([along, across]) => ({
    x: center.x + dx * along + px * across,
    y: center.y + dy * along + py * across,
  }));

  const points = corners.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`);
  return `M ${points.join(" L ")} Z`;
}

/**
 * Half-width (as a fraction of `radius`) of the diagonal prohibition bar,
 * measured directly from the reference artwork rather than guessed: both
 * `Iceland_road_sign_B21.11.svg` ("parking prohibited", single bar) and
 * `Iceland_road_sign_B24.11.svg` ("stopping prohibited", crossed bars) draw
 * their diagonal bar(s) with the exact same thickness, ~0.0667 × the outer
 * circle radius. In both source files the bar/ring is one non-separable
 * compound path (a straight chord is spliced into the inner-circle arc to
 * carve the bar out of the background), so unlike the symbol paths in
 * `prohibitorySignSymbols.ts` there's no standalone "d" attribute to lift
 * verbatim — this ratio is the bar's true measured width, and `halfLength`
 * below is derived (not guessed) so the bar's corners land exactly on the
 * `radius` circle, same as in the source art.
 */
const STRIKETHROUGH_HALF_WIDTH_RATIO = 0.0667;

/**
 * A single diagonal prohibition bar spanning the full sign (or a wider
 * `radius` when the sign also has a square background), used for
 * `strikethroughColour`. Width and angle are measured from
 * `Iceland_road_sign_B21.11.svg` (see `STRIKETHROUGH_HALF_WIDTH_RATIO`).
 */
export function buildStrikethroughPath(radius: number = PROHIBITORY_SIGN_OUTER_RADIUS): string {
  const halfWidth = radius * STRIKETHROUGH_HALF_WIDTH_RATIO;
  const halfLength = Math.sqrt(radius * radius - halfWidth * halfWidth);
  return rotatedRectPath(PROHIBITORY_SIGN_CENTER, -45, halfLength, halfWidth);
}

/**
 * Two crossing diagonal bars ("X"), used for `alternateStrikethroughColour`
 * (e.g. `Iceland_road_sign_B24.11.svg`, "stopping prohibited"). Each arm uses
 * the same measured width as `buildStrikethroughPath` — the reference
 * artwork draws both signs' bars at the same thickness.
 */
export function buildAlternateStrikethroughPaths(radius: number = PROHIBITORY_SIGN_OUTER_RADIUS): readonly [string, string] {
  const halfWidth = radius * STRIKETHROUGH_HALF_WIDTH_RATIO;
  const halfLength = Math.sqrt(radius * radius - halfWidth * halfWidth);
  return [
    rotatedRectPath(PROHIBITORY_SIGN_CENTER, -45, halfLength, halfWidth),
    rotatedRectPath(PROHIBITORY_SIGN_CENTER, 45, halfLength, halfWidth),
  ];
}

/**
 * Four parallel diagonal stripes used to mark the "end of prohibition" (e.g.
 * end of a national default speed limit / overtaking restriction), lifted
 * as-is (only coordinate-shifted to the shared canonical transform, same
 * technique as `prohibitorySignSymbols.ts`) from
 * `Iceland_road_sign_B34.11.svg` ("national default speed limit resumes").
 * Unlike the other decorations here, these are not procedurally generated:
 * the reference artwork already draws them corner-to-corner across the full
 * sign, so the real path data is used directly. Always rendered in black.
 */
export const PROHIBITORY_SIGN_END_OF_PROHIBITION_STRIPE_PATHS: readonly string[] = [
  "M -402.2631,623.1258 C -407.0600,619.9437 -412.2131,616.2867 -416.8200,612.8434 L 6.4694,191.3114 C 9.9602,195.9896 13.2373,200.6440 16.4194,205.5121 L -402.2631,623.1258",
  "M -443.6065,589.7851 L -16.3989,164.5249 C -12.5044,168.6568 -8.7049,172.5988 -5.0478,176.9445 L -430.6644,601.4923 C -435.1051,597.7403 -439.3796,593.7983 -443.6065,589.7851",
  "M -467.7334,564.4233 L -42.1406,140.0418 C -37.7474,143.7225 -33.5204,147.4508 -29.3410,151.3928 L -456.3111,577.1042 C -460.2294,572.9247 -464.0527,568.8165 -467.7334,564.4233",
  "M -488.8445,535.6658 L -70.6844,118.9307 C -65.8400,122.1366 -61.1619,125.2237 -56.4837,128.6907 L -478.9657,549.8902 C -482.3853,545.2358 -485.6861,540.5339 -488.8445,535.6658",
];

/** Corner radius used for the optional square background plate. */
export const PROHIBITORY_SIGN_SQUARE_CORNER_RADIUS = 40;

/** Margin between the circle's outer edge and the square background's edge. */
export const PROHIBITORY_SIGN_SQUARE_MARGIN = 34;

/** Half the side length of the square background plate. */
export const PROHIBITORY_SIGN_SQUARE_HALF_SIDE = PROHIBITORY_SIGN_OUTER_RADIUS + PROHIBITORY_SIGN_SQUARE_MARGIN;

/**
 * A rounded-corner square centred on the sign, used for the optional
 * `squareBackgroundColour` (speed-zone signs etc.).
 */
export function buildSquareBackgroundPath(
  halfSide: number = PROHIBITORY_SIGN_SQUARE_HALF_SIDE,
  cornerRadius: number = PROHIBITORY_SIGN_SQUARE_CORNER_RADIUS,
): string {
  const { x: cx, y: cy } = PROHIBITORY_SIGN_CENTER;
  const left = cx - halfSide;
  const right = cx + halfSide;
  const top = cy - halfSide;
  const bottom = cy + halfSide;
  const r = cornerRadius;
  return [
    `M ${left + r},${top}`,
    `L ${right - r},${top}`,
    `A ${r},${r} 0 0 1 ${right},${top + r}`,
    `L ${right},${bottom - r}`,
    `A ${r},${r} 0 0 1 ${right - r},${bottom}`,
    `L ${left + r},${bottom}`,
    `A ${r},${r} 0 0 1 ${left},${bottom - r}`,
    `L ${left},${top + r}`,
    `A ${r},${r} 0 0 1 ${left + r},${top}`,
    "Z",
  ].join(" ");
}

/** Total view box half-extent needed once a square background plate is shown (adds a margin around `PROHIBITORY_SIGN_VIEW_BOX`). */
export const PROHIBITORY_SIGN_SQUARE_VIEW_BOX_PADDING = PROHIBITORY_SIGN_SQUARE_MARGIN + PROHIBITORY_SIGN_SQUARE_CORNER_RADIUS * 0;
