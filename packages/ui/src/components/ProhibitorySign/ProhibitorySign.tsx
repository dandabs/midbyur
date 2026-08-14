"use client";

import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import { ROAD_SIGN_LETTER_SPACING, roadSignFontWeightValues } from "../WarningSign/roadSignFonts";
import type { RoadSignColour } from "../WarningSign/roadSignColors";
import { roadSignColorValues } from "../WarningSign/roadSignColors";
import {
  buildAlternateStrikethroughPaths,
  buildSquareBackgroundPath,
  buildStrikethroughPath,
  PROHIBITORY_SIGN_CENTER,
  PROHIBITORY_SIGN_END_OF_PROHIBITION_STRIPE_PATHS,
  PROHIBITORY_SIGN_GROUP_TRANSFORM,
  PROHIBITORY_SIGN_INNER_CIRCLE_PATH,
  PROHIBITORY_SIGN_OUTER_CIRCLE_PATH,
  PROHIBITORY_SIGN_OUTER_RADIUS,
  PROHIBITORY_SIGN_SQUARE_HALF_SIDE,
  PROHIBITORY_SIGN_SQUARE_MARGIN,
  PROHIBITORY_SIGN_VIEW_BOX,
} from "./prohibitorySignShape";
import type { ProhibitorySignSymbol } from "./prohibitorySignSymbols";
import { prohibitorySignSymbolPaths } from "./prohibitorySignSymbols";

export type { ProhibitorySignSymbol, RoadSignColour };

/**
 * Custom text placement for symbols that combine a pictogram with
 * `firstLineText` / `secondLineText`, whose icon doesn't leave room for the
 * default centred text position. `undefined` fields fall back to the
 * default centred layout. Font size bases replace the usual 240/280
 * (first line) and 175 (second line) defaults before per-string length
 * scaling is applied.
 */
const PROHIBITORY_SIGN_SYMBOL_TEXT_LAYOUT: Partial<
  Record<
    ProhibitorySignSymbol,
    Readonly<{
      firstLineY: number;
      secondLineY: number;
      firstLineFontSizeBase: number;
      secondLineFontSizeBase: number;
    }>
  >
> = {
  // Truck icon fills most of the circle, so the "10" / "m" length value is
  // rendered below the icon, near the bottom of the circle.
  LengthLimit: { firstLineY: 470, secondLineY: 535, firstLineFontSizeBase: 90, secondLineFontSizeBase: 70 },
  // Truck + trailer icon sits in the upper-middle band, leaving room for the
  // combined weight value below it.
  TotalWeightLimitCombination: {
    firstLineY: 480,
    secondLineY: 480,
    firstLineFontSizeBase: 150,
    secondLineFontSizeBase: 150,
  },
  // Axle icon sits in the lower half, so the axle weight value is rendered
  // above it (matching the reference artwork), near the top of the circle.
  AxleWeightLimit: { firstLineY: 250, secondLineY: 250, firstLineFontSizeBase: 170, secondLineFontSizeBase: 170 },
  // Icon-only (baked-in "50 m" text removed) leaves the same room the
  // original artwork's text used, but at the default two-line font sizes
  // the text overwhelms the smaller car/arrow icon -- shrink it and shift it
  // up a bit so it clears the arrow/car icon underneath.
  MinimumSpaceBetweenVehicles: {
    firstLineY: PROHIBITORY_SIGN_CENTER.y - 100,
    secondLineY: PROHIBITORY_SIGN_CENTER.y + 28,
    firstLineFontSizeBase: 150,
    secondLineFontSizeBase: 110,
  },
};

