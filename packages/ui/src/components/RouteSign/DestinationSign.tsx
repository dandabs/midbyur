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
  DESTINATION_SIGN_ICON_BORDER_WIDTH_RATIO,
  DESTINATION_SIGN_ICON_CORNER_RADIUS_RATIO,
  DESTINATION_SIGN_ICON_GAP_RATIO,
  DESTINATION_SIGN_ICON_PADDING_RATIO,
  DESTINATION_SIGN_ICON_SIZE_RATIO,
  DESTINATION_SIGN_PADDING_X_RATIO,
  DESTINATION_SIGN_PADDING_Y_RATIO,
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
export type DestinationSignArrow = "up" | "left" | "right" | "turnLeft" | "turnRight" | "diagonalUpLeft" | "diagonalUpRight";

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
  /** Height of one road-number-box/text row, in pixels -- also the unit every other dimension (padding, gaps, font size) scales from. Defaults to 90. */
  rowHeight?: number;
}>;

const MIRRORED_DESTINATION_SIGN_ARROWS: Readonly<Partial<Record<DestinationSignArrow, DestinationSignBaseArrow>>> = {
  left: "straightRight",
  turnLeft: "turnRight",
  diagonalUpLeft: "diagonalUpRight",
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
  const textEndPadding = rowHeight * DESTINATION_SIGN_TEXT_END_PADDING_RATIO;
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

  const segments: { kind: "roadNumbers" | "icons" | "text" | "arrowStart" | "arrowEnd"; width: number }[] = [];
  if (showArrowAtStart) segments.push({ kind: "arrowStart", width: arrowWidth });
  if (roadNumberColumnWidth > 0) segments.push({ kind: "roadNumbers", width: roadNumberColumnWidth });
  if (hasIcons) segments.push({ kind: "icons", width: iconSize });
  if (textRows > 0) segments.push({ kind: "text", width: textMaxWidth });
  if (showArrowAtEnd) segments.push({ kind: "arrowEnd", width: arrowWidth });

  const roadNumberGap = rowHeight * DESTINATION_SIGN_ROAD_NUMBER_GAP_RATIO;
  const iconGap = rowHeight * DESTINATION_SIGN_ICON_GAP_RATIO;
  const arrowGap = rowHeight * DESTINATION_SIGN_ARROW_GAP_RATIO;
  const isArrow = (kind: (typeof segments)[number]["kind"]): boolean => kind === "arrowStart" || kind === "arrowEnd";
  const gapBefore = (index: number): number => {
    if (index === 0) return 0;
    if (isArrow(segments[index].kind) || isArrow(segments[index - 1].kind)) return arrowGap;
    if (segments[index].kind === "icons" || segments[index - 1].kind === "icons") return iconGap;
    return roadNumberGap;
  };
  const innerWidth = segments.reduce((total, segment, index) => total + gapBefore(index) + segment.width, 0);

  const paddingX = rowHeight * DESTINATION_SIGN_PADDING_X_RATIO;
  const paddingY = rowHeight * DESTINATION_SIGN_PADDING_Y_RATIO;
  const cornerRadius = rowHeight * DESTINATION_SIGN_CORNER_RADIUS_RATIO;
  const borderWidth = rowHeight * DESTINATION_SIGN_BORDER_WIDTH_RATIO;

  const width = paddingX * 2 + innerWidth;
  const height = paddingY * 2 + contentHeight;

  const boxPath = buildRoundedRectPath(0, 0, width, height, cornerRadius);
  const borderPath = buildRoundedRectPath(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth, cornerRadius);

  const segmentPositions: Partial<Record<"roadNumbers" | "icons" | "text" | "arrowStart" | "arrowEnd", number>> = {};
  let cursorX = paddingX;
  segments.forEach((segment, index) => {
    cursorX += gapBefore(index);
    segmentPositions[segment.kind] = cursorX;
    cursorX += segment.width;
  });
  const roadNumberX = segmentPositions.roadNumbers;
  const iconX = segmentPositions.icons;
  const textX = segmentPositions.text;
  const arrowStartX = segmentPositions.arrowStart;
  const arrowEndX = segmentPositions.arrowEnd;

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
      <Path d={boxPath} fill={roadSignColorValues[backgroundColour]} />
      <Path d={borderPath} fill="none" stroke={roadSignColorValues[borderColour]} strokeWidth={borderWidth} />
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
      {text.map((line, index) => (
        <SvgText
          key={`${index}-${line}`}
          x={hasIcons && !icons?.[index] ? iconX : textX}
          y={paddingY + textBlockTop + index * (rowHeight + rowGap) + rowHeight / 2 + fontSize * 0.36}
          fontFamily={ROAD_SIGN_FONT_FAMILY}
          fontWeight={roadSignFontWeightValues.heavy}
          fontSize={fontSize}
          letterSpacing={DESTINATION_SIGN_TEXT_LETTER_SPACING}
          fill={roadSignColorValues[textColour]}
        >
          {line}
        </SvgText>
      ))}
      {resolvedArrow && arrowBBox && showArrowAtStart && (
        <Path
          d={destinationSignArrowPaths[resolvedArrow.base]}
          fill={roadSignColorValues[textColour]}
          transform={buildArrowTransform(
            arrowBBox,
            arrowStartX ?? 0,
            paddingY + (contentHeight - arrowHeight) / 2,
            arrowHeight,
            resolvedArrow.flip,
          )}
        />
      )}
      {resolvedArrow && arrowBBox && showArrowAtEnd && (
        <Path
          d={destinationSignArrowPaths[resolvedArrow.base]}
          fill={roadSignColorValues[textColour]}
          transform={buildArrowTransform(
            arrowBBox,
            arrowEndX ?? 0,
            paddingY + (contentHeight - arrowHeight) / 2,
            arrowHeight,
            resolvedArrow.flip,
          )}
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
