"use client";

import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import type { RoadSignColour } from "../WarningSign/roadSignColors";
import { roadSignColorValues } from "../WarningSign/roadSignColors";
import { ROAD_SIGN_FONT_FAMILY, ROAD_SIGN_LETTER_SPACING, roadSignFontWeightValues } from "../WarningSign/roadSignFonts";
import { MANDATORY_SIGN_SYMBOL_BBOX, mandatorySignSymbolPaths } from "../MandatorySign/mandatorySignSymbols";
import { ProhibitorySignGroup } from "../ProhibitorySign/ProhibitorySign";
import type { ProhibitorySignSymbol } from "../ProhibitorySign/prohibitorySignSymbols";
import { PROHIBITORY_SIGN_OUTER_RADIUS, PROHIBITORY_SIGN_VIEWBOX_CENTER } from "../ProhibitorySign/prohibitorySignShape";
import type { DirectionSignBBox, DirectionSignVehicleIcon } from "./directionSignArrows";
import {
  DIRECTION_SIGN_EXTRA_ARROW_BBOX,
  DIRECTION_SIGN_MERGE_ARROW_BBOX,
  DIRECTION_SIGN_STEM_ANCHOR_X,
  DIRECTION_SIGN_VEHICLE_ICON_BBOX,
  directionSignExtraArrowPaths,
  directionSignMergeArrowPath,
  directionSignVehicleIconPaths,
} from "./directionSignArrows";
import {
  buildRoundedRectPath,
  DIRECTION_SIGN_BORDER_WIDTH_RATIO,
  DIRECTION_SIGN_CONTENT_PADDING_X_RATIO,
  DIRECTION_SIGN_CONTENT_PADDING_Y_RATIO,
  DIRECTION_SIGN_CORNER_RADIUS_RATIO,
  DIRECTION_SIGN_FRAME_INSET_RATIO,
  DIRECTION_SIGN_FULL_LANE_WIDTH_RATIO,
  DIRECTION_SIGN_LANE_GAP_RATIO,
  DIRECTION_SIGN_LANE_WIDTH_RATIO,
  DIRECTION_SIGN_MERGE_OVERLAY_GAP_RATIO,
  DIRECTION_SIGN_MERGE_OVERLAY_HEIGHT_RATIO,
  DIRECTION_SIGN_MERGE_OVERLAY_WIDTH_RATIO,
  DIRECTION_SIGN_MODIFIER_LANE_WIDTH_RATIO,
  DIRECTION_SIGN_REFERENCE_BLUE,
  DIRECTION_SIGN_SINGLE_LANE_WIDTH_RATIO,
} from "./directionSignShape";

export type { DirectionSignVehicleIcon, RoadSignColour };

/**
 * The arrow drawn on a single lane. Most shapes are reused directly from
 * `MandatorySign`'s pictograms (`left`/`right` are `MandatorySign`'s short
 * turn-only hook, `upLeft`/`upRight`/`leftRight` are two-way forks from a
 * shared stem); the rest are direction-sign-specific artwork extracted in
 * `directionSignArrows.ts`:
 *  - `up` / `down`: a full-height straight arrow, and the same shape flipped
 *    to point the opposite way (e.g. an oncoming-traffic lane) -- sharing one
 *    source glyph guarantees they always render at the same height.
 *  - `upLeftRight`: a three-way fork (straight + left + right).
 *  - `diagonalUpLeft` / `diagonalUpRight`: a freestanding diagonal arrow with
 *    no vertical stem, indicating a merging lane with no through-lane of its
 *    own. Like `curveOutLeft`/`Right`, it keeps its own natural (shorter)
 *    proportions, is bottom-aligned with a neighbouring full-height lane, and
 *    gets the same scale boost (see `ARROW_SCALE_MULTIPLIER`) rather than
 *    being stretched to match it.
 *  - `curveOutLeft` / `curveOutRight`: an arrow that curves sharply out to
 *    one side partway up its stem -- unlike `left`/`right` (see below), it's
 *    the shape to reach for when a curving lane needs to sit *alongside*
 *    other lanes (e.g. a multi-lane "lane ends" sign), rather than being
 *    used entirely on its own. Like `laneEndLeft`/`Right` below, it keeps
 *    its natural (shorter) proportions and is bottom-aligned with a
 *    neighbouring full-height lane rather than being stretched to match it.
 *  - `laneEndLeft` / `laneEndRight`: a lane-ending arrow that curves
 *    diagonally toward the given side to merge into the next lane over --
 *    a softer diagonal merge than `curveOutLeft`/`Right`'s sharp 90-degree
 *    hook. This is the shape for a "reduction of available lanes" sign
 *    (matching `G01.21.svg`/`G01.31.svg`): the ending lane's arrow curves
 *    toward whichever lane it merges into. Like `curveOutLeft`/`Right`, it
 *    keeps its natural (shorter) proportions rather than being stretched to
 *    match a full-height neighbour, and is bottom-aligned with it instead of
 *    vertically centred.
 *
 * `left`/`right` (`MandatorySign`'s turn-only hook) are noticeably *shorter*
 * than `up`/`down` by design, and only have reference artwork for a lane
 * used **on its own** (a single-lane "mandatory turn" direction sign) -- do
 * not combine them with other lanes. For a multi-lane sign with an ending or
 * curving lane, use `laneEndLeft`/`laneEndRight` (a lane that merges into an
 * adjacent lane) or `curveOutLeft`/`curveOutRight` (a lane that sharply exits
 * to one side) instead -- both render at their own natural (shorter) height
 * and bottom-align with a full-height neighbour, rather than being stretched
 * to match it.
 *
 * `upLeft`/`upRight`/`upLeftRight` also only have reference artwork for a
 * lane used **entirely on its own** (a single-lane "mandatory turn or
 * straight ahead"/three-way-fork direction sign) -- do not combine them with
 * other lanes. Unlike the standard single-lane override, these fill the
 * whole (square) board width, with just the usual content padding left as a
 * margin around them (see `SOLO_FULL_WIDTH_DIRECTION_SIGN_ARROWS`).
 */
