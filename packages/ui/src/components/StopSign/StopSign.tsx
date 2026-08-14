"use client";

import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import { ROAD_SIGN_LETTER_SPACING, roadSignFontWeightValues } from "../WarningSign/roadSignFonts";
import type { RoadSignColour } from "../WarningSign/roadSignColors";
import { roadSignColorValues } from "../WarningSign/roadSignColors";
import {
  buildStopSignBackgroundPath,
  buildStopSignBorderBackgroundPath,
  buildStopSignBorderPath,
  STOP_SIGN_CENTER,
  STOP_SIGN_VIEW_BOX,
} from "./stopSignShape";

export type { RoadSignColour };

export type StopSignProps = Readonly<{
  /** Colour of the main octagon background. Defaults to the standard "red". */
  backgroundColour?: RoadSignColour;
  /** Colour of the thin ring between the background and the outer border. Defaults to "white". */
  backgroundBorderColour?: RoadSignColour;
  /** Colour of the outer octagon outline. Defaults to "black". */
  borderColour?: RoadSignColour;
  /** Text shown on the sign. Defaults to "STOP". */
  text?: string;
  /** Colour of the text. Defaults to "white". */
  textColour?: RoadSignColour;
  /** Width of the rendered sign, in pixels. Height follows the sign's fixed aspect ratio (square). */
  size?: number;
}>;

/**
 * An Icelandic mandatory-stop road sign — a regular octagon built from three
 * concentric rings (`stopSignShape.ts`), each independently coloured via
 * props. See `StopSign.stories.tsx` for interactive examples.
 */
export function StopSign({
  backgroundColour = "red",
  backgroundBorderColour = "white",
  borderColour = "black",
  text = "STOP",
  textColour = "white",
  size = 200,
}: StopSignProps) {
  // Stretch the text both wider (spread out letterforms) and taller by
  // scaling it around the sign's centre point rather than the SVG origin.
  const textScaleX = 1.15;
  const textScaleY = 1.8;
  return (
    <Svg width={size} height={size} viewBox={STOP_SIGN_VIEW_BOX}>
      <G>
        <Path d={buildStopSignBorderPath()} fill={roadSignColorValues[borderColour]} />
        <Path d={buildStopSignBorderBackgroundPath()} fill={roadSignColorValues[backgroundBorderColour]} />
        <Path d={buildStopSignBackgroundPath()} fill={roadSignColorValues[backgroundColour]} />
        <SvgText
          x={STOP_SIGN_CENTER.x}
          y={STOP_SIGN_CENTER.y}
          fontSize={110}
          fontWeight={roadSignFontWeightValues.heavy}
          fontFamily="Transport New"
          letterSpacing={ROAD_SIGN_LETTER_SPACING}
          textAnchor="middle"
          alignmentBaseline="central"
          fill={roadSignColorValues[textColour]}
          transform={`translate(${STOP_SIGN_CENTER.x} ${STOP_SIGN_CENTER.y}) scale(${textScaleX} ${textScaleY}) translate(${-STOP_SIGN_CENTER.x} ${-STOP_SIGN_CENTER.y})`}
        >
          {text}
        </SvgText>
      </G>
    </Svg>
  );
}
