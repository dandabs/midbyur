/**
 * Shared outline/background geometry for Icelandic circular mandatory signs
 * (class C signs, e.g. C01.11 "Go right"), extracted from the reference
 * artwork (`Iceland_road_sign_C*.svg` on Wikimedia Commons).
 *
 * Unlike the prohibitory signs (`ProhibitorySign`, class B), which only
 * distinguish a border colour and a background colour, every class C
 * reference sign draws three concentric layers: a thin black outer stroke
 * (`borderColour`), a white ring between that stroke and the main circle
 * (`backgroundBorderColour`), and the main blue circle (`backgroundColour`).
 * Structurally that's just two overlapping circle paths -- an outer circle
 * (fill = `backgroundBorderColour`, stroked with `borderColour`) and a
 * smaller inner circle on top of it (fill = `backgroundColour`) -- the two
 * paths below are lifted as-is from a representative reference file
 * (`Iceland_road_sign_C01.22.svg`) using the `svgelements` bbox/`d`
 * extraction technique (see repo memory notes), which already resolves
 * coordinates to a single shared space -- no extra `<G transform>` is
 * needed, and every symbol in `mandatorySignSymbols.ts` was extracted in
 * this same coordinate space.
 */
export const MANDATORY_SIGN_VIEW_BOX = "0 0 600.17537 600.17537";

/**
 * The mandatory sign class's own blue, as used in the reference artwork
 * (`#2163AD`) -- the same reference blue used by `ServiceSign`
 * (`SERVICE_SIGN_REFERENCE_BLUE`), and noticeably brighter than the shared
 * `RoadSignColour` "blue" (`#0039A6`, taken from the class A/B warning/
 * prohibitory signs). `MandatorySign`'s `backgroundColour` prop still
 * defaults to (and can be set to) the shared `RoadSignColour` palette for
 * consistency with the rest of the sign components, but when left at its
 * default value ("blue"), the component renders the circle using this
 * reference hex instead of the shared palette's `#0039A6`, to match the
 * real signs.
 */
export const MANDATORY_SIGN_REFERENCE_BLUE = "#2163AD";

/** Local centre point shared by every mandatory sign shape/symbol. */
export const MANDATORY_SIGN_CENTER = { x: 300.087, y: 300.086 } as const;

/** Radius of the outer circle (drawn in `backgroundBorderColour`, stroked with `borderColour`). */
export const MANDATORY_SIGN_OUTER_RADIUS = 298.09;

/** Radius of the inner circle (drawn in `backgroundColour`, on top of the outer circle). */
export const MANDATORY_SIGN_INNER_RADIUS = 284.26;

/** Width of the outer stroke, matching the reference artwork's `stroke-width`. */
export const MANDATORY_SIGN_BORDER_WIDTH = 4;

/** Outer circle -- rendered first, filled with `backgroundBorderColour` and stroked with `borderColour`. */
export const MANDATORY_SIGN_OUTER_CIRCLE_PATH =
  "M 519.93065,98.7925 C 631.11307,220.2358 622.79657,408.77719 501.37098,519.94337 C 379.94536,631.10956 191.3863,622.80934 80.20393,501.36604 C -30.94614,379.95806 -22.62814,191.38285 98.79746,80.21666 C 220.22308,-30.94952 408.78062,-22.61547 519.93065,98.7925 z";

/** Inner circle -- rendered on top of the outer circle, filled with `backgroundColour`. */
export const MANDATORY_SIGN_INNER_CIRCLE_PATH =
  "M 497.5993,115.50613 C 598.39217,225.60106 590.85267,396.52901 480.77541,497.30569 C 370.68048,598.09853 199.73494,590.57509 98.94211,480.48016 C -1.85074,370.38524 5.70636,199.4412 115.80126,98.64836 C 225.87853,-2.12832 396.80645,5.4112 497.5993,115.50613";
