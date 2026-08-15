"use client";

import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import type { RoadSignColour } from "../WarningSign/roadSignColors";
import { roadSignColorValues } from "../WarningSign/roadSignColors";
import { ROAD_SIGN_FONT_FAMILY, roadSignFontWeightValues } from "../WarningSign/roadSignFonts";
import type { ServiceSignSymbol } from "../ServiceSign/serviceSignSymbols";
import { SERVICE_SIGN_SYMBOL_BBOX, serviceSignSymbolPaths } from "../ServiceSign/serviceSignSymbols";
import type { DestinationSignBaseArrow } from "./destinationSignArrows";
import { DESTINATION_SIGN_ARROW_BBOX, destinationSignArrowPaths } from "./destinationSignArrows";
import {
  DESTINATION_SIGN_ARROW_GAP_RATIO,
  DESTINATION_SIGN_ARROW_HEIGHT_RATIO,
  DESTINATION_SIGN_BORDER_WIDTH_RATIO,
  DESTINATION_SIGN_CORNER_RADIUS_RATIO,
  DESTINATION_SIGN_DISTANCE_NUMBER_END_PADDING_RATIO,
  DESTINATION_SIGN_DISTANCE_NUMBER_GAP_RATIO,
  DESTINATION_SIGN_ICON_BORDER_WIDTH_RATIO,
  DESTINATION_SIGN_ICON_CORNER_RADIUS_RATIO,
  DESTINATION_SIGN_ICON_GAP_RATIO,
  DESTINATION_SIGN_ICON_PADDING_RATIO,
  DESTINATION_SIGN_ICON_SIZE_RATIO,
  DESTINATION_SIGN_PADDING_X_RATIO,
  DESTINATION_SIGN_PADDING_Y_RATIO,
  DESTINATION_SIGN_POINT_LENGTH_RATIO,
  DESTINATION_SIGN_ROAD_NUMBER_GAP_RATIO,
  DESTINATION_SIGN_ROW_GAP_RATIO,
  DESTINATION_SIGN_TEXT_AVERAGE_CHAR_WIDTH_RATIO,
  DESTINATION_SIGN_TEXT_END_PADDING_RATIO,
  DESTINATION_SIGN_TEXT_FONT_HEIGHT_RATIO,
  DESTINATION_SIGN_TEXT_LETTER_SPACING,
  DESTINATION_SIGN_TEXT_LETTER_SPACING_RATIO,
} from "./destinationSignShape";
import {
  buildRoundedRectPath,
  ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_BOX_HEIGHT_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_BORDER_WIDTH_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_CORNER_RADIUS_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_TEXT_PADDING_X_RATIO,
} from "./routeSignShape";
import type { RouteSignRoadNumberProps } from "./RouteSignRoadNumber";
import { RouteSignRoadNumberGlyph } from "./RouteSignRoadNumber";

export type { RoadSignColour };

/**
 * Which direction a `DestinationSign`'s `arrow` points. `left`/`turnLeft`/
 * `diagonalUpLeft` are drawn as a horizontal mirror of their `right`
 * counterpart at draw time (see `MIRRORED_DESTINATION_SIGN_ARROWS` below)
 * rather than being stored as separate path data -- see
 * `destinationSignArrows.ts`'s doc comment for where each base shape was
 * extracted from.
 */
export type DestinationSignArrow =
  | "up"
  | "left"
  | "right"
  | "turnLeft"
  | "turnRight"
  | "diagonalUpLeft"
  | "diagonalUpRight"
  | "chevronRight"
  | "chevronLeft";

/** A road-number box to stack in `DestinationSign`'s `roadNumbers` column -- the same options as `RouteSignRoadNumber` except `size`, which `DestinationSign`'s own `rowHeight` prop controls instead so every box lines up with its neighbouring row. */
export type DestinationSignRoadNumber = Omit<RouteSignRoadNumberProps, "size">;

/**
 * A vehicle pictogram box to stack in `DestinationSign`'s `roadNumbers`
 * column instead of a road number -- e.g. `{ icon: "Boat" }` for a ferry
 * route, `{ icon: "Car" }`/`{ icon: "Snowmobile" }` for a vehicle
 * restriction. Occupies the same footprint as a `DestinationSignRoadNumber`
 * box (solid border, same size), with the pictogram fit-scaled down to fit
 * inside with padding, rather than a road number's digits.
 */
