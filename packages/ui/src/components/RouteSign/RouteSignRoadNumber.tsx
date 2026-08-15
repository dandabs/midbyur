"use client";

import Svg, { Path, Text as SvgText } from "react-native-svg";
import type { RoadSignColour } from "../WarningSign/roadSignColors";
import { roadSignColorValues } from "../WarningSign/roadSignColors";
import { ROAD_SIGN_FONT_FAMILY, ROAD_SIGN_LETTER_SPACING, roadSignFontWeightValues } from "../WarningSign/roadSignFonts";
import {
  buildRoundedRectPath,
  ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_AVERAGE_CHAR_WIDTH_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_BOX_HEIGHT_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_BORDER_WIDTH_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_CORNER_RADIUS_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_DASH_GAP_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_DASH_LENGTH_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_FONT_HEIGHT_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_TEXT_BASELINE_OFFSET_RATIO,
  ROUTE_SIGN_ROAD_NUMBER_TEXT_PADDING_X_RATIO,
} from "./routeSignShape";

export type { RoadSignColour };

/** Outline style for `RouteSignRoadNumber` -- the reference artwork uses a dashed outline for a proposed/temporary route number and a solid outline for a permanent, already-numbered route. */
export type RouteSignRoadNumberBorderStyle = "solid" | "dashed";

export type RouteSignRoadNumberProps = Readonly<{
  /** The road number drawn in the box (e.g. "1", "49"). The box's width is fixed (see `ROUTE_SIGN_ROAD_NUMBER_MAX_CHARACTERS`) rather than growing with `text`, so it stays a predictable size when stacked onto other route signs -- longer text shrinks to fit instead. */
  text: string;
  /** Colour of the road number text. Defaults to "black". */
  textColour?: RoadSignColour;
  /** Colour of the box's background fill. Defaults to "white". */
  backgroundColour?: RoadSignColour;
  /** Colour of the box's outline. Defaults to "black". */
  borderColour?: RoadSignColour;
  /** Outline style. Defaults to "solid". */
  borderStyle?: RouteSignRoadNumberBorderStyle;
  /** Height of the rendered box, in pixels. Width follows the fixed `ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO`, sized to comfortably fit four characters. */
  size?: number;
}>;

/**
 * The road-number box's actual drawing content (background, outline, and
 * text), at a fixed pixel scale derived from `size` but with no outer
 * `<Svg>` wrapper of its own -- shared between `RouteSignRoadNumber` (which
 * wraps this in a standalone `<Svg>`) and `DestinationSign` (which embeds
 * it directly inside its own board `<Svg>` via a `<G transform="translate(...)">`,
 * since react-native-svg content can be composed with a plain group
 * translation without needing a nested `<Svg>`/`viewBox` re-scale).
 */
export function RouteSignRoadNumberGlyph({
  text,
  textColour = "black",
  backgroundColour = "white",
  borderColour = "black",
  borderStyle = "solid",
  size = 150,
}: RouteSignRoadNumberProps) {
  const height = size;
  const width = height * ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO;

  // The drawn box (background + border) is shorter than the full `size`
  // slot and vertically centred within it, so it hugs the (comparatively
  // small) digit text more tightly instead of leaving a large gap above
  // and below -- `size` itself stays the full slot height so rows still
  // line up consistently when stacked (e.g. in `DestinationSign`).
  const boxHeight = height * ROUTE_SIGN_ROAD_NUMBER_BOX_HEIGHT_RATIO;
  const boxY = (height - boxHeight) / 2;
  const cornerRadius = boxHeight * ROUTE_SIGN_ROAD_NUMBER_CORNER_RADIUS_RATIO;
  const borderWidth = boxHeight * ROUTE_SIGN_ROAD_NUMBER_BORDER_WIDTH_RATIO;
  const dashLength = boxHeight * ROUTE_SIGN_ROAD_NUMBER_DASH_LENGTH_RATIO;
  const dashGap = boxHeight * ROUTE_SIGN_ROAD_NUMBER_DASH_GAP_RATIO;

  const boxPath = buildRoundedRectPath(0, boxY, width, boxHeight, cornerRadius);
  const borderPath = buildRoundedRectPath(
    borderWidth / 2,
    boxY + borderWidth / 2,
    width - borderWidth,
    boxHeight - borderWidth,
    cornerRadius,
  );

  // The box's width never grows with `text` -- instead, the font size stays
  // at its normal height-derived value (matching the reference artwork's
  // "1"/"49" boxes, which use the same size text despite differing
  // lengths) as long as it fits the fixed-width box, and only shrinks below
  // that for text too long to fit at the normal size.
  const paddingX = boxHeight * ROUTE_SIGN_ROAD_NUMBER_TEXT_PADDING_X_RATIO;
  const availableTextWidth = width - paddingX * 2;
  const fontSizeForHeight = height * ROUTE_SIGN_ROAD_NUMBER_FONT_HEIGHT_RATIO;
  const fontSizeForWidth = availableTextWidth / (Math.max(text.length, 1) * ROUTE_SIGN_ROAD_NUMBER_AVERAGE_CHAR_WIDTH_RATIO);
  const fontSize = Math.min(fontSizeForHeight, fontSizeForWidth);

  return (
    <>
      <Path d={boxPath} fill={roadSignColorValues[backgroundColour]} />
      <Path
        d={borderPath}
        fill="none"
        stroke={roadSignColorValues[borderColour]}
        strokeWidth={borderWidth}
        strokeDasharray={borderStyle === "dashed" ? `${dashLength} ${dashGap}` : undefined}
      />
      <SvgText
        x={width / 2}
        y={height / 2 + fontSize * ROUTE_SIGN_ROAD_NUMBER_TEXT_BASELINE_OFFSET_RATIO}
        fontFamily={ROAD_SIGN_FONT_FAMILY}
        fontWeight={roadSignFontWeightValues.heavy}
        fontSize={fontSize}
        letterSpacing={ROAD_SIGN_LETTER_SPACING}
        fill={roadSignColorValues[textColour]}
        textAnchor="middle"
      >
        {text}
      </SvgText>
    </>
  );
}

/**
 * A standalone Icelandic road-number box (the "1"/"49" boxes on
 * https://upload.wikimedia.org/wikipedia/commons/0/0a/F05.51.svg), fixed to
 * a width sized for four characters so it renders at a consistent size
 * whether used on its own or stacked onto other route signs. See
 * `RouteSignRoadNumber.stories.tsx` for examples.
 */
export function RouteSignRoadNumber(props: RouteSignRoadNumberProps) {
  const height = props.size ?? 150;
  const width = height * ROUTE_SIGN_ROAD_NUMBER_ASPECT_RATIO;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <RouteSignRoadNumberGlyph {...props} />
    </Svg>
  );
}