export type ProhibitorySignProps = Readonly<{
  /** Colour of the main circle background (e.g. "yellow" for most signs, "blue" for parking prohibited). */
  backgroundColour?: RoadSignColour;
  /** Colour of the circle border ring. `undefined` renders no separate border (background fills the whole circle). */
  borderColour?: RoadSignColour;
  /** Colour of the single diagonal prohibition bar (e.g. "red" for "parking prohibited"). `undefined` renders no bar. */
  strikethroughColour?: RoadSignColour;
  /**
   * Colour of the crossed ("X") prohibition bars, used instead of `strikethroughColour` for signs
   * that use a cross rather than a single bar (e.g. "stopping prohibited"). `undefined` renders no cross.
   * When both `strikethroughColour` and `alternateStrikethroughColour` are set, the cross takes priority.
   */
  alternateStrikethroughColour?: RoadSignColour;
  /** Draws four black diagonal stripes across the sign, marking the "end of prohibition"/"end of zone". */
  endOfProhibition?: boolean;
  /** Which pictogram to draw on the sign. Leave unset for signs that only show text and/or a border/strikethrough. */
  symbol?: ProhibitorySignSymbol;
  /**
   * Colour of the symbol pictogram. Defaults to "black". Ignored for any
   * part of the symbol that has a fixed non-black colour in the reference
   * artwork — those parts always render in their fixed colour.
   */
  symbolColour?: RoadSignColour;
  /** Optional square backing plate colour, used by speed-zone signs (e.g. "yellow"). `undefined` renders no square. */
  squareBackgroundColour?: RoadSignColour;
  /** Optional border colour for the square backing plate (usually `undefined`, "black" for "end of zone" signs). */
  squareBackgroundBorderColour?: RoadSignColour;
  /** First line of centred text (e.g. a speed, axle weight, or width limit value). */
  firstLineText?: string;
  /** Second line of centred text, shown below `firstLineText` (e.g. height/length limits, "stop for checkpoint"). */
  secondLineText?: string;
  /** Width of the rendered sign, in pixels. Height follows the sign's aspect ratio (square). */
  size?: number;
}>;

/**
 * An Icelandic circular prohibitory road sign (class B), built by combining a
 * reusable circle shape (`prohibitorySignShape.ts`) with an optional symbol
 * glyph (`prohibitorySignSymbols.ts`) and/or free text, coloured and composed
 * via props instead of being baked into fixed artwork. See
 * `ProhibitorySign.stories.tsx` for interactive examples.
 */