export type DestinationSignRoadNumberIcon = Readonly<{
  /**
   * Which pictogram to draw in the box, from the same registry `ServiceSign`
   * uses (see `ServiceSignSymbol`). Available icons: `FirstAidOrHospital`,
   * `PoliceStation`, `Pharmacy`, `Information`, `PublicTelephone`,
   * `PublicLavatory`, `RadioStation`, `PetrolStation`, `RepairOrWorkshop`,
   * `Restaurant`, `HotelOrMotel`, `Campsite`, `CaravanPark`, `Church`,
   * `Bank`, `ATM`, `Ferry`, `Airport`, `Car`, `Snowmobile`, `Bike`, `Boat`,
   * `Hospital`, `EmergencyShelter`, `EmergencyPhone`, `FireExtinguisher`,
   * `InformationBooth`, `Outhouse`, `WasteTankDischarge`, `TownCentre`,
   * `IndustrialPlace`, `VacationHouses`, `PlaceOfInterestIndoors`,
   * `PointOfInterest`, `HikingTrail`, `PicnicSite`, `Viewpoint`,
   * `ViewpointWithInformation`, `RubbishBin`, `RubbishContainer`,
   * `TyreRepair`, `BuffetOrConfectionery`, `RestaurantInPrivateHome`,
   * `Hostel`, `YouthHostel`, `RentalCabin`, `RefugeHut`,
   * `CookingFacilities`, `Shower`, `HotTub`, `LaundryFacilities`,
   * `MeetingFacilities`, `InternetAccess`, `SwimmingPool`,
   * `RecreationCentre`, `SportsField`, `HorseHire`, `HorseTrack`,
   * `HorseStables`, `HorsecartRental`, `Fishing`, `OceanFishing`,
   * `WhaleWatching`, `SkiLift`, `SkiLiftWithChair`, `CrossCountrySkiArea`,
   * `SnowcatTrips`, `GolfCourse`, `ShootingRange`, `WaterScooterRental`,
   * `WaterSkiing`, `RiverRafting`, `Cemetery`, `PostOffice`, `TouristShop`,
   * `Supermarket`, `Bakery`, `FoodKiosk`, `Handicrafts`, `Greenhouse`,
   * `IceCreamShop`, `ArtGallery`, `Library`, `Aquarium`,
   * `LivestockAnimalsPark`, `DogHotel`, `Veterinarian`, `MusicVenue`,
   * `BoatTrips`, `CommercialHarbour`, `AerodromeOrAirstrip`.
   */
  icon: ServiceSignSymbol;
  /** Colour of the pictogram. Defaults to "black". */
  iconColour?: RoadSignColour;
  /** Colour of the box's background fill. Defaults to "white". */
  backgroundColour?: RoadSignColour;
  /** Colour of the box's outline. Defaults to "black". */
  borderColour?: RoadSignColour;
}>;

/** One entry in `DestinationSign`'s `roadNumbers` column -- either a road-number box (`DestinationSignRoadNumber`) or a vehicle pictogram box (`DestinationSignRoadNumberIcon`), distinguished by whether it has a `text` or an `icon` property. */
export type DestinationSignRoadNumberSlot = DestinationSignRoadNumber | DestinationSignRoadNumberIcon;

function isRoadNumberIcon(slot: DestinationSignRoadNumberSlot): slot is DestinationSignRoadNumberIcon {
  return "icon" in slot;
}

/** A small pictogram box to draw for one row in `DestinationSign`'s `icons` column, beside its road number/destination text (e.g. the blue-bordered symbol box in https://upload.wikimedia.org/wikipedia/commons/e/ea/F11.51.svg). */
export type DestinationSignIcon = Readonly<{
  /** Which pictogram to draw in the icon box, from the same registry `ServiceSign` uses. */
  symbol: ServiceSignSymbol;
  /** Colour of the pictogram. Defaults to "black". */
  iconColour?: RoadSignColour;
  /** Colour of the icon box's background fill. Defaults to "white". */
  backgroundColour?: RoadSignColour;
  /** Colour of the icon box's outline. Defaults to "capitalBlue", the brighter alternate blue used by service-sign-style icon boxes (see `roadSignColors.ts`). */
  borderColour?: RoadSignColour;
}>;