export type DirectionSignArrow =
  | "up"
  | "down"
  | "left"
  | "right"
  | "upLeft"
  | "upRight"
  | "leftRight"
  | "upLeftRight"
  | "diagonalUpLeft"
  | "diagonalUpRight"
  | "curveOutLeft"
  | "curveOutRight"
  | "laneEndLeft"
  | "laneEndRight";

/**
 * A prohibitory-style restriction modifier for a lane -- a small roundel
 * overlaid near the top of the lane's arrow, with an optional multi-line
 * text box below it (e.g. "NEMA SVR TAXI" on "Lane directions and
 * restriction (bus lane on right)"). The roundel itself is drawn with
 * `ProhibitorySignGroup` (the same building block `ProhibitorySign` uses),
 * so any prohibitory sign can be chosen for it via `symbol`/`strikethroughColour`/
 * `alternateStrikethroughColour`/`endOfProhibition` -- e.g. a "no trucks"
 * roundel rather than just a plain colour circle. Leaving all of those unset
 * renders a plain colour circle with a ring (no slash/symbol), matching the
 * bus-lane-exemption reference artwork this was originally modelled on.
 */
export type DirectionSignRestriction = Readonly<{
  /** Fill colour of the roundel. Defaults to "yellow". */
  roundelColour?: RoadSignColour;
  /** Colour of the ring around the roundel, and the text box's border. Defaults to "red". */
  ringColour?: RoadSignColour;
  /** Which prohibitory-sign pictogram to draw on the roundel (e.g. "Truck" for a "no trucks" restriction). Leave unset for a plain roundel with no pictogram. */
  symbol?: ProhibitorySignSymbol;
  /** Colour of the roundel's symbol pictogram. Defaults to "black". */
  symbolColour?: RoadSignColour;
  /** Colour of a single diagonal prohibition bar across the roundel (e.g. "red"). `undefined` renders no bar. */
  strikethroughColour?: RoadSignColour;
  /** Colour of crossed ("X") prohibition bars across the roundel, used instead of `strikethroughColour`. `undefined` renders no cross. */
  alternateStrikethroughColour?: RoadSignColour;
  /** Draws the "end of prohibition" diagonal stripes across the roundel. */
  endOfProhibition?: boolean;
  /** One line of text per array entry, shown in a box below the roundel. Omit for just the roundel with no text box. */
  text?: readonly string[];
  /** Colour of the text box's background. Defaults to "yellow". */
  textBackgroundColour?: RoadSignColour;
  /** Colour of the text itself. Defaults to "black". */
  textColour?: RoadSignColour;
}>;

export type DirectionSignLane = Readonly<{
  /** Which arrow shape this lane draws. */
  arrow: DirectionSignArrow;
  /**
   * An optional small diagonal merge-arrow drawn as a separate overlay on top
   * of this lane's own arrow (matching "Approach lane merges right/left") --
   * kept as its own overlay rather than a fused shape so it can be combined
   * with any base arrow.
   */
  merge?: "left" | "right";
  /** An optional prohibitory-style restriction box/roundel overlaid on this lane. */
  restriction?: DirectionSignRestriction;
  /**
   * An optional recommendation box overlaid on this lane's arrow, containing
   * the given vehicle icons stacked top-to-bottom (matching "Lane directions
   * and recommendation (heavy vehicles on right)").
   */
  vehicles?: readonly DirectionSignVehicleIcon[];
}>;

export type DirectionSignProps = Readonly<{
  /** One entry per lane, left to right. The board is a minimum of a square and stretches wider to fit however many lanes are given. */
  lanes: readonly DirectionSignLane[];
  /** Colour of the arrow pictograms. Defaults to "white". */
  arrowColour?: RoadSignColour;
  /** Colour of the main board background. Defaults to "blue". */
  backgroundColour?: RoadSignColour;
  /** Colour of the frame between the outer border and the background. Defaults to "white". */
  backgroundBorderColour?: RoadSignColour;
  /** Colour of the thin outer border stroke. Defaults to "black". */
  borderColour?: RoadSignColour;
  /** Height of the rendered sign, in pixels -- also the minimum width (a single lane is square). Width grows with the number of lanes. */
  size?: number;
}>;

/** Maps each reusable `MandatorySign` pictogram to the `DirectionSignArrow` value it stands in for. */
const MANDATORY_SIGN_ARROW_SOURCE = {
  left: "TurnLeft",
  right: "TurnRight",
  upLeft: "TurnLeftOrStraight",
  upRight: "TurnRightOrStraight",
  leftRight: "TurnLeftOrRight",
} as const;

/** Which extra (direction-sign-specific) arrows are a horizontal mirror of another stored shape, drawn via a negative x-scale instead of storing the flipped path twice. */
const MIRRORED_EXTRA_ARROWS: Readonly<Record<string, "diagonalUpRight" | "curveOutLeft" | "laneEndRight">> = {
  diagonalUpLeft: "diagonalUpRight",
  curveOutRight: "curveOutLeft",
  laneEndLeft: "laneEndRight",
};

/**
 * Arrow types that only have reference artwork for a lane used entirely on
 * its own, and are meant to fill the whole (square) board -- `upLeft`,
 * `upRight`, and `upLeftRight` (the two- and three-way forks). Unlike the
 * standard single-lane override (`DIRECTION_SIGN_SINGLE_LANE_WIDTH_RATIO`),
 * these use `DIRECTION_SIGN_FULL_LANE_WIDTH_RATIO` so they fill the board
 * with just the standard content padding left as a margin, rather than
 * staying pinched to a narrower width.
 */
