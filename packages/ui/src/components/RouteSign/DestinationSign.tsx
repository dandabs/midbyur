"use client";

import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import type { RoadSignColour } from "../WarningSign/roadSignColors";
import { roadSignColorValues } from "../WarningSign/roadSignColors";
import { ROAD_SIGN_FONT_FAMILY, roadSignFontWeightValues } from "../WarningSign/roadSignFonts";
import type { DestinationSignBaseArrow } from "./destinationSignArrows";
import { DESTINATION_SIGN_ARROW_BBOX, destinationSignArrowPaths } from "./destinationSignArrows";
import {
  DESTINATION_SIGN_ARROW_GAP_RATIO,
  DESTINATION_SIGN_ARROW_HEIGHT_RATIO,
  DESTINATION_SIGN_BORDER_WIDTH_RATIO,
  DESTINATION_SIGN_CORNER_RADIUS_RATIO,
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
import { buildRoundedRectPath, ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO } from "./routeSignShape";
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
  roadNumbers?: readonly DestinationSignRoadNumber[];
  /** Optional directional arrow drawn to the right of the text. Omit for no arrow. */
  arrow?: DestinationSignArrow;
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
  arrow,
  rowHeight = 90,
}: DestinationSignProps) {
  const roadNumberRows = roadNumbers.length;
  const textRows = text.length;
  const rows = Math.max(roadNumberRows, textRows, 1);
  const rowGap = rowHeight * DESTINATION_SIGN_ROW_GAP_RATIO;
  const contentHeight = rows * rowHeight + (rows - 1) * rowGap;

  const roadNumberBlockTop = computeBlockTop(roadNumberRows, rows, rowHeight, rowGap);
  const textBlockTop = computeBlockTop(textRows, rows, rowHeight, rowGap);

  const roadNumberColumnWidth = roadNumberRows > 0 ? rowHeight * ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO : 0;

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

  const segments: { kind: "roadNumbers" | "text" | "arrow"; width: number }[] = [];
  if (roadNumberColumnWidth > 0) segments.push({ kind: "roadNumbers", width: roadNumberColumnWidth });
  if (textRows > 0) segments.push({ kind: "text", width: textMaxWidth });
  if (resolvedArrow) segments.push({ kind: "arrow", width: arrowWidth });

  const roadNumberGap = rowHeight * DESTINATION_SIGN_ROAD_NUMBER_GAP_RATIO;
  const arrowGap = rowHeight * DESTINATION_SIGN_ARROW_GAP_RATIO;
  const gapBefore = (index: number): number => {
    if (index === 0) return 0;
    return segments[index].kind === "arrow" ? arrowGap : roadNumberGap;
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

  let cursorX = paddingX;
  const roadNumberX = roadNumberColumnWidth > 0 ? cursorX : undefined;
  if (roadNumberColumnWidth > 0) cursorX += roadNumberColumnWidth + roadNumberGap;
  const textX = textRows > 0 ? cursorX : undefined;
  if (textRows > 0) cursorX += textMaxWidth + arrowGap;
  const arrowX = resolvedArrow ? cursorX : undefined;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Path d={boxPath} fill={roadSignColorValues[backgroundColour]} />
      <Path d={borderPath} fill="none" stroke={roadSignColorValues[borderColour]} strokeWidth={borderWidth} />
      {roadNumbers.map((roadNumber, index) => (
        <G key={`${index}-${roadNumber.text}`} transform={`translate(${roadNumberX} ${paddingY + roadNumberBlockTop + index * (rowHeight + rowGap)})`}>
          <RouteSignRoadNumberGlyph {...roadNumber} size={rowHeight} />
        </G>
      ))}
      {text.map((line, index) => (
        <SvgText
          key={`${index}-${line}`}
          x={textX}
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
      {resolvedArrow && arrowBBox && (
        <Path
          d={destinationSignArrowPaths[resolvedArrow.base]}
          fill={roadSignColorValues[textColour]}
          transform={buildArrowTransform(arrowBBox, arrowX ?? 0, paddingY + (contentHeight - arrowHeight) / 2, arrowHeight, resolvedArrow.flip)}
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