export function ProhibitorySign({
  backgroundColour = "yellow",
  borderColour = "red",
  strikethroughColour,
  alternateStrikethroughColour,
  endOfProhibition = false,
  symbol,
  symbolColour = "black",
  squareBackgroundColour,
  squareBackgroundBorderColour,
  firstLineText,
  secondLineText,
  size = 200,
}: ProhibitorySignProps) {
  const hasSquare = squareBackgroundColour !== undefined;
  const extentRadius = hasSquare ? PROHIBITORY_SIGN_SQUARE_HALF_SIDE : PROHIBITORY_SIGN_OUTER_RADIUS;

  const viewBox = hasSquare
    ? `${-PROHIBITORY_SIGN_SQUARE_MARGIN} ${-PROHIBITORY_SIGN_SQUARE_MARGIN} ${601.04382 + PROHIBITORY_SIGN_SQUARE_MARGIN * 2} ${601.04388 + PROHIBITORY_SIGN_SQUARE_MARGIN * 2}`
    : PROHIBITORY_SIGN_VIEW_BOX;

  const [alt1, alt2] = buildAlternateStrikethroughPaths(extentRadius);
  // Text is rendered inside the same <G transform> as the circle/symbol
  // paths, so its x/y must be given in that local (pre-transform)
  // coordinate space -- i.e. centred on `PROHIBITORY_SIGN_CENTER`, not the
  // sign's final on-screen centre.
  const textCenterX = PROHIBITORY_SIGN_CENTER.x;
  // A single line of text (e.g. a speed limit) is sized to fill the inner
  // circle with a little padding. When there are two lines, the top line
  // (e.g. the number) is rendered slightly taller than the bottom line (e.g.
  // the unit), and both are sized down from the single-line case to fit.
  // Longer strings (e.g. "100" vs "50") are scaled down further so they
  // don't overflow the circle -- the base size only applies at up to 2
  // characters, shrinking proportionally beyond that.
  const scaleFontSizeForLength = (text: string | undefined, baseFontSize: number): number => {
    const length = text?.length ?? 0;
    if (length <= 2) return baseFontSize;
    return Math.max(baseFontSize * (2 / length), baseFontSize * 0.45);
  };
  const textLayout = symbol ? PROHIBITORY_SIGN_SYMBOL_TEXT_LAYOUT[symbol] : undefined;
  const firstLineFontSize = scaleFontSizeForLength(
    firstLineText,
    textLayout?.firstLineFontSizeBase ?? (secondLineText ? 240 : 280),
  );
  // The top line should always read as slightly bigger than the bottom line,
  // even after each is independently scaled down for its own character
  // count -- so cap the second line's size relative to whatever size the
  // first line ended up at, rather than scaling both from independent bases.
  const secondLineFontSize = secondLineText
    ? Math.min(scaleFontSizeForLength(secondLineText, textLayout?.secondLineFontSizeBase ?? 175), firstLineFontSize * 0.9)
    : 0;
  const firstLineY = textLayout?.firstLineY ?? (secondLineText ? PROHIBITORY_SIGN_CENTER.y - 60 : PROHIBITORY_SIGN_CENTER.y);
  const secondLineY = textLayout?.secondLineY ?? PROHIBITORY_SIGN_CENTER.y + 68;
  // "End of prohibition" signs mute the symbol/text to grey, since the
  // stripes (always black, per the reference artwork) are the focal point.
  const effectiveSymbolColour = endOfProhibition ? "gray" : symbolColour;
  // When "end of prohibition" is set and a square backing plate is
  // specified, the circle's background also becomes white (matching the
  // square plate) instead of its usual yellow.
  const effectiveBackgroundColour: RoadSignColour = endOfProhibition && hasSquare ? "white" : backgroundColour;
  // When "end of prohibition" is set and no square backing plate is
  // specified, the red circle ring is hidden entirely (rendered in the
  // background colour instead, so no separate ring is visible). When a
  // square IS specified, the square becomes a white plate with a black
  // border and the circle ring is muted to grey instead of being hidden.
  let effectiveBorderColour: RoadSignColour = borderColour ?? backgroundColour;
  if (endOfProhibition) {
    effectiveBorderColour = hasSquare ? "gray" : effectiveBackgroundColour;
  }
  const effectiveSquareBackgroundColour = endOfProhibition && hasSquare ? "white" : squareBackgroundColour;
  const effectiveSquareBackgroundBorderColour = endOfProhibition && hasSquare ? "black" : squareBackgroundBorderColour;

  return (
    <Svg width={size} height={size} viewBox={viewBox}>
      <G transform={PROHIBITORY_SIGN_GROUP_TRANSFORM}>
        {hasSquare && (
          <Path
            d={buildSquareBackgroundPath()}
            fill={roadSignColorValues[effectiveSquareBackgroundColour!]}
            stroke={effectiveSquareBackgroundBorderColour ? roadSignColorValues[effectiveSquareBackgroundBorderColour] : undefined}
            strokeWidth={effectiveSquareBackgroundBorderColour ? 8 : 0}
          />
        )}
        <Path d={PROHIBITORY_SIGN_OUTER_CIRCLE_PATH} fill={roadSignColorValues[effectiveBorderColour]} />
        <Path d={PROHIBITORY_SIGN_INNER_CIRCLE_PATH} fill={roadSignColorValues[effectiveBackgroundColour]} />
        {symbol &&
          prohibitorySignSymbolPaths[symbol].map((path) => {
            const d = typeof path === "string" ? path : path.d;
            const fill = typeof path === "string" ? roadSignColorValues[effectiveSymbolColour] : roadSignColorValues[path.colour];
            return <Path key={d} d={d} fill={fill} />;
          })}
        {firstLineText && (
          <SvgText
            x={textCenterX}
            y={firstLineY}
            fontSize={firstLineFontSize}
            fontWeight={roadSignFontWeightValues.heavy}
            fontFamily="Transport New"
            letterSpacing={ROAD_SIGN_LETTER_SPACING}
            textAnchor="middle"
            alignmentBaseline="central"
            fill={roadSignColorValues[effectiveSymbolColour]}
          >
            {firstLineText}
          </SvgText>
        )}
        {secondLineText && (
          <SvgText
            x={textCenterX}
            y={secondLineY}
            fontSize={secondLineFontSize}
            fontWeight={roadSignFontWeightValues.heavy}
            fontFamily="Transport New"
            letterSpacing={ROAD_SIGN_LETTER_SPACING}
            textAnchor="middle"
            alignmentBaseline="central"
            fill={roadSignColorValues[effectiveSymbolColour]}
          >
            {secondLineText}
          </SvgText>
        )}
        {strikethroughColour && !alternateStrikethroughColour && (
          <Path d={buildStrikethroughPath(extentRadius)} fill={roadSignColorValues[strikethroughColour]} />
        )}
        {alternateStrikethroughColour && (
          <>
            <Path d={alt1} fill={roadSignColorValues[alternateStrikethroughColour]} />
            <Path d={alt2} fill={roadSignColorValues[alternateStrikethroughColour]} />
          </>
        )}
        {endOfProhibition &&
          PROHIBITORY_SIGN_END_OF_PROHIBITION_STRIPE_PATHS.map((d) => <Path key={d} d={d} fill={roadSignColorValues.black} />)}
      </G>
    </Svg>
  );
}