const SOLO_FULL_WIDTH_DIRECTION_SIGN_ARROWS: ReadonlySet<DirectionSignArrow> = new Set(["upLeft", "upRight", "upLeftRight"]);

/** Arrows whose reference artwork only exists for a lane used on its own -- combining them with other lanes produces a mismatched/undersized result. */
const SOLO_ONLY_DIRECTION_SIGN_ARROWS: ReadonlySet<DirectionSignArrow> = new Set([
  "left",
  "right",
  "upLeft",
  "upRight",
  "upLeftRight",
]);

/** Extra scale multiplier (applied on top of the normal fit-to-box scale) for arrows that otherwise look visually undersized relative to their neighbours despite fitting their padded box exactly. */
const ARROW_SCALE_MULTIPLIER: Readonly<Partial<Record<DirectionSignArrow, number>>> = {
  curveOutLeft: 1.4,
  curveOutRight: 1.4,
  diagonalUpLeft: 1.4,
  diagonalUpRight: 1.4,
};

/** Extra one-sided gap (as a fraction of the lane's own width) reserved beyond the usual overflow room computed for a lane's arrow -- for arrows whose diagonal silhouette otherwise reads as uncomfortably close to its neighbour despite the standard overflow reservation. */
const ARROW_EXTRA_GAP_RATIO: Readonly<Partial<Record<DirectionSignArrow, number>>> = {
  diagonalUpLeft: 0.08,
  diagonalUpRight: 0.08,
};

/** Padding (as a fraction of the arrow's own fitted width) left around every lane's arrow -- kept small so the arrow fills as much of its box as possible. */
const DIRECTION_SIGN_ARROW_PADDING_RATIO = 0.035;

type Box = Readonly<{ x: number; y: number; width: number; height: number }>;

/**
 * Uniformly scale (preserving aspect ratio) and translate a path's raw
 * bounding box so it fits within an arbitrary target box, with padding on
 * every side. `flipX`/`flipY` mirror the path horizontally/vertically
 * around its own centre before placing it -- used for the direction-sign
 * shapes that only have reference artwork for one side/direction (e.g.
 * `diagonalUpRight`, or deriving "down" from the "up" glyph). By default the
 * fitted shape is centred vertically within the box. Passing `bottomY` (an
 * absolute y coordinate, same units as `box`) instead bottom-aligns the
 * shape to that exact line -- used by `DirectionSign` so every lane in a
 * row shares one common baseline (computed from the row's tallest arrow)
 * rather than each lane's arrow being centred independently, which would
 * leave differently-sized arrows (e.g. a full-height `up` next to a
 * naturally-shorter `laneEndLeft`) with mismatched, disconnected-looking
 * feet. `scaleMultiplier` boosts the computed fit scale beyond what padding
 * alone would allow (e.g. `curveOutLeft`/`Right` at 1.4x) -- the shape is
 * still aligned the same way, just larger, so it may slightly overlap its
 * padding. `anchorX` (in the same raw, pre-flip coordinates as `bbox`)
 * overrides which horizontal point gets centred in the box -- for most
 * shapes this defaults to the bbox's own centre, but `curveOutLeft`/`Right`
 * and `laneEndLeft`/`Right`'s bounding box is skewed to one side by a
 * curving arrowhead, so centring the raw bbox would leave their actual stem
 * foot off-centre; passing their `DIRECTION_SIGN_STEM_ANCHOR_X` entry here
 * keeps the stem itself centred (and thus evenly spaced from neighbouring
 * lanes' stems) regardless of flip. `box.width` still governs the fitted
 * scale directly (same as any other arrow) -- `DirectionSign`'s layout is
 * what gives such a lane extra, one-sided room via
 * `computeAnchorExtraSpace` so the shape doesn't have to shrink to
 * compensate for being re-centred on its stem.
 */
function buildFitTransform(
  bbox: DirectionSignBBox,
  box: Box,
  padding: number,
  options: Readonly<{ flipX?: boolean; flipY?: boolean; scaleMultiplier?: number; anchorX?: number; bottomY?: number }> = {},
): string {
  const { flipX = false, flipY = false, scaleMultiplier = 1, anchorX, bottomY } = options;
  const availableWidth = box.width - padding * 2;
  const availableHeight = box.height - padding * 2;
  const symbolWidth = bbox.maxX - bbox.minX;
  const symbolHeight = bbox.maxY - bbox.minY;
  const scale = Math.min(availableWidth / symbolWidth, availableHeight / symbolHeight) * scaleMultiplier;
  const symbolCenterX = (bbox.minX + bbox.maxX) / 2;
  const symbolCenterY = (bbox.minY + bbox.maxY) / 2;
  const scaleX = flipX ? -scale : scale;
  const scaleY = flipY ? -scale : scale;
  const targetCenterX = box.x + box.width / 2 - scaleX * ((anchorX ?? symbolCenterX) - symbolCenterX);
  const targetCenterY = bottomY !== undefined ? bottomY - (scale * symbolHeight) / 2 : box.y + box.height / 2;
  return `translate(${targetCenterX} ${targetCenterY}) scale(${scaleX} ${scaleY}) translate(${-symbolCenterX} ${-symbolCenterY})`;
}

/**
 * How much *extra*, one-sided room -- beyond a standard lane's own width --
 * an off-centre-anchored arrow (see `DIRECTION_SIGN_STEM_ANCHOR_X`) needs on
 * its left and right so it can keep its normal fitted size while being
 * centred on its stem rather than its own lopsided bounding box. Only the
 * side with the curving arrowhead actually needs extra room (the stem side
 * already fits within half a standard lane); `DirectionSign`'s layout adds
 * this as one-sided padding around the lane, rather than widening it
 * symmetrically -- which would waste space on the stem side and visibly
 * push neighbouring lanes further away than necessary.
 */