export type DestinationSignProps = Readonly<{
  /** Destination name, one entry per stacked line (e.g. `["Mosfellsbær"]`). */
  text: readonly string[];
  /** Colour of the destination text. Defaults to "black". */
  textColour?: RoadSignColour;
  /** Colour of the board's background fill. Defaults to "yellow". */
  backgroundColour?: RoadSignColour;
  /** Colour of the board's outline. Defaults to "black". */
  borderColour?: RoadSignColour;
  /**
   * Road-number boxes stacked in a column to the left of `text`, one per
   * entry. When both `roadNumbers` and `text` have more than one line, row
   * `i` of each lines up with the other (matching how a real sign would
   * pair a route number with its destination on the same line). When one
   * has fewer rows than the other (e.g. the reference artwork's two
   * road-number boxes beside a single destination name), the shorter
   * column is instead centred as a whole alongside the taller one, rather
   * than only lining up with its first row.
   */
  roadNumbers?: readonly DestinationSignRoadNumberSlot[];
  /**
   * A small pictogram box drawn for one or more rows, between `roadNumbers`
   * and `text` (e.g. the service-sign-style icon beside a destination name
   * in https://upload.wikimedia.org/wikipedia/commons/e/ea/F11.51.svg).
   * Entry `i` draws for row `i` -- use `undefined` for a row with no icon
   * (e.g. `[undefined, { symbol: "PetrolStation" }]` to only draw an icon
   * on the second row). Omit entirely for no icon column at all.
   */
  icons?: readonly (DestinationSignIcon | undefined)[];
  /** Optional directional arrow drawn alongside the text. Omit for no arrow. */
  arrow?: DestinationSignArrow;
  /** Which side(s) of the content row the arrow is drawn on -- "start" draws it before the road numbers/text, "end" draws it after, "both" draws one copy on each side. Defaults to "end". Ignored when `arrow` is omitted. */
  arrowPosition?: "start" | "end" | "both";
  /**
   * Shapes the board's own outline into a point on the given side(s),
   * instead of the normal rounded corners there -- e.g. `"end"` draws a
   * sideways-arrow-shaped board pointing right, matching
   * https://upload.wikimedia.org/wikipedia/commons/1/11/F01.11.svg. `"both"`
   * points on both sides. Omit for a normal rounded-rectangle board on
   * every side.
   */
  pointed?: "start" | "end" | "both";
  /**
   * When `pointed`, whether the point protrudes past the board's normal
   * rounded-rectangle silhouette (the default, `false`), or is instead
   * "filled in" so the overall board stays a plain rounded rectangle --
   * only the `backgroundColour` fill comes to a point, inset within the
   * board, with the corner(s) it would otherwise round off filled solid
   * with `borderColour` instead, matching
   * https://upload.wikimedia.org/wikipedia/commons/e/ea/F03.51.svg. Has no
   * effect when `pointed` is omitted.
   */
  pointFilled?: boolean;
  /**
   * A small distance number (e.g. `"7"` for 7 km) drawn after `text`, near
   * a `pointed` `"end"`/`"both"` tip -- matching the numeral before the
   * arrow tip in https://upload.wikimedia.org/wikipedia/commons/e/ea/F03.51.svg.
   * Rendered in `textColour` at the same size as `text`, vertically
   * centred across the whole board rather than lining up with any single
   * row. Omit for no distance number.
   */
  distanceNumber?: string;
  /**
   * Extra width reserved after the end of the longest `text` line, in
   * pixels, on top of the normal `DESTINATION_SIGN_TEXT_END_PADDING_RATIO`-derived
   * gap -- keeps the text from butting directly up against whatever comes
   * after it (a `distanceNumber`, arrow, or the board's own inner edge/point).
   * Defaults to 0.
   */
  textEndPadding?: number;
  /**
   * Corner radius of the board's own outline, in pixels, overriding the
   * normal `DESTINATION_SIGN_CORNER_RADIUS_RATIO`-derived value -- e.g. `0`
   * for a square-cornered board, matching plain place-name/street-name/
   * house-number signs like https://en.wikipedia.org/wiki/File:F14.17.svg.
   * Has no effect on `pointed` corners, which are always sharp regardless.
   */
  cornerRadius?: number;
  /**
   * Outline stroke width of the board, in pixels, overriding the normal
   * `DESTINATION_SIGN_BORDER_WIDTH_RATIO`-derived value -- e.g. a small
   * value for the thin border on plain place-name/street-name/house-number
   * signs like https://en.wikipedia.org/wiki/File:F14.17.svg.
   */
  borderWidth?: number;
  /** Height of one road-number-box/text row, in pixels -- also the unit every other dimension (padding, gaps, font size) scales from. Defaults to 90. */
  rowHeight?: number;
}>;

const MIRRORED_DESTINATION_SIGN_ARROWS: Readonly<Partial<Record<DestinationSignArrow, DestinationSignBaseArrow>>> = {
  left: "straightRight",
  turnLeft: "turnRight",
  diagonalUpLeft: "diagonalUpRight",
  chevronLeft: "chevronRight",
};

function resolveArrow(arrow: DestinationSignArrow): Readonly<{ base: DestinationSignBaseArrow; flip: boolean }> {
  const mirroredFrom = MIRRORED_DESTINATION_SIGN_ARROWS[arrow];
  if (mirroredFrom) {
    return { base: mirroredFrom, flip: true };
  }
  return { base: arrow as DestinationSignBaseArrow, flip: false };
}

/** How far down a shorter stacked column (of `rowCount` rows, out of `totalRows` overall) should start so it's centred alongside a taller neighbouring column, rather than only lining up with the neighbour's first row. */
function computeBlockTop(rowCount: number, totalRows: number, rowHeight: number, rowGap: number): number {
  if (rowCount >= totalRows) {
    return 0;
  }
  const totalHeight = totalRows * rowHeight + (totalRows - 1) * rowGap;
  const blockHeight = rowCount * rowHeight + Math.max(rowCount - 1, 0) * rowGap;
  return (totalHeight - blockHeight) / 2;
}

