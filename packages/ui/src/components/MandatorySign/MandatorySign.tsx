"use client";

import Svg, { G, Path } from "react-native-svg";
import type { RoadSignColour } from "../WarningSign/roadSignColors";
import { roadSignColorValues } from "../WarningSign/roadSignColors";
import {
  MANDATORY_SIGN_BORDER_WIDTH,
  MANDATORY_SIGN_CENTER,
  MANDATORY_SIGN_INNER_CIRCLE_PATH,
  MANDATORY_SIGN_INNER_RADIUS,
  MANDATORY_SIGN_OUTER_CIRCLE_PATH,
  MANDATORY_SIGN_VIEW_BOX,
} from "./mandatorySignShape";
import type { MandatorySignSymbol } from "./mandatorySignSymbols";
import { MANDATORY_SIGN_SYMBOL_BBOX, mandatorySignSymbolPaths } from "./mandatorySignSymbols";

export type { MandatorySignSymbol, RoadSignColour };

/** How a `secondSymbol` is arranged relative to `symbol`. */
export type MandatorySignSecondSymbolLocation = "vertical" | "horizontal";

export type MandatorySignProps = Readonly<{
  /** Which pictogram to draw. Leave unset for a blank circle. */
  symbol?: MandatorySignSymbol;
  /** Colour of the symbol pictogram(s). Defaults to "white". */
  symbolColour?: RoadSignColour;
  /** Colour of the main circle background. Defaults to "capitalBlue", the brighter alternate blue used by the reference artwork for this sign class (see `roadSignColors.ts`). */
  backgroundColour?: RoadSignColour;
  /** Colour of the ring between the outer border and the background circle. Defaults to "white". */
  backgroundBorderColour?: RoadSignColour;
  /** Colour of the thin outer circle stroke. Defaults to "black". */
  borderColour?: RoadSignColour;
  /**
   * An optional second pictogram, combined with `symbol` on the same sign
   * (e.g. "Bikes and pedestrians only" combines `Pedestrian` + `Bike`,
   * "Separate lanes for pedestrians and bikes" combines `Bike` + `Pedestrian`
   * split by a divider line). Ignored if `symbol` is unset.
   */
  secondSymbol?: MandatorySignSymbol;
  /**
   * How `secondSymbol` is arranged relative to `symbol`: "vertical" stacks
   * `symbol` above `secondSymbol` with no divider (matching "Bikes and
   * pedestrians only", where both share the same lane); "horizontal" places
   * `symbol` to the left and `secondSymbol` to the right of a vertical
   * divider line (matching "Separate lanes for pedestrians and bikes",
   * where each pictogram has its own lane). Defaults to "vertical".
   */
  secondSymbolLocation?: MandatorySignSecondSymbolLocation;
  /** Width of the rendered sign, in pixels. Height matches width (the sign is a circle). */
  size?: number;
}>;

/**
 * Uniformly scale (preserving aspect ratio) and translate a symbol's raw
 * path bounding box so it's centred within an arbitrary target box, with a
 * little padding on every side so the icon doesn't touch the box's edges.
 */
function buildFitTransform(
  bbox: Readonly<{ minX: number; minY: number; maxX: number; maxY: number }>,
  box: Readonly<{ x: number; y: number; width: number; height: number }>,
  padding: number,
): string {
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
}

/**
 * An Icelandic circular mandatory road sign (class C), built by combining a
 * reusable circle shape (`mandatorySignShape.ts`) with one or two symbol
 * glyphs (`mandatorySignSymbols.ts`), coloured and composed via props
 * instead of being baked into fixed artwork. See
 * `MandatorySign.stories.tsx` for interactive examples.
 */
export function MandatorySign({
  symbol,
  symbolColour = "white",
  backgroundColour = "capitalBlue",
  backgroundBorderColour = "white",
  borderColour = "black",
  secondSymbol,
  secondSymbolLocation = "vertical",
  size = 200,
}: MandatorySignProps) {
  const center = MANDATORY_SIGN_CENTER;
  const radius = MANDATORY_SIGN_INNER_RADIUS;
  // The circle's bounding square, used as the fit-to-space target for a
  // single symbol (or split in half for a `secondSymbol` combination).
  const circleBox = { x: center.x - radius, y: center.y - radius, width: radius * 2, height: radius * 2 };
  // Reference artwork leaves noticeably more breathing room around each
  // pictogram than a smaller padding produces -- 0.30 * radius matches the
  // real signs' icon-to-edge margin.
  const padding = radius * 0.3;
  const backgroundFill = roadSignColorValues[backgroundColour];

  let symbolTransform: string | undefined;
  let secondSymbolTransform: string | undefined;
  if (symbol && secondSymbol) {
    if (secondSymbolLocation === "horizontal") {
      const halfBox = { x: circleBox.x, y: circleBox.y, width: circleBox.width / 2, height: circleBox.height };
      symbolTransform = buildFitTransform(MANDATORY_SIGN_SYMBOL_BBOX[symbol], halfBox, padding);
      secondSymbolTransform = buildFitTransform(MANDATORY_SIGN_SYMBOL_BBOX[secondSymbol], {
        ...halfBox,
        x: circleBox.x + circleBox.width / 2,
      }, padding);
    } else {
      const halfBox = { x: circleBox.x, y: circleBox.y, width: circleBox.width, height: circleBox.height / 2 };
      symbolTransform = buildFitTransform(MANDATORY_SIGN_SYMBOL_BBOX[symbol], halfBox, padding);
      secondSymbolTransform = buildFitTransform(MANDATORY_SIGN_SYMBOL_BBOX[secondSymbol], {
        ...halfBox,
        y: circleBox.y + circleBox.height / 2,
      }, padding);
    }
  } else if (symbol) {
    symbolTransform = buildFitTransform(MANDATORY_SIGN_SYMBOL_BBOX[symbol], circleBox, padding);
  }

  // "Separate lanes for pedestrians and bikes" draws a thin vertical divider
  // line down the middle of the circle between the two side-by-side
  // pictograms -- the "vertical" (stacked) combination shares one lane and
  // has no divider, matching the reference artwork.
  const showDivider = symbol && secondSymbol && secondSymbolLocation === "horizontal";
  const dividerWidth = radius * 0.045;
  const dividerHalfHeight = radius * 0.92;

  return (
    <Svg width={size} height={size} viewBox={MANDATORY_SIGN_VIEW_BOX}>
      <Path
        d={MANDATORY_SIGN_OUTER_CIRCLE_PATH}
        fill={roadSignColorValues[backgroundBorderColour]}
        stroke={roadSignColorValues[borderColour]}
        strokeWidth={MANDATORY_SIGN_BORDER_WIDTH}
      />
      <Path d={MANDATORY_SIGN_INNER_CIRCLE_PATH} fill={backgroundFill} />
      {symbol && (
        <G transform={symbolTransform}>
          <Path d={mandatorySignSymbolPaths[symbol]} fill={roadSignColorValues[symbolColour]} />
        </G>
      )}
      {symbol && secondSymbol && (
        <G transform={secondSymbolTransform}>
          <Path d={mandatorySignSymbolPaths[secondSymbol]} fill={roadSignColorValues[symbolColour]} />
        </G>
      )}
      {showDivider && (
        <Path
          d={`M ${center.x - dividerWidth / 2},${center.y - dividerHalfHeight} h ${dividerWidth} v ${dividerHalfHeight * 2} h ${-dividerWidth} z`}
          fill={roadSignColorValues[symbolColour]}
        />
      )}
    </Svg>
  );
}