function computeAnchorExtraSpace(
  bbox: DirectionSignBBox,
  anchorX: number,
  flipX: boolean,
  standardWidth: number,
  standardHeight: number,
  padding: number,
  scaleMultiplier: number,
): { extraLeft: number; extraRight: number } {
  const symbolWidth = bbox.maxX - bbox.minX;
  const symbolHeight = bbox.maxY - bbox.minY;
  const availableWidth = standardWidth - padding * 2;
  const availableHeight = standardHeight - padding * 2;
  const scale = Math.min(availableWidth / symbolWidth, availableHeight / symbolHeight) * scaleMultiplier;
  const rawLeftDist = anchorX - bbox.minX;
  const rawRightDist = bbox.maxX - anchorX;
  const screenLeftDist = flipX ? rawRightDist : rawLeftDist;
  const screenRightDist = flipX ? rawLeftDist : rawRightDist;
  const standardHalf = standardWidth / 2;
  const extraLeft = Math.max(0, screenLeftDist * scale + padding - standardHalf);
  const extraRight = Math.max(0, screenRightDist * scale + padding - standardHalf);
  return { extraLeft, extraRight };
}

/** The box a lane's `merge` overlay glyph should be drawn in, positioned just clear of the lane's own arrow (with `mergeOverlayGap` between them) on the requested side -- or `undefined` if the lane has no `merge`. */
function computeMergeBox(
  side: "left" | "right" | undefined,
  {
    arrowX,
    arrowWidth,
    mergeOverlayWidth,
    mergeOverlayGap,
    mergeOverlayY,
    mergeOverlayHeight,
  }: { arrowX: number; arrowWidth: number; mergeOverlayWidth: number; mergeOverlayGap: number; mergeOverlayY: number; mergeOverlayHeight: number },
): Box | undefined {
  if (!side) return undefined;
  const x = side === "right" ? arrowX + arrowWidth + mergeOverlayGap : arrowX - mergeOverlayGap - mergeOverlayWidth;
  return { x, y: mergeOverlayY, width: mergeOverlayWidth, height: mergeOverlayHeight };
}

/** The fitted scale a shape would get from `buildFitTransform` given the same bbox/box/padding/scaleMultiplier -- used to work out an arrow's rendered size *before* rendering it, so `DirectionSign` can centre an arrow-plus-badge group as a whole. */
function computeFitScale(bbox: DirectionSignBBox, availableWidth: number, availableHeight: number, scaleMultiplier: number): number {
  const symbolWidth = bbox.maxX - bbox.minX;
  const symbolHeight = bbox.maxY - bbox.minY;
  return Math.min(availableWidth / symbolWidth, availableHeight / symbolHeight) * scaleMultiplier;
}

/** The vertical space a lane's `restriction` roundel(+text box) group needs -- shared between `DirectionSign` (to centre the arrow-plus-badge group as a whole) and `Restriction` (to actually draw it), so the two stay in sync. */
function computeRestrictionGroupHeight(laneWidth: number, restriction: DirectionSignRestriction | undefined): number {
  if (!restriction) return 0;
  const roundelRadius = laneWidth * 0.32;
  const lines = restriction.text && restriction.text.length > 0 ? restriction.text : undefined;
  if (!lines) return roundelRadius * 2;
  const boxPaddingX = laneWidth * 0.05;
  const boxPaddingY = laneWidth * 0.025;
  const boxWidth = laneWidth * 0.58;
  const boxGap = laneWidth * 0.06;
  const availableTextWidth = boxWidth - boxPaddingX * 2;
  const averageCharWidthRatio = 0.62;
  const lineSpacing = 1.1;
  const longestLineLength = Math.max(...lines.map((line) => Math.max(line.length, 1)));
  const fontSize = availableTextWidth / (longestLineLength * averageCharWidthRatio);
  const boxHeight = lines.length * fontSize * lineSpacing + boxPaddingY * 2;
  return roundelRadius * 2 + boxGap + boxHeight;
}

/** The vertical space a lane's `vehicles` icon box needs -- shared between `DirectionSign` (to centre the arrow-plus-badge group as a whole) and `VehicleBox` (to actually draw it), so the two stay in sync. */
function computeVehicleBoxHeight(laneWidth: number, icons: readonly DirectionSignVehicleIcon[] | undefined): number {
  if (!icons || icons.length === 0) return 0;
  const rowHeight = laneWidth * 0.32;
  const rowGap = laneWidth * 0.04;
  const boxPadding = laneWidth * 0.06;
  return icons.length * rowHeight + (icons.length - 1) * rowGap + boxPadding * 2;
}

/** How much of a full-height arrow's rendered height its arrowhead occupies, measured from its top -- kept clear of any badge (restriction/vehicles) drawn below it so the badge never covers the arrowhead. */
const DIRECTION_SIGN_ARROWHEAD_HEIGHT_RATIO = 0.2;