/**
 * Build an SVG path `d` string for `DestinationSign`'s own board outline --
 * a rounded rectangle, except on a `pointStart`/`pointEnd` side, where the
 * two corners on that side are replaced by a single sharp point extending
 * `pointLength` past that edge, with its apex at vertical centre (see
 * `DESTINATION_SIGN_POINT_LENGTH_RATIO`).
 */
function buildBoardPath(
  box: Readonly<{ x: number; y: number; width: number; height: number; cornerRadius: number }>,
  point: Readonly<{ start: boolean; end: boolean; length: number }>,
): string {
  const left = box.x;
  const right = box.x + box.width;
  const top = box.y;
  const bottom = box.y + box.height;
  const midY = box.y + box.height / 2;
  const r = box.cornerRadius;

  const topRight = point.end
    ? [`L ${right},${top}`, `L ${right + point.length},${midY}`, `L ${right},${bottom}`]
    : [`L ${right - r},${top}`, `A ${r},${r} 0 0 1 ${right},${top + r}`, `L ${right},${bottom - r}`, `A ${r},${r} 0 0 1 ${right - r},${bottom}`];
  const bottomLeft = point.start
    ? [`L ${left},${bottom}`, `L ${left - point.length},${midY}`, `L ${left},${top}`]
    : [`L ${left + r},${bottom}`, `A ${r},${r} 0 0 1 ${left},${bottom - r}`, `L ${left},${top + r}`, `A ${r},${r} 0 0 1 ${left + r},${top}`];

  return [point.start ? `M ${left},${top}` : `M ${left + r},${top}`, ...topRight, ...bottomLeft, "Z"].join(" ");
}

/** Resolve `DestinationSign`'s `pointed` prop into which side(s) point. */
function resolvePointedSides(pointed: "start" | "end" | "both" | undefined): Readonly<{ pointStart: boolean; pointEnd: boolean }> {
  return { pointStart: pointed === "start" || pointed === "both", pointEnd: pointed === "end" || pointed === "both" };
}

/**
 * Compute `DestinationSign`'s own board outline -- normally a plain rounded
 * rectangle, `bodyWidth` wide. When `pointed`, either the whole board (fill
 * and stroked border alike) protrudes into a sharp point past its normal
 * edge on that side (the default), or -- when `pointFilled` -- the board's
 * outer silhouette stays that same plain rounded rectangle and only the
 * `backgroundColour` fill is drawn pointed, inset within it, with a second,
 * `borderColour`-filled rounded rectangle underneath standing in for both
 * the normal stroked border and the solid corner(s) next to the point that
 * a plain rounded rectangle would otherwise round off.
 */
function computeBoardGeometry(
  pointed: "start" | "end" | "both" | undefined,
  pointFilled: boolean,
  bodyWidth: number,
  height: number,
  cornerRadius: number,
  borderWidth: number,
): Readonly<{ bodyX: number; width: number; backgroundPath: string; borderPath: string; borderRenderMode: "stroke" | "fill" }> {
  const { pointStart, pointEnd } = resolvePointedSides(pointed);

  if (pointFilled) {
    const pointLength = height * DESTINATION_SIGN_POINT_LENGTH_RATIO;
    const innerCornerRadius = Math.max(cornerRadius - borderWidth, 0);
    const innerX = borderWidth + (pointStart ? pointLength : 0);
    const innerWidth = bodyWidth - borderWidth * 2 - (pointStart ? pointLength : 0) - (pointEnd ? pointLength : 0);
    const backgroundPath = buildBoardPath(
      { x: innerX, y: borderWidth, width: innerWidth, height: height - borderWidth * 2, cornerRadius: innerCornerRadius },
      { start: pointStart, end: pointEnd, length: pointLength },
    );
    const borderPath = buildRoundedRectPath(0, 0, bodyWidth, height, cornerRadius);
    return { bodyX: 0, width: bodyWidth, backgroundPath, borderPath, borderRenderMode: "fill" };
  }

  const pointLength = height * DESTINATION_SIGN_POINT_LENGTH_RATIO;
  const bodyX = pointStart ? pointLength : 0;
  const width = bodyWidth + (pointStart ? pointLength : 0) + (pointEnd ? pointLength : 0);
  const backgroundPath = buildBoardPath({ x: bodyX, y: 0, width: bodyWidth, height, cornerRadius }, { start: pointStart, end: pointEnd, length: pointLength });
  const borderPath = buildBoardPath(
    { x: bodyX + borderWidth / 2, y: borderWidth / 2, width: bodyWidth - borderWidth, height: height - borderWidth, cornerRadius },
    { start: pointStart, end: pointEnd, length: Math.max(pointLength - borderWidth / 2, 0) },
  );
  return { bodyX, width, backgroundPath, borderPath, borderRenderMode: "stroke" };
}

type DestinationSignSegmentKind = "roadNumbers" | "icons" | "text" | "distanceNumber" | "arrowStart" | "arrowEnd";

