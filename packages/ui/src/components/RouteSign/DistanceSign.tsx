"use client";

import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import type { RoadSignColour } from "../WarningSign/roadSignColors";
import { roadSignColorValues } from "../WarningSign/roadSignColors";
import { ROAD_SIGN_FONT_FAMILY, roadSignFontWeightValues } from "../WarningSign/roadSignFonts";
import {
  DESTINATION_SIGN_TEXT_AVERAGE_CHAR_WIDTH_RATIO,
  DESTINATION_SIGN_TEXT_FONT_HEIGHT_RATIO,
} from "./destinationSignShape";
import {
  DISTANCE_SIGN_BORDER_WIDTH_RATIO,
  DISTANCE_SIGN_CORNER_RADIUS_RATIO,
  DISTANCE_SIGN_NAME_NUMBER_GAP_RATIO,
  DISTANCE_SIGN_PADDING_X_RATIO,
  DISTANCE_SIGN_PADDING_Y_RATIO,
  DISTANCE_SIGN_ROAD_NUMBER_GAP_RATIO,
  DISTANCE_SIGN_ROAD_NUMBER_SIZE_RATIO,
  DISTANCE_SIGN_ROW_GAP_RATIO,
  DISTANCE_SIGN_ROW_LINE_HEIGHT_RATIO,
  DISTANCE_SIGN_TEXT_LETTER_SPACING,
  DISTANCE_SIGN_TEXT_LETTER_SPACING_RATIO,
} from "./distanceSignShape";
import { buildRoundedRectPath, ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO } from "./routeSignShape";
import type { RouteSignRoadNumberProps } from "./RouteSignRoadNumber";
import { RouteSignRoadNumberGlyph } from "./RouteSignRoadNumber";

export type { RoadSignColour };

/** The road-number box drawn at the top of `DistanceSign`, e.g. `{ text: "1" }` -- the same options as `RouteSignRoadNumber` except `size`, which `DistanceSign`'s own `rowHeight` prop controls instead so it scales along with the location rows below it. */
export type DistanceSignRoadNumber = Omit<RouteSignRoadNumberProps, "size">;

/** One row in `DistanceSign`'s `locations` list -- a destination name paired with its distance. */
export type DistanceSignLocation = Readonly<{
  /** Destination name (e.g. "Akureyri"). */
  name: string;
  /**
   * Distance to the destination, rendered as-is (e.g. `426` renders as
   * "426"). Rows are always drawn with the largest `distance` at the top
   * regardless of the order given here, matching the reference artwork
   * (https://upload.wikimedia.org/wikipedia/commons/a/a3/F19.51.svg).
   */
  distance: number;
}>;

export type DistanceSignProps = Readonly<{
  /** Road-number box drawn centred at the top of the board, e.g. `{ text: "1" }`. Omit for no road number. */
  roadNumber?: DistanceSignRoadNumber;
  /** Destination name/distance rows -- always drawn largest distance first, regardless of input order. */
  locations: readonly DistanceSignLocation[];
  /** Colour of the location names and distance numbers. Defaults to "black". */
  textColour?: RoadSignColour;
  /** Colour of the board's background fill. Defaults to "yellow". */
  backgroundColour?: RoadSignColour;
  /** Colour of the board's outline. Defaults to "black". */
  borderColour?: RoadSignColour;
  /** Height of one location row, in pixels -- also the unit every other dimension (padding, gaps, font size, the `roadNumber` box) scales from. Defaults to 90. */
  rowHeight?: number;
}>;

/**
 * An Icelandic route-distance sign (e.g.
 * https://upload.wikimedia.org/wikipedia/commons/a/a3/F19.51.svg) -- a
 * yellow board pairing a single `roadNumber` box, centred at the top, with
 * a stacked list of destination names (left-aligned) and their distances
 * (right-aligned in their own column), largest distance at the top. The
 * board grows to fit its content rather than shrinking anything down,
 * since this is a standalone sign rather than a piece stacked onto another
 * one. See `DistanceSign.stories.tsx` for examples.
 */