/** Resolves a `DirectionSignArrow` to the `{ d, bbox, flipX, flipY, anchorX }` needed to draw it. */
function resolveArrow(
  arrow: DirectionSignArrow,
): { d: string; bbox: DirectionSignBBox; flipX: boolean; flipY: boolean; anchorX?: number } {
  if (arrow === "up") {
    return { d: directionSignExtraArrowPaths.straightArrow, bbox: DIRECTION_SIGN_EXTRA_ARROW_BBOX.straightArrow, flipX: false, flipY: false };
  }
  if (arrow === "down") {
    // the extracted glyph points up unflipped -- flip it vertically to point down, guaranteeing an identical height to "up".
    return { d: directionSignExtraArrowPaths.straightArrow, bbox: DIRECTION_SIGN_EXTRA_ARROW_BBOX.straightArrow, flipX: false, flipY: true };
  }
  const mandatorySource = (MANDATORY_SIGN_ARROW_SOURCE as Record<string, string | undefined>)[arrow];
  if (mandatorySource) {
    const symbol = mandatorySource as keyof typeof mandatorySignSymbolPaths;
    return { d: mandatorySignSymbolPaths[symbol], bbox: MANDATORY_SIGN_SYMBOL_BBOX[symbol], flipX: false, flipY: false };
  }
  const mirroredFrom = MIRRORED_EXTRA_ARROWS[arrow];
  if (mirroredFrom) {
    return {
      d: directionSignExtraArrowPaths[mirroredFrom],
      bbox: DIRECTION_SIGN_EXTRA_ARROW_BBOX[mirroredFrom],
      flipX: true,
      flipY: false,
      anchorX: DIRECTION_SIGN_STEM_ANCHOR_X[mirroredFrom],
    };
  }
  const key = arrow as "upLeftRight" | "diagonalUpRight" | "curveOutLeft" | "laneEndRight";
  return {
    d: directionSignExtraArrowPaths[key],
    bbox: DIRECTION_SIGN_EXTRA_ARROW_BBOX[key],
    flipX: false,
    flipY: false,
    anchorX: DIRECTION_SIGN_STEM_ANCHOR_X[key],
  };
}

/** The width ratio (fraction of `size`) a lane's *arrow* needs to fit at its normal size, before the single-lane override -- unaffected by a `restriction`/`vehicles` modifier badge (see `laneWidthRatio`), so adding one doesn't inflate the arrow itself. */
function baseLaneWidthRatio(lane: DirectionSignLane): number {
  return SOLO_FULL_WIDTH_DIRECTION_SIGN_ARROWS.has(lane.arrow) ? DIRECTION_SIGN_FULL_LANE_WIDTH_RATIO : DIRECTION_SIGN_LANE_WIDTH_RATIO;
}

/** The width ratio (fraction of `size`) a lane's *slot* needs, before the single-lane override -- widened for a `restriction`/`vehicles` modifier badge so it has room for its roundel/text/icon box. `DirectionSign` fits the arrow itself to `baseLaneWidthRatio` and centres it within this wider slot, so the badge gets extra room without the arrow growing to match. */
function laneWidthRatio(lane: DirectionSignLane): number {
  let ratio = baseLaneWidthRatio(lane);
  if (lane.restriction || (lane.vehicles && lane.vehicles.length > 0)) {
    ratio = Math.max(ratio, DIRECTION_SIGN_MODIFIER_LANE_WIDTH_RATIO);
  }
  return ratio;
}

/**
 * An Icelandic class G direction sign, built from an array of per-lane arrow
 * shapes (`DirectionSign.tsx`) combined with the shared arrow/vehicle-icon
 * artwork in `directionSignArrows.ts` and board geometry in
 * `directionSignShape.ts`. The board is a minimum of a square and grows
 * wider to fit however many lanes are given. Each lane can optionally carry
 * a prohibitory-style `restriction` box/roundel or a recommendation-style
 * `vehicles` icon box. See `DirectionSign.stories.tsx` for examples.
 */