function isArrowSegmentKind(kind: DestinationSignSegmentKind): boolean {
  return kind === "arrowStart" || kind === "arrowEnd";
}

/** Gap that should precede segment `index` in `DestinationSign`'s content row -- widest around an arrow, then an icon or distance number, falling back to the (narrowest) gap used between road-number-ish content otherwise. */
function computeSegmentGap(
  segments: readonly Readonly<{ kind: DestinationSignSegmentKind; width: number }>[],
  index: number,
  gaps: Readonly<{ roadNumberGap: number; iconGap: number; arrowGap: number; distanceNumberGap: number }>,
): number {
  if (index === 0) return 0;
  const kind = segments[index].kind;
  const prevKind = segments[index - 1].kind;
  if (isArrowSegmentKind(kind) || isArrowSegmentKind(prevKind)) return gaps.arrowGap;
  if (kind === "icons" || prevKind === "icons") return gaps.iconGap;
  if (kind === "distanceNumber" || prevKind === "distanceNumber") return gaps.distanceNumberGap;
  return gaps.roadNumberGap;
}

/** Build the ordered list of content segments (road numbers, icons, text, distance number, arrows) `DestinationSign` lays out left-to-right, omitting any that have no content -- extracted from the component body purely to keep its own Cognitive Complexity down. */
function buildDestinationSignSegments(
  args: Readonly<{
    showArrowAtStart: boolean;
    showArrowAtEnd: boolean;
    roadNumberColumnWidth: number;
    hasIcons: boolean;
    iconSize: number;
    textRows: number;
    textMaxWidth: number;
    distanceNumber: string | undefined;
    distanceNumberWidth: number;
    arrowWidth: number;
  }>,
): { kind: DestinationSignSegmentKind; width: number }[] {
  const segments: { kind: DestinationSignSegmentKind; width: number }[] = [];
  if (args.showArrowAtStart) segments.push({ kind: "arrowStart", width: args.arrowWidth });
  if (args.roadNumberColumnWidth > 0) segments.push({ kind: "roadNumbers", width: args.roadNumberColumnWidth });
  if (args.hasIcons) segments.push({ kind: "icons", width: args.iconSize });
  if (args.textRows > 0) segments.push({ kind: "text", width: args.textMaxWidth });
  if (args.distanceNumber) segments.push({ kind: "distanceNumber", width: args.distanceNumberWidth });
  if (args.showArrowAtEnd) segments.push({ kind: "arrowEnd", width: args.arrowWidth });
  return segments;
}

/**
 * An Icelandic route-destination sign (e.g.
 * https://upload.wikimedia.org/wikipedia/commons/0/0a/F05.51.svg) -- a
 * yellow board pairing one or more stacked `roadNumbers` boxes
 * (`RouteSignRoadNumber`) with a destination `text` name and an optional
 * directional `arrow`. The board grows to fit its content (road numbers,
 * text, and arrow all keep their normal size) rather than shrinking
 * anything down, since this is a standalone sign rather than a piece
 * stacked onto another one. See `DestinationSign.stories.tsx` for examples.
 */
