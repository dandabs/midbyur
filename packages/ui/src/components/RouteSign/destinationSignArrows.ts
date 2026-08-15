/**
 * Arrow path data for `DestinationSign`, extracted with the `svgelements`
 * bbox/`d` technique documented in repo memory. Three base shapes are
 * stored (each pointing right/up, i.e. the "positive" direction); the
 * mirrored opposite of each is drawn via a horizontal flip at draw time in
 * `DestinationSign.tsx` rather than being stored twice:
 *  - `straightRight` / `straightLeft` (mirrored): a plain full-width
 *    horizontal arrow, extracted from the white glyph on
 *    `Iceland_road_sign_J12.11.svg` (a bare rectangular "direction of
 *    travel" supplementary road sign -- `J12.12.svg`'s left-pointing glyph
 *    is this same shape mirrored, confirmed by near-identical bbox/path
 *    structure).
 *  - `up`: a plain full-height straight arrow, extracted from
 *    `Iceland_road_sign_J12.31.svg`. Symmetric, so no mirrored variant.
 *  - `turnRight` / `turnLeft` (mirrored): an arrow that curves 90 degrees
 *    from a vertical foot into a horizontal arrowhead, extracted from
 *    `Iceland_road_sign_J12.21.svg` (`J12.22.svg`'s mirror-image left turn
 *    confirmed the same way).
 *  - `chevronRight` / `chevronLeft` (mirrored): a thin open chevron/bracket
 *    shape (not a filled arrowhead), extracted from the small marker drawn
 *    after the place name on a "place (turn off)" sign,
 *    `F12.11.svg` -- its third `<path>` element (`path7220`), bbox/`d`
 *    extracted with the same `svgelements` technique as the other shapes.
 */

export type DestinationSignBBox = Readonly<{ minX: number; minY: number; maxX: number; maxY: number }>;

export type DestinationSignBaseArrow = "up" | "straightRight" | "turnRight" | "diagonalUpRight" | "chevronRight";

export const DESTINATION_SIGN_ARROW_BBOX: Readonly<Record<DestinationSignBaseArrow, DestinationSignBBox>> = {
  up: { minX: 87.104862, minY: 21.597154, maxX: 164.699426, maxY: 135.510386 },
  straightRight: { minX: 68.343168, minY: 39.756488, maxX: 182.256398, maxY: 117.351052 },
  turnRight: { minX: 69.830749, minY: 20.546836, maxX: 188.076279, maxY: 131.102905 },
  diagonalUpRight: { minX: 772.655538, minY: 54.265056, maxX: 858.536872, maxY: 160.343728 },
  chevronRight: { minX: -1041.5183, minY: -448.96394, maxX: -964.74106, maxY: -324.96032 },
};

export const destinationSignArrowPaths: Readonly<Record<DestinationSignBaseArrow, string>> = {
  up: "m 125.908865,21.597154 c 0.444848,0 1.260402,0.23326 1.482825,0.53905 l 36.798788,49.115742 c 0.65442,0.87034 0.667272,1.84996 0.09885,2.76881 c -0.581268,0.9311 -1.495183,1.38441 -2.582588,1.16388 l -22.254739,-4.47174 l 0,64.79749 l -27.098637,0 l 0,-64.79749 l -22.254739,4.47174 c -1.087406,0.22053 -2.001815,-0.23326 -2.582588,-1.16388 c -0.568416,-0.91835 -0.555566,-1.89896 0.08897,-2.76881 l 36.811641,-49.115742 c 0.172997,-0.23326 1.087406,-0.53905 1.495183,-0.53905 z",
  straightRight:
    "m 182.256398,78.547049 c 0,-0.444848 -0.23326,-1.260402 -0.53905,-1.482825 l -49.11574,-36.798788 c -0.87034,-0.65442 -1.84996,-0.667272 -2.76881,-0.09885 c -0.9311,0.581268 -1.38441,1.495183 -1.16388,2.582588 l 4.47174,22.25474 l -64.79749,0 l 0,27.098637 l 64.79749,0 l -4.47174,22.25473878 c -0.22053,1.087406 0.23326,2.00181502 1.16388,2.58258802 c 0.91835,0.568416 1.89896,0.555566 2.76881,-0.08897 L 181.717348,80.039267 c 0.23326,-0.172997 0.53905,-1.087406 0.53905,-1.495183 z",
  turnRight:
    "m 69.833269,87.614823 c 0,-22.977532 18.34412,-41.467363 41.1127,-41.467363 l 27.31733,0.01003 l -4.54875,-22.576397 c -0.22371,-1.103122 0.23564,-2.030747 1.18069,-2.607379 c 0.94454,-0.589669 1.9388,-0.576632 2.82121,0.09025 l 49.82492,37.330655 c 0.23663,0.175496 0.53491,1.103122 0.53491,1.516793 c 0,0.451277 -0.23664,1.278618 -0.53491,1.504257 l -49.82492,37.343191 c -0.8829,0.664882 -1.88909,0.676916 -2.82121,0.09026 c -0.93163,-0.601703 -1.4044,-1.504258 -1.18069,-2.60738 l 4.54875,-22.588931 l -27.31733,0 c -7.64338,0 -13.86994,6.255204 -13.86994,13.964522 l 0.0199,43.485574 l -27.25518,0 l -0.01,-43.485073 z",
  diagonalUpRight:
    "m 798.583348,160.335938 l 38.59807,-51.37512 l 13.02618,13.7202 c 1.05064,1.10331 2.18883,1.53039 3.68364,1.26418 c 2.58033,-0.46269 1.72614,-3.826 1.85072,-6.44191 l 2.74048,-56.37561 c 0,0 0.56945,-4.18191 -1.97529,-6.03263 c -2.54472,-1.85071 -6.35293,-0.0285 -6.35293,-0.0285 l -52.76316,20.05534 c -2.45575,0.92535 -5.83687,1.13889 -5.55214,3.73702 c 0.14235,1.5126 0.96094,2.47354 2.33119,3.11418 l 17.06572,8.16805 l -38.58029,51.35734 l 25.92781,18.84525 z",
  chevronRight:
    "m -1041.4632,-324.96032 14.5001,0 62.22204,-61.83661 -62.11194,-62.16701 -14.6653,0 62.79104,62.05687 -62.73594,61.94675",
};