export function DirectionSign({
  lanes,
  arrowColour = "white",
  backgroundColour = "blue",
  backgroundBorderColour = "white",
  borderColour = "black",
  size = 200,
}: DirectionSignProps) {
  const laneCount = Math.max(1, lanes.length);
  const cornerRadius = size * DIRECTION_SIGN_CORNER_RADIUS_RATIO;
  const frameInset = size * DIRECTION_SIGN_FRAME_INSET_RATIO;
  const borderWidth = size * DIRECTION_SIGN_BORDER_WIDTH_RATIO;
  const contentPaddingX = size * DIRECTION_SIGN_CONTENT_PADDING_X_RATIO;
  const contentPaddingY = size * DIRECTION_SIGN_CONTENT_PADDING_Y_RATIO;
  const laneGap = size * DIRECTION_SIGN_LANE_GAP_RATIO;

  if (process.env.NODE_ENV !== "production" && lanes.length > 1) {
    for (const lane of lanes) {
      if (SOLO_FULL_WIDTH_DIRECTION_SIGN_ARROWS.has(lane.arrow)) {
        console.warn(
          `DirectionSign: the "${lane.arrow}" arrow only has reference artwork for a lane used entirely on its own -- combining it with other lanes will look mismatched.`,
        );
      } else if (SOLO_ONLY_DIRECTION_SIGN_ARROWS.has(lane.arrow)) {
        console.warn(
          `DirectionSign: the "${lane.arrow}" arrow only has reference artwork for a lane used on its own -- combining it with other lanes will look mismatched. Use "laneEndLeft"/"laneEndRight" or "curveOutLeft"/"curveOutRight" instead.`,
        );
      }
    }
  }

  const laneList = lanes.length > 0 ? lanes : [{ arrow: "up" } as DirectionSignLane];
  const laneHeight = size - contentPaddingY * 2;
  const laneInfo = laneList.map((lane) => {
    const slotRatio = laneCount === 1 ? Math.max(laneWidthRatio(lane), DIRECTION_SIGN_SINGLE_LANE_WIDTH_RATIO) : laneWidthRatio(lane);
    const slotWidth = size * slotRatio;
    const arrowRatio =
      laneCount === 1 ? Math.max(baseLaneWidthRatio(lane), DIRECTION_SIGN_SINGLE_LANE_WIDTH_RATIO) : baseLaneWidthRatio(lane);
    const arrowWidth = size * arrowRatio;
    const { bbox, flipX, anchorX } = resolveArrow(lane.arrow);
    const padding = arrowWidth * DIRECTION_SIGN_ARROW_PADDING_RATIO;
    const scaleMultiplier = ARROW_SCALE_MULTIPLIER[lane.arrow] ?? 1;
    // Reserve one-sided extra room whenever the fitted-and-scaled shape
    // would overflow a standard lane's own width -- not just for arrows with
    // an explicit `anchorX` (off-centre stem), but also for a centred arrow
    // whose `scaleMultiplier` (see `ARROW_SCALE_MULTIPLIER`, e.g.
    // `diagonalUpRight`) pushes it wider than its box on purpose. Passing
    // the bbox's own horizontal centre as the anchor when none is given
    // makes `computeAnchorExtraSpace` reserve that overflow symmetrically,
    // so it doesn't eat into the gap to the next lane.
    const effectiveAnchorX = anchorX ?? (bbox.minX + bbox.maxX) / 2;
    const { extraLeft: anchorExtraLeft, extraRight: anchorExtraRight } = computeAnchorExtraSpace(
      bbox,
      effectiveAnchorX,
      flipX,
      arrowWidth,
      laneHeight,
      padding,
      scaleMultiplier,
    );
    // A few diagonal arrows still read as uncomfortably close to their
    // neighbour even with the overflow above reserved -- add a bit more
    // buffer on top of whatever overflow was already reserved (which is
    // itself symmetric here, since `effectiveAnchorX` is the bbox's own
    // centre), rather than reserving it unconditionally and wasting space
    // on lanes that don't overflow in the first place.
    const extraGap = (ARROW_EXTRA_GAP_RATIO[lane.arrow] ?? 0) * slotWidth;
    const anchorExtraLeftWithGap = anchorExtraLeft > 0 ? anchorExtraLeft + extraGap : anchorExtraLeft;
    const anchorExtraRightWithGap = anchorExtraRight > 0 ? anchorExtraRight + extraGap : anchorExtraRight;
    // Reserve one-sided room -- beyond the arrow's own footprint, same
    // principle as `computeAnchorExtraSpace` -- for the bigger merge overlay
    // to sit fully clear of the lane's own arrow (rather than overlapping
    // it), plus a small gap, so it reads as a distinct shape instead of
    // fighting the sign for space and getting clipped by the board's edge.
    const mergeOverlayWidth = slotWidth * DIRECTION_SIGN_MERGE_OVERLAY_WIDTH_RATIO;
    const mergeOverlayGap = slotWidth * DIRECTION_SIGN_MERGE_OVERLAY_GAP_RATIO;
    const mergeReserve = lane.merge ? mergeOverlayWidth + mergeOverlayGap : 0;
    const extraLeft = anchorExtraLeftWithGap + (lane.merge === "left" ? mergeReserve : 0);
    const extraRight = anchorExtraRightWithGap + (lane.merge === "right" ? mergeReserve : 0);
    const footprintWidth = Math.max(slotWidth, arrowWidth) + extraLeft + extraRight;
    return { slotWidth, arrowWidth, extraLeft, extraRight, footprintWidth, mergeOverlayWidth, mergeOverlayGap, merge: lane.merge };
  });

  // A single-lane sign keeps the board's square minimum (`size`) so its lone
  // arrow doesn't look pinched narrower than it is tall. A multi-lane sign,
  // though, has no such minimum in the reference artwork -- it should just
  // shrink-wrap to however wide its lanes actually need, with the same
  // padding on all four sides (matching `contentPaddingY`, rather than the
  // narrower `contentPaddingX` reserved for a single-lane board's sides)
  // instead of being forced to stay at least square.
  const contentWidth = laneInfo.reduce((sum, { footprintWidth }) => sum + footprintWidth, 0) + (laneCount - 1) * laneGap;
  const sidePadding = laneCount > 1 ? contentPaddingY : contentPaddingX;
  const requiredWidth = contentWidth + sidePadding * 2;
  const width = laneCount > 1 ? requiredWidth : Math.max(size, requiredWidth);
  const startX = sidePadding + Math.max(0, width - requiredWidth) / 2;

  const backgroundFill = backgroundColour === "blue" ? DIRECTION_SIGN_REFERENCE_BLUE : roadSignColorValues[backgroundColour];

  const outerFramePath = buildRoundedRectPath(borderWidth / 2, borderWidth / 2, width - borderWidth, size - borderWidth, cornerRadius);
  const innerFillPath = buildRoundedRectPath(
    frameInset,
    frameInset,
    width - frameInset * 2,
    size - frameInset * 2,
    cornerRadius * 0.6,
  );

  const laneBoxes: Box[] = [];
  const arrowBoxes: Box[] = [];
  const mergeBoxes: (Box | undefined)[] = [];
  let cursorX = startX;
  for (const { slotWidth, arrowWidth, extraLeft, extraRight, footprintWidth, mergeOverlayWidth, mergeOverlayGap, merge } of laneInfo) {
    const slotX = cursorX + Math.max(0, footprintWidth - slotWidth) / 2;
    laneBoxes.push({ x: slotX, y: contentPaddingY, width: slotWidth, height: laneHeight });
    const arrowX = cursorX + extraLeft + Math.max(0, footprintWidth - extraLeft - extraRight - arrowWidth) / 2;
    arrowBoxes.push({ x: arrowX, y: contentPaddingY, width: arrowWidth, height: laneHeight });
    const mergeOverlayHeight = laneHeight * DIRECTION_SIGN_MERGE_OVERLAY_HEIGHT_RATIO;
    const mergeOverlayY = contentPaddingY + laneHeight * 0.4;
    mergeBoxes.push(
      computeMergeBox(merge, { arrowX, arrowWidth, mergeOverlayWidth, mergeOverlayGap, mergeOverlayY, mergeOverlayHeight }),
    );
    cursorX += footprintWidth + laneGap;
  }

  // Every lane's arrow shares one common bottom baseline (rather than each
  // being vertically centred, or bottom-aligned to its own box,
  // independently) -- otherwise differently-sized arrows in the same row
  // (e.g. a full-height `up` next to a naturally-shorter `laneEndLeft`)
  // would end up with mismatched, disconnected-looking feet. That shared
  // baseline is itself positioned so the row's tallest arrow (which spans
  // the full available height) is vertically centred within the lane,
  // which in turn centres the whole row -- including every shorter
  // arrow's now-consistent gap above its foot -- as a single unit.
  const arrowRenderInfo = laneList.map((lane, index) => {
    const { d, bbox, flipX, flipY, anchorX } = resolveArrow(lane.arrow);
    const arrowBox = arrowBoxes[index];
    const padding = arrowBox.width * DIRECTION_SIGN_ARROW_PADDING_RATIO;
    const scaleMultiplier = ARROW_SCALE_MULTIPLIER[lane.arrow] ?? 1;
    const symbolHeight = bbox.maxY - bbox.minY;
    const arrowScale = computeFitScale(bbox, arrowBox.width - padding * 2, arrowBox.height - padding * 2, scaleMultiplier);
    const arrowRenderedHeight = arrowScale * symbolHeight;
    return { d, bbox, flipX, flipY, anchorX, padding, scaleMultiplier, arrowRenderedHeight };
  });
  const maxArrowRenderedHeight = Math.max(...arrowRenderInfo.map(({ arrowRenderedHeight }) => arrowRenderedHeight));
  const commonBottomY = contentPaddingY + laneHeight / 2 + maxArrowRenderedHeight / 2;

  return (
    <Svg width={width} height={size} viewBox={`0 0 ${width} ${size}`}>
      <Path d={outerFramePath} fill={roadSignColorValues[backgroundBorderColour]} stroke={roadSignColorValues[borderColour]} strokeWidth={borderWidth} />
      <Path d={innerFillPath} fill={backgroundFill} />
      {lanes.map((lane, index) => {
        const laneBox = laneBoxes[index];
        const arrowBox = arrowBoxes[index];
        const { d, bbox, flipX, flipY, anchorX, padding, scaleMultiplier, arrowRenderedHeight } = arrowRenderInfo[index];
        const transform = buildFitTransform(bbox, arrowBox, padding, { flipX, flipY, scaleMultiplier, anchorX, bottomY: commonBottomY });

        // A lane's optional badge (restriction/vehicles) is centred within
        // the region below the arrow's own arrowhead, rather than being
        // pinned to the very bottom edge of the lane -- the arrowhead
        // (roughly its top fifth) is kept clear so the badge never covers
        // it, but the badge is otherwise free to overlap the arrow's lower
        // shaft, matching real signage where the badge sits on the stem.
        const arrowTop = commonBottomY - arrowRenderedHeight;
        const badgeRegionTop = arrowTop + arrowRenderedHeight * DIRECTION_SIGN_ARROWHEAD_HEIGHT_RATIO;
        const badgeRegionBottom = laneBox.y + laneBox.height;
        const badgeHeight = lane.restriction
          ? computeRestrictionGroupHeight(laneBox.width, lane.restriction)
          : computeVehicleBoxHeight(laneBox.width, lane.vehicles);
        const badgeTop = badgeRegionTop + Math.max(0, (badgeRegionBottom - badgeRegionTop - badgeHeight) / 2);

        return (
          <G key={`${index}-${lane.arrow}`}>
            <Path d={d} fill={roadSignColorValues[arrowColour]} transform={transform} />
            {lane.merge && mergeBoxes[index] && <MergeOverlay box={mergeBoxes[index]!} side={lane.merge} colour={arrowColour} />}
            {lane.vehicles && lane.vehicles.length > 0 && (
              <VehicleBox laneBox={laneBox} top={badgeTop} icons={lane.vehicles} />
            )}
            {lane.restriction && (
              <Restriction laneBox={laneBox} top={badgeTop} stemX={arrowBox.x + arrowBox.width / 2} restriction={lane.restriction} />
            )}
          </G>
        );
      })}
    </Svg>
  );
}

