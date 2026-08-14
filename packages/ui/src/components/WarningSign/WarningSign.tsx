"use client";

import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import type { RoadSignColour } from "./roadSignColors";
import { roadSignColorValues } from "./roadSignColors";
import {
  WARNING_SIGN_ASPECT_RATIO,
  WARNING_SIGN_BACKGROUND_PATH,
  WARNING_SIGN_GROUP_TRANSFORM,
  WARNING_SIGN_OUTLINE_PATH,
  WARNING_SIGN_VIEW_BOX,
} from "./warningSignShape";
import type { WarningSignSymbol } from "./warningSignSymbols";
import { WARNING_SIGN_GRADIENT_TEXT_POSITION, warningSignSymbolPaths } from "./warningSignSymbols";

export type { RoadSignColour, WarningSignSymbol };

export type WarningSignProps = Readonly<{
  /** Colour of the outer triangle border. Defaults to the standard "red". */
  borderColour?: RoadSignColour;
  /** Colour of the inset triangle background. Defaults to the standard "yellow". */
  backgroundColour?: RoadSignColour;
  /** Colour of the symbol glyph. Defaults to "black". */
  symbolColour?: RoadSignColour;
  /** Which warning symbol to draw on the sign. */
  symbol: WarningSignSymbol;
  /**
   * Gradient percentage shown next to the "%" symbol on `SteepDescent`/`SteepAscent`
   * signs (e.g. `10` renders as "10%"). Ignored for all other symbols. Defaults to `10`.
   */
  gradientPercent?: number;
  /** Width of the rendered sign, in pixels. Height follows the sign's fixed aspect ratio. */
  size?: number;
}>;

/**
 * An Icelandic triangular warning road sign (class A), built by combining a
 * reusable outline/background shape (`warningSignShape.ts`) with a symbol
 * glyph (`warningSignSymbols.ts`), coloured via props instead of being baked
 * into the artwork. See `WarningSign.stories.tsx` for interactive examples.
 */
export function WarningSign({
  borderColour = "red",
  backgroundColour = "yellow",
  symbolColour = "black",
  symbol,
  gradientPercent = 10,
  size = 200,
}: WarningSignProps) {
  const height = Math.round(size * WARNING_SIGN_ASPECT_RATIO);
  const gradientTextPosition = WARNING_SIGN_GRADIENT_TEXT_POSITION[symbol];

  return (
    <Svg width={size} height={height} viewBox={WARNING_SIGN_VIEW_BOX}>
      <G transform={WARNING_SIGN_GROUP_TRANSFORM}>
        <Path d={WARNING_SIGN_OUTLINE_PATH} fill={roadSignColorValues[borderColour]} />
        <Path d={WARNING_SIGN_BACKGROUND_PATH} fill={roadSignColorValues[backgroundColour]} />
        {warningSignSymbolPaths[symbol].map((d) => (
          <Path key={d} d={d} fill={roadSignColorValues[symbolColour]} />
        ))}
        {gradientTextPosition && (
          <SvgText
            x={gradientTextPosition.x}
            y={gradientTextPosition.y}
            fontSize={gradientTextPosition.fontSize}
            fontWeight={700}
            fontFamily="Transport New"
            textAnchor="middle"
            alignmentBaseline="central"
            fill={roadSignColorValues[symbolColour]}
            transform={`rotate(${gradientTextPosition.rotation} ${gradientTextPosition.x} ${gradientTextPosition.y})`}
          >
            {gradientPercent}%
          </SvgText>
        )}
      </G>
    </Svg>
  );
}
