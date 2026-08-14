/**
 * Shared outline/background geometry for Icelandic triangular warning signs
 * (class A signs, e.g. A01.11 "Beygja til hægri" / curve to the right).
 *
 * Path data below is extracted as-is from the reference artwork
 * `Iceland_road_sign_A01.11.svg` (Wikimedia Commons), keeping the original
 * `<g transform>` so the coordinates line up without needing to be
 * recomputed. Only the fill colours were stripped out, since those are
 * supplied by the `WarningSign` component's props instead.
 */
export const WARNING_SIGN_VIEW_BOX = "0 0 550.54736 481.81937";

export const WARNING_SIGN_GROUP_TRANSFORM = "translate(535.53795,-188.51099)";

/** Outer triangle — rendered first, coloured by `borderColour`. */
export const WARNING_SIGN_OUTLINE_PATH =
  "M -242.15376,199.18377 11.745046,639.30893 c 1.60286,2.95162 3.264376,6.66559 3.264376,10.24274 0,11.47421 -9.9104381,20.77868 -21.3846568,20.77868 l -507.7780752,0 c -11.47421,0 -21.38464,-9.30447 -21.38464,-20.77868 0,-3.57715 1.64195,-7.29112 3.24483,-10.24274 l 253.91836,-440.12516 c 3.53804,-6.35284 10.37957,-10.67278 18.10072,-10.67278 7.72115,0 14.54313,4.31994 18.12028,10.67278";

/** Inset triangle — rendered on top of the outline, coloured by `backgroundColour`. */
export const WARNING_SIGN_BACKGROUND_PATH =
  "m -260.27404,283.94051 189.881669,328.33461 -379.743799,0 189.86213,-328.33461";

export const WARNING_SIGN_ASPECT_RATIO = 481.81937 / 550.54736;