/** Draws the diagonal merge-arrow overlay for `DirectionSignLane.merge`, in the box `DirectionSign` has already reserved (via `DIRECTION_SIGN_MERGE_OVERLAY_WIDTH_RATIO`/`_GAP_RATIO`) clear of the lane's own arrow, so the two read as distinct, separately legible shapes rather than overlapping. */
function MergeOverlay({ box, side, colour }: Readonly<{ box: Box; side: "left" | "right"; colour: RoadSignColour }>) {
  const transform = buildFitTransform(DIRECTION_SIGN_MERGE_ARROW_BBOX, box, 0, { flipX: side === "left" });
  return <Path d={directionSignMergeArrowPath} fill={roadSignColorValues[colour]} transform={transform} />;
}

function VehicleBox({ laneBox, top, icons }: Readonly<{ laneBox: Box; top: number; icons: readonly DirectionSignVehicleIcon[] }>) {
  const boxWidth = laneBox.width * 0.92;
  const rowHeight = laneBox.width * 0.32;
  const rowGap = laneBox.width * 0.04;
  const boxPadding = laneBox.width * 0.06;
  const boxHeight = icons.length * rowHeight + (icons.length - 1) * rowGap + boxPadding * 2;
  const boxX = laneBox.x + (laneBox.width - boxWidth) / 2;
  const boxY = top;
  const cornerRadius = laneBox.width * 0.08;

  return (
    <G>
      <Path
        d={buildRoundedRectPath(boxX, boxY, boxWidth, boxHeight, cornerRadius)}
        fill={roadSignColorValues.white}
      />
      {icons.map((icon, index) => {
        const rowBox: Box = {
          x: boxX + boxPadding,
          y: boxY + boxPadding + index * (rowHeight + rowGap),
          width: boxWidth - boxPadding * 2,
          height: rowHeight,
        };
        const transform = buildFitTransform(DIRECTION_SIGN_VEHICLE_ICON_BBOX[icon], rowBox, 0);
        return <Path key={icon} d={directionSignVehicleIconPaths[icon]} fill={roadSignColorValues.black} transform={transform} />;
      })}
    </G>
  );
}