export function DistanceSign({
  roadNumber,
  locations,
  textColour = "black",
  backgroundColour = "yellow",
  borderColour = "black",
  rowHeight = 90,
}: DistanceSignProps) {
  const sortedLocations = [...locations].sort((a, b) => b.distance - a.distance);
  const rows = sortedLocations.length;

  const fontSize = rowHeight * DESTINATION_SIGN_TEXT_FONT_HEIGHT_RATIO;
  const lineHeight = fontSize * DISTANCE_SIGN_ROW_LINE_HEIGHT_RATIO;
  const rowGap = rowHeight * DISTANCE_SIGN_ROW_GAP_RATIO;
  const rowsHeight = rows * lineHeight + Math.max(rows - 1, 0) * rowGap;

  const roadNumberSize = rowHeight * DISTANCE_SIGN_ROAD_NUMBER_SIZE_RATIO;
  // `RouteSignRoadNumberGlyph` draws a box narrower/wider than it is tall
  // (see `ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO`), so its actual rendered
  // width isn't `roadNumberSize` -- use the real width when centring it.
  const roadNumberWidth = roadNumberSize * ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO;
  const roadNumberGap = rowHeight * DISTANCE_SIGN_ROAD_NUMBER_GAP_RATIO;
  const contentHeight = rowsHeight + (roadNumber ? roadNumberSize + roadNumberGap : 0);

  const letterSpacingWidth = fontSize * DISTANCE_SIGN_TEXT_LETTER_SPACING_RATIO;
  const measureWidth = (value: string): number =>
    value.length * (fontSize * DESTINATION_SIGN_TEXT_AVERAGE_CHAR_WIDTH_RATIO + letterSpacingWidth);

  const nameMaxWidth = rows > 0 ? Math.max(...sortedLocations.map((location) => measureWidth(location.name))) : 0;
  const numberMaxWidth = rows > 0 ? Math.max(...sortedLocations.map((location) => measureWidth(String(location.distance)))) : 0;
  const nameNumberGap = rowHeight * DISTANCE_SIGN_NAME_NUMBER_GAP_RATIO;
  const rowsWidth = nameMaxWidth + nameNumberGap + numberMaxWidth;

  const paddingX = rowHeight * DISTANCE_SIGN_PADDING_X_RATIO;
  const paddingY = rowHeight * DISTANCE_SIGN_PADDING_Y_RATIO;
  const cornerRadius = rowHeight * DISTANCE_SIGN_CORNER_RADIUS_RATIO;
  const borderWidth = rowHeight * DISTANCE_SIGN_BORDER_WIDTH_RATIO;

  const innerWidth = Math.max(roadNumberWidth, rowsWidth);
  const width = paddingX * 2 + innerWidth;
  const height = paddingY * 2 + contentHeight;

  const boxPath = buildRoundedRectPath(0, 0, width, height, cornerRadius);
  const borderPath = buildRoundedRectPath(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth, cornerRadius);

  const nameX = paddingX;
  const numberX = paddingX + innerWidth;
  const roadNumberX = paddingX + (innerWidth - roadNumberWidth) / 2;
  const rowsTop = paddingY + (roadNumber ? roadNumberSize + roadNumberGap : 0);

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Path d={boxPath} fill={roadSignColorValues[backgroundColour]} />
      <Path d={borderPath} fill="none" stroke={roadSignColorValues[borderColour]} strokeWidth={borderWidth} />
      {roadNumber && (
        <G transform={`translate(${roadNumberX} ${paddingY})`}>
          <RouteSignRoadNumberGlyph {...roadNumber} size={roadNumberSize} />
        </G>
      )}
      {sortedLocations.map((location, index) => {
        const y = rowsTop + index * (lineHeight + rowGap) + lineHeight / 2 + fontSize * 0.36;
        return (
          <G key={`${index}-${location.name}`}>
            <SvgText
              x={nameX}
              y={y}
              fontFamily={ROAD_SIGN_FONT_FAMILY}
              fontWeight={roadSignFontWeightValues.heavy}
              fontSize={fontSize}
              letterSpacing={DISTANCE_SIGN_TEXT_LETTER_SPACING}
              fill={roadSignColorValues[textColour]}
            >
              {location.name}
            </SvgText>
            <SvgText
              x={numberX}
              y={y}
              textAnchor="end"
              fontFamily={ROAD_SIGN_FONT_FAMILY}
              fontWeight={roadSignFontWeightValues.heavy}
              fontSize={fontSize}
              letterSpacing={DISTANCE_SIGN_TEXT_LETTER_SPACING}
              fill={roadSignColorValues[textColour]}
            >
              {location.distance}
            </SvgText>
          </G>
        );
      })}
    </Svg>
  );
}