export function DestinationSign({
  text,
  textColour = "black",
  backgroundColour = "yellow",
  borderColour = "black",
  roadNumbers = [],
  icons,
  arrow,
  arrowPosition = "end",
  pointed,
  pointFilled = false,
  distanceNumber,
  textEndPadding: extraTextEndPadding = 0,
  cornerRadius: cornerRadiusOverride,
  borderWidth: borderWidthOverride,
  rowHeight = 90,
}: DestinationSignProps) {
  const roadNumberRows = roadNumbers.length;
  const textRows = text.length;
  const hasIcons = icons?.some((icon) => icon !== undefined) ?? false;
  const rows = Math.max(roadNumberRows, textRows, hasIcons ? icons!.length : 0, 1);
  const rowGap = rowHeight * DESTINATION_SIGN_ROW_GAP_RATIO;
  const contentHeight = rows * rowHeight + (rows - 1) * rowGap;

  const roadNumberBlockTop = computeBlockTop(roadNumberRows, rows, rowHeight, rowGap);
  const textBlockTop = computeBlockTop(textRows, rows, rowHeight, rowGap);

  const roadNumberColumnWidth = roadNumberRows > 0 ? rowHeight * ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO : 0;
  const iconSize = rowHeight * DESTINATION_SIGN_ICON_SIZE_RATIO;
  const iconCornerRadius = iconSize * DESTINATION_SIGN_ICON_CORNER_RADIUS_RATIO;
  const iconBorderWidth = iconSize * DESTINATION_SIGN_ICON_BORDER_WIDTH_RATIO;
  const iconPadding = iconSize * DESTINATION_SIGN_ICON_PADDING_RATIO;

  const fontSize = rowHeight * DESTINATION_SIGN_TEXT_FONT_HEIGHT_RATIO;
  // `textEndPadding` only makes sense as breathing room before whatever
  // comes *after* the text (a `distanceNumber`, or an arrow drawn at the
  // end) -- applying it when text is the last (or only) piece of content
  // just pads the right side of the board with nothing to fill it,
  // throwing text left-of-centre instead of centred/flush with the edge.
  const hasTrailingContent = !!distanceNumber || (!!arrow && (arrowPosition === "end" || arrowPosition === "both"));
  const textEndPadding = hasTrailingContent ? rowHeight * DESTINATION_SIGN_TEXT_END_PADDING_RATIO + extraTextEndPadding : 0;
  const letterSpacingWidth = fontSize * DESTINATION_SIGN_TEXT_LETTER_SPACING_RATIO;
  const textMaxWidth =
    textRows > 0
      ? Math.max(...text.map((line) => line.length * (fontSize * DESTINATION_SIGN_TEXT_AVERAGE_CHAR_WIDTH_RATIO + letterSpacingWidth))) +
        textEndPadding
      : 0;

  const resolvedArrow = arrow ? resolveArrow(arrow) : undefined;
  const arrowHeight = rowHeight * DESTINATION_SIGN_ARROW_HEIGHT_RATIO;
  const arrowBBox = resolvedArrow ? DESTINATION_SIGN_ARROW_BBOX[resolvedArrow.base] : undefined;
  const arrowWidth = arrowBBox ? (arrowHeight * (arrowBBox.maxX - arrowBBox.minX)) / (arrowBBox.maxY - arrowBBox.minY) : 0;
  const showArrowAtStart = !!resolvedArrow && (arrowPosition === "start" || arrowPosition === "both");
  const showArrowAtEnd = !!resolvedArrow && (arrowPosition === "end" || arrowPosition === "both");

  const distanceNumberWidth = distanceNumber
    ? distanceNumber.length * fontSize * DESTINATION_SIGN_TEXT_AVERAGE_CHAR_WIDTH_RATIO + rowHeight * DESTINATION_SIGN_DISTANCE_NUMBER_END_PADDING_RATIO
    : 0;

  const segments = buildDestinationSignSegments({
    showArrowAtStart,
    showArrowAtEnd,
    roadNumberColumnWidth,
    hasIcons,
    iconSize,
    textRows,
    textMaxWidth,
    distanceNumber,
    distanceNumberWidth,
    arrowWidth,
  });

  const roadNumberGap = rowHeight * DESTINATION_SIGN_ROAD_NUMBER_GAP_RATIO;
  const iconGap = rowHeight * DESTINATION_SIGN_ICON_GAP_RATIO;
  const arrowGap = rowHeight * DESTINATION_SIGN_ARROW_GAP_RATIO;
  const distanceNumberGap = rowHeight * DESTINATION_SIGN_DISTANCE_NUMBER_GAP_RATIO;
  const gapBefore = (index: number): number =>
    computeSegmentGap(segments, index, { roadNumberGap, iconGap, arrowGap, distanceNumberGap });
  const innerWidth = segments.reduce((total, segment, index) => total + gapBefore(index) + segment.width, 0);

  const paddingX = rowHeight * DESTINATION_SIGN_PADDING_X_RATIO;
  const paddingY = rowHeight * DESTINATION_SIGN_PADDING_Y_RATIO;
  const cornerRadius = cornerRadiusOverride ?? rowHeight * DESTINATION_SIGN_CORNER_RADIUS_RATIO;
  const borderWidth = borderWidthOverride ?? rowHeight * DESTINATION_SIGN_BORDER_WIDTH_RATIO;

  const bodyWidth = paddingX * 2 + innerWidth;
  const height = paddingY * 2 + contentHeight;
  // A `chevronRight`/`chevronLeft` arrow is a thin bracket-mark meant to
  // span the full board from top to bottom edge (ignoring the board's own
  // padding/border), overlapping on top of them, rather than being sized
  // and centred within the padded content area like every other arrow --
  // matching how it reads on the reference artwork
  // (https://en.wikipedia.org/wiki/File:F12.11.svg). Only its final
  // rendered size/position (used below, once `height` is known) differs
  // this way -- `arrowHeight` above (used for layout/segment width) stays
  // the normal ratio-based size.
  const isChevronArrow = resolvedArrow?.base === "chevronRight";
  const renderArrowHeight = isChevronArrow ? height : arrowHeight;
  const renderArrowY = isChevronArrow ? 0 : paddingY + (contentHeight - arrowHeight) / 2;
  const { bodyX, width, backgroundPath: boxPath, borderPath, borderRenderMode } = computeBoardGeometry(
    pointed,
    pointFilled,
    bodyWidth,
    height,
    cornerRadius,
    borderWidth,
  );

  const segmentPositions: Partial<Record<DestinationSignSegmentKind, number>> = {};
  let cursorX = bodyX + paddingX;
  segments.forEach((segment, index) => {
    cursorX += gapBefore(index);
    segmentPositions[segment.kind] = cursorX;
    cursorX += segment.width;
  });
  const roadNumberX = segmentPositions.roadNumbers;
  const iconX = segmentPositions.icons;
  const textX = segmentPositions.text;
  const distanceNumberX = segmentPositions.distanceNumber;
  const arrowStartX = segmentPositions.arrowStart;
  const arrowEndX = segmentPositions.arrowEnd;
  // `textMaxWidth` is only an *estimate* of the widest text line's rendered
  // width (see its computation above), so left-aligning at `textX` across
  // the reserved `textMaxWidth`-wide segment leaves the actual glyphs
  // off-centre by however far the estimate is wrong -- fine when other
  // content (road numbers, an arrow, ...) anchors the layout, but visibly
  // uncentred on a text-only sign, where the board's width is derived
  // solely from that same estimate. In that case, centre each line on the
  // board's true horizontal centre instead of trusting the estimate.
  const isTextOnlySign = segments.length === 1 && segments[0].kind === "text";
  const textCenterX = bodyX + bodyWidth / 2;

  // Uniformly scale (preserving aspect ratio) and centre a symbol's raw path
  // bounding box within an arbitrary target box, with a little padding on
  // every side (same fit-scale approach `ServiceSign` uses for its own icon
  // slot) -- shared by both the `icons` column boxes (square) and a
  // road-number-slot vehicle icon box (matches a `RouteSignRoadNumber`'s footprint).
  const buildIconFitTransform = (
    symbol: ServiceSignSymbol,
    box: Readonly<{ x: number; y: number; width: number; height: number }>,
    padding: number,
  ): string => {
    const bbox = SERVICE_SIGN_SYMBOL_BBOX[symbol];
    const availableWidth = box.width - padding * 2;
    const availableHeight = box.height - padding * 2;
    const symbolWidth = bbox.maxX - bbox.minX;
    const symbolHeight = bbox.maxY - bbox.minY;
    const scale = Math.min(availableWidth / symbolWidth, availableHeight / symbolHeight);
    const targetCenterX = box.x + box.width / 2;
    const targetCenterY = box.y + box.height / 2;
    const symbolCenterX = (bbox.minX + bbox.maxX) / 2;
    const symbolCenterY = (bbox.minY + bbox.maxY) / 2;
    return `translate(${targetCenterX} ${targetCenterY}) scale(${scale}) translate(${-symbolCenterX} ${-symbolCenterY})`;
  };

  const roadNumberBoxHeight = rowHeight * ROUTE_SIGN_ROAD_NUMBER_BOX_HEIGHT_RATIO;
  const roadNumberBoxCornerRadius = roadNumberBoxHeight * ROUTE_SIGN_ROAD_NUMBER_CORNER_RADIUS_RATIO;
  const roadNumberBoxBorderWidth = roadNumberBoxHeight * ROUTE_SIGN_ROAD_NUMBER_BORDER_WIDTH_RATIO;
  const roadNumberIconPadding = roadNumberBoxHeight * ROUTE_SIGN_ROAD_NUMBER_TEXT_PADDING_X_RATIO;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {borderRenderMode === "fill" ? (
        <>
          <Path d={borderPath} fill={roadSignColorValues[borderColour]} />
          <Path d={boxPath} fill={roadSignColorValues[backgroundColour]} />
        </>
      ) : (
        <>
          <Path d={boxPath} fill={roadSignColorValues[backgroundColour]} />
          <Path d={borderPath} fill="none" stroke={roadSignColorValues[borderColour]} strokeWidth={borderWidth} />
        </>
      )}
      {roadNumbers.map((roadNumber, index) => {
        const y = paddingY + roadNumberBlockTop + index * (rowHeight + rowGap);
        if (isRoadNumberIcon(roadNumber)) {
          const box = { x: roadNumberX ?? 0, y, width: roadNumberColumnWidth, height: rowHeight };
          const boxY = y + (rowHeight - roadNumberBoxHeight) / 2;
          const boxPath = buildRoundedRectPath(box.x, boxY, roadNumberColumnWidth, roadNumberBoxHeight, roadNumberBoxCornerRadius);
          const borderPath = buildRoundedRectPath(
            box.x + roadNumberBoxBorderWidth / 2,
            boxY + roadNumberBoxBorderWidth / 2,
            roadNumberColumnWidth - roadNumberBoxBorderWidth,
            roadNumberBoxHeight - roadNumberBoxBorderWidth,
            roadNumberBoxCornerRadius,
          );
          return (
            <G key={`${index}-${roadNumber.icon}`}>
              <Path d={boxPath} fill={roadSignColorValues[roadNumber.backgroundColour ?? "white"]} />
              <Path d={borderPath} fill="none" stroke={roadSignColorValues[roadNumber.borderColour ?? "black"]} strokeWidth={roadNumberBoxBorderWidth} />
              <G transform={buildIconFitTransform(roadNumber.icon, { ...box, y: boxY, height: roadNumberBoxHeight }, roadNumberIconPadding)}>
                {serviceSignSymbolPaths[roadNumber.icon].map((path) => {
                  const d = typeof path === "string" ? path : path.d;
                  const fill =
                    typeof path === "string" ? roadSignColorValues[roadNumber.iconColour ?? "black"] : roadSignColorValues[path.colour];
                  return <Path key={d} d={d} fill={fill} />;
                })}
              </G>
            </G>
          );
        }
        return (
          <G key={`${index}-${roadNumber.text}`} transform={`translate(${roadNumberX} ${y})`}>
            <RouteSignRoadNumberGlyph {...roadNumber} size={rowHeight} />
          </G>
        );
      })}
      {icons?.map((icon, index) => {
        if (!icon) return null;
        const boxX = iconX ?? 0;
        const boxY = paddingY + index * (rowHeight + rowGap) + (rowHeight - iconSize) / 2;
        const boxPath = buildRoundedRectPath(boxX, boxY, iconSize, iconSize, iconCornerRadius);
        const borderPath = buildRoundedRectPath(
          boxX + iconBorderWidth / 2,
          boxY + iconBorderWidth / 2,
          iconSize - iconBorderWidth,
          iconSize - iconBorderWidth,
          iconCornerRadius,
        );
        return (
          <G key={`${index}-${icon.symbol}`}>
            <Path d={boxPath} fill={roadSignColorValues[icon.backgroundColour ?? "white"]} />
            <Path
              d={borderPath}
              fill="none"
              stroke={roadSignColorValues[icon.borderColour ?? "capitalBlue"]}
              strokeWidth={iconBorderWidth}
            />
            <G transform={buildIconFitTransform(icon.symbol, { x: boxX, y: boxY, width: iconSize, height: iconSize }, iconPadding)}>
              {serviceSignSymbolPaths[icon.symbol].map((path) => {
                const d = typeof path === "string" ? path : path.d;
                const fill = typeof path === "string" ? roadSignColorValues[icon.iconColour ?? "black"] : roadSignColorValues[path.colour];
                return <Path key={d} d={d} fill={fill} />;
              })}
            </G>
          </G>
        );
      })}
      {text.map((line, index) => {
        let lineX = textX;
        if (isTextOnlySign) {
          lineX = textCenterX;
        } else if (hasIcons && !icons?.[index]) {
          lineX = iconX;
        }
        return (
          <SvgText
            key={`${index}-${line}`}
            x={lineX}
            y={paddingY + textBlockTop + index * (rowHeight + rowGap) + rowHeight / 2 + fontSize * 0.36}
            textAnchor={isTextOnlySign ? "middle" : undefined}
            fontFamily={ROAD_SIGN_FONT_FAMILY}
            fontWeight={roadSignFontWeightValues.heavy}
            fontSize={fontSize}
            letterSpacing={DESTINATION_SIGN_TEXT_LETTER_SPACING}
            fill={roadSignColorValues[textColour]}
          >
            {line}
          </SvgText>
        );
      })}
      {distanceNumber && (
        <SvgText
          x={distanceNumberX}
          y={paddingY + contentHeight / 2 + fontSize * 0.36}
          fontFamily={ROAD_SIGN_FONT_FAMILY}
          fontWeight={roadSignFontWeightValues.heavy}
          fontSize={fontSize}
          letterSpacing={DESTINATION_SIGN_TEXT_LETTER_SPACING}
          fill={roadSignColorValues[textColour]}
        >
          {distanceNumber}
        </SvgText>
      )}
      {resolvedArrow && arrowBBox && showArrowAtStart && (
        <Path
          d={destinationSignArrowPaths[resolvedArrow.base]}
          fill={roadSignColorValues[textColour]}
          transform={buildArrowTransform(arrowBBox, arrowStartX ?? 0, renderArrowY, renderArrowHeight, resolvedArrow.flip)}
        />
      )}
      {resolvedArrow && arrowBBox && showArrowAtEnd && (
        <Path
          d={destinationSignArrowPaths[resolvedArrow.base]}
          fill={roadSignColorValues[textColour]}
          transform={buildArrowTransform(arrowBBox, arrowEndX ?? 0, renderArrowY, renderArrowHeight, resolvedArrow.flip)}
        />
      )}
    </Svg>
  );
}

function buildArrowTransform(
  bbox: Readonly<{ minX: number; minY: number; maxX: number; maxY: number }>,
  targetX: number,
  targetY: number,
  targetHeight: number,
  flip: boolean,
): string {
  const scale = targetHeight / (bbox.maxY - bbox.minY);
  const scaleX = flip ? -scale : scale;
  const originX = flip ? bbox.maxX : bbox.minX;
  return `translate(${targetX} ${targetY}) scale(${scaleX} ${scale}) translate(${-originX} ${-bbox.minY})`;
}