function Restriction({
  laneBox,
  top,
  stemX,
  restriction,
}: Readonly<{ laneBox: Box; top: number; stemX: number; restriction: DirectionSignRestriction }>) {
  const {
    roundelColour = "yellow",
    ringColour = "red",
    symbol,
    symbolColour = "black",
    strikethroughColour,
    alternateStrikethroughColour,
    endOfProhibition = false,
    text,
    textBackgroundColour = "yellow",
    textColour = "black",
  } = restriction;

  // Kept deliberately small so the badge doesn't overlap the arrowhead
  // (which occupies roughly the top fifth of a full-height arrow). Both the
  // roundel and text box are centred on the arrow's own stem (`stemX`)
  // rather than the (possibly wider, for a modifier lane) slot, so they
  // stay visually aligned with the arrow above them. `top` (computed by
  // `DirectionSign`/`computeRestrictionGroupHeight`) places the whole group
  // as part of an arrow+badge block centred together within the lane,
  // rather than being centred independently (which would let it float up
  // into the arrow instead of sitting below it). The roundel is sized
  // slightly wider than the text box below it (rather than matching or
  // being narrower), matching the reference artwork's proportions.
  const roundelRadius = laneBox.width * 0.32;
  const roundelCenterX = stemX;
  const roundelScale = roundelRadius / PROHIBITORY_SIGN_OUTER_RADIUS;

  const lines = text && text.length > 0 ? text : undefined;
  const boxPaddingX = laneBox.width * 0.05;
  const boxPaddingY = laneBox.width * 0.025;
  const boxWidth = laneBox.width * 0.58;
  const boxGap = laneBox.width * 0.06;
  const availableTextWidth = boxWidth - boxPaddingX * 2;
  // All lines share one font size (rather than each being sized to fill the
  // box on its own), sized off the longest line so every line fits -- this
  // matches real signage, where a multi-line text box is set in one
  // consistent size rather than mismatched per-line sizes. `letterSpacingRatio`
  // accounts for the per-character `ROAD_SIGN_LETTER_SPACING` gap (otherwise
  // the estimate undershoots and text can overflow the box), and
  // `fitSafetyMargin` shrinks the result a little further so the longest
  // line always sits comfortably inside the box with a small margin rather
  // than touching its edges.
  const averageCharWidthRatio = 0.62;
  const letterSpacingRatio = 0.04;
  const fitSafetyMargin = 0.8;
  const lineSpacing = 1.1;
  const longestLineLength = lines ? Math.max(...lines.map((line) => Math.max(line.length, 1))) : 1;
  const fontSize = lines
    ? (availableTextWidth * fitSafetyMargin) / (longestLineLength * (averageCharWidthRatio + letterSpacingRatio))
    : 0;
  // Shrinks tightly to however many lines of text there are -- height is
  // driven purely by the number of lines times their (single, shared) font
  // size, plus a small vertical padding top and bottom, rather than any
  // fixed/pre-allocated height.
  const boxHeight = lines ? lines.length * fontSize * lineSpacing + boxPaddingY * 2 : 0;
  const boxX = stemX - boxWidth / 2;

  const boxY = lines ? top + roundelRadius * 2 + boxGap : top;
  const roundelCenterY = top + roundelRadius;

  return (
    <G>
      <G
        transform={`translate(${roundelCenterX} ${roundelCenterY}) scale(${roundelScale}) translate(${-PROHIBITORY_SIGN_VIEWBOX_CENTER.x} ${-PROHIBITORY_SIGN_VIEWBOX_CENTER.y})`}
      >
        <ProhibitorySignGroup
          backgroundColour={roundelColour}
          borderColour={ringColour}
          symbol={symbol}
          symbolColour={symbolColour}
          strikethroughColour={strikethroughColour}
          alternateStrikethroughColour={alternateStrikethroughColour}
          endOfProhibition={endOfProhibition}
        />
      </G>
      {lines && (
        <G>
          <Path
            d={buildRoundedRectPath(boxX, boxY, boxWidth, boxHeight, laneBox.width * 0.04)}
            fill={roadSignColorValues[textBackgroundColour]}
            stroke={roadSignColorValues[ringColour]}
            strokeWidth={laneBox.width * 0.015}
          />
          {lines.map((line, index) => (
            <SvgText
              key={`${index}-${line}`}
              x={boxX + boxWidth / 2}
              y={boxY + boxPaddingY + fontSize * lineSpacing * (index + 0.5)}
              fontSize={fontSize}
              fontFamily={ROAD_SIGN_FONT_FAMILY}
              fontWeight={roadSignFontWeightValues.heavy}
              letterSpacing={ROAD_SIGN_LETTER_SPACING}
              alignmentBaseline="central"
              fill={roadSignColorValues[textColour]}
              textAnchor="middle"
            >
              {line}
            </SvgText>
          ))}
        </G>
      )}
    </G>
  );
}
