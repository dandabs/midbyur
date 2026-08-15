"use client";

import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import { ROAD_SIGN_LETTER_SPACING, roadSignFontWeightValues } from "../WarningSign/roadSignFonts";
import type { RoadSignColour } from "../WarningSign/roadSignColors";
import { roadSignColorValues } from "../WarningSign/roadSignColors";
import {
  buildServiceSignIconSlotPath,
  SERVICE_SIGN_BORDER_PATH,
  SERVICE_SIGN_BORDER_WIDTH,
  SERVICE_SIGN_FRAME_PATH,
  SERVICE_SIGN_ICON_SLOT,
  SERVICE_SIGN_REFERENCE_BLUE,
  SERVICE_SIGN_VIEW_BOX,
} from "./serviceSignShape";
import type { ServiceSignSymbol } from "./serviceSignSymbols";
import {
  SERVICE_SIGN_RENTAL_KEY_BBOX,
  SERVICE_SIGN_RENTAL_KEY_PATH,
  SERVICE_SIGN_SYMBOL_BBOX,
  serviceSignSymbolPaths,
} from "./serviceSignSymbols";

export type { RoadSignColour, ServiceSignSymbol };

const SERVICE_SIGN_ASPECT_RATIO = 671.07422 / 600.79077;

export type ServiceSignProps = Readonly<{
  /** Which pictogram to draw in the sign's white icon slot. Leave unset for a blank slot. */
  symbol?: ServiceSignSymbol;
  /**
   * Colour of the symbol pictogram. Defaults to "black". Ignored for any
   * part of the symbol that has a fixed non-black colour in the reference
   * artwork (e.g. `PoliceStation`'s yellow star) -- those parts always
   * render in their fixed colour.
   */
  iconColour?: RoadSignColour;
  /** Colour of the board and the icon slot behind the symbol. Defaults to "white". */
  backgroundColour?: RoadSignColour;
  /**
   * Colour of the frame between the board's outer edge and the icon slot.
   * Defaults to "blue", but at that default value renders using the
   * service sign class's own reference blue (`#2163AD`, slightly brighter
   * than the shared `RoadSignColour` "blue") instead of the shared
   * palette's `#0039A6` -- see `SERVICE_SIGN_REFERENCE_BLUE` in
   * `serviceSignShape.ts`. Any other `RoadSignColour` renders using the
   * shared palette as usual.
   */
  backgroundBorderColour?: RoadSignColour;
  /** Colour of the board's thin outer outline. Defaults to "black". */
  borderColour?: RoadSignColour;
  /**
   * First line of free text, used by the "Radio station/FM frequency" sign
   * (`symbol="RadioStation"`) instead of a pictogram -- e.g. a station name.
   * Independently scaled to fill the width of the white icon slot.
   */
  firstLineText?: string;
  /** Second line of free text for `symbol="RadioStation"` (e.g. an FM frequency), scaled independently of `firstLineText`. */
  secondLineText?: string;
  /**
   * Draws the "for rent" key glyph in the upper part of the icon slot, with
   * `symbol`'s icon fit-scaled into the remaining space below it (matching
   * the reference "rental" signs, e.g. `symbol="Car"` + `rental` for the car
   * rental sign, `symbol="Boat"` + `rental` for the boat rental sign).
   */
  rental?: boolean;
  /** Width of the rendered sign, in pixels. Height follows the sign's aspect ratio. */
  size?: number;
}>;

/**
 * An Icelandic class E service sign, built by combining a reusable board
 * shape (`serviceSignShape.ts`) with an optional symbol glyph
 * (`serviceSignSymbols.ts`) and/or free text, coloured and composed via
 * props instead of being baked into fixed artwork. See
 * `ServiceSign.stories.tsx` for interactive examples.
 */
export function ServiceSign({
  symbol,
  iconColour = "black",
  backgroundColour = "white",
  backgroundBorderColour = "blue",
  borderColour = "black",
  firstLineText,
  secondLineText,
  rental = false,
  size = 200,
}: ServiceSignProps) {
  const isRadioStation = symbol === "RadioStation";
  const slot = SERVICE_SIGN_ICON_SLOT;
  const slotCenterX = slot.x + slot.width / 2;
  // The reference artwork's frame blue doesn't match the shared palette's
  // "blue" -- render the more accurate reference hex at the default value,
  // but fall back to the shared palette for any other colour choice.
  const frameFill = backgroundBorderColour === "blue" ? SERVICE_SIGN_REFERENCE_BLUE : roadSignColorValues[backgroundBorderColour];

  // "Radio station" has no pictogram in the reference artwork -- it bakes in
  // the station name and FM frequency as text instead, so render two lines
  // of free text sized to fill the slot's width, each independently scaled
  // by its own character count.
  const scaleFontSizeForWidth = (text: string | undefined): number => {
    const length = text?.length ?? 0;
    if (length === 0) return 0;
    const averageCharWidthRatio = 0.62;
    const availableWidth = slot.width * 0.9;
    return availableWidth / (length * averageCharWidthRatio);
  };
  const firstLineFontSize = scaleFontSizeForWidth(firstLineText);
  const secondLineFontSize = scaleFontSizeForWidth(secondLineText);
  const firstLineY = slot.y + slot.height * 0.35;
  const secondLineY = slot.y + slot.height * 0.7;

  // "Rental" signs draw a shared key glyph in the upper part of the slot,
  // then fit-scale the selected symbol's icon (uniformly, preserving aspect
  // ratio) into the remaining space below it, with a little padding on
  // every side so the icon doesn't touch the slot's edges.
  const keyBBox = SERVICE_SIGN_RENTAL_KEY_BBOX;
  const symbolBBox = symbol ? SERVICE_SIGN_SYMBOL_BBOX[symbol] : undefined;
  const rentalPadding = slot.width * 0.06;
  const rentalAvailableWidth = slot.width - rentalPadding * 2;
  const rentalAvailableTop = keyBBox.maxY + rentalPadding;
  const rentalAvailableBottom = slot.y + slot.height - rentalPadding;
  const rentalAvailableHeight = rentalAvailableBottom - rentalAvailableTop;
  const rentalTransform =
    rental && symbolBBox
      ? (() => {
          const symbolWidth = symbolBBox.maxX - symbolBBox.minX;
          const symbolHeight = symbolBBox.maxY - symbolBBox.minY;
          const scale = Math.min(rentalAvailableWidth / symbolWidth, rentalAvailableHeight / symbolHeight);
          const targetCenterX = slotCenterX;
          const targetCenterY = rentalAvailableTop + rentalAvailableHeight / 2;
          const symbolCenterX = (symbolBBox.minX + symbolBBox.maxX) / 2;
          const symbolCenterY = (symbolBBox.minY + symbolBBox.maxY) / 2;
          return `translate(${targetCenterX} ${targetCenterY}) scale(${scale}) translate(${-symbolCenterX} ${-symbolCenterY})`;
        })()
      : undefined;

  return (
    <Svg width={size} height={size * SERVICE_SIGN_ASPECT_RATIO} viewBox={SERVICE_SIGN_VIEW_BOX}>
      <Path
        d={SERVICE_SIGN_BORDER_PATH}
        fill={roadSignColorValues[backgroundColour]}
        stroke={roadSignColorValues[borderColour]}
        strokeWidth={SERVICE_SIGN_BORDER_WIDTH}
      />
      <Path d={SERVICE_SIGN_FRAME_PATH} fill={frameFill} />
      <Path d={buildServiceSignIconSlotPath()} fill={roadSignColorValues[backgroundColour]} />
      {rental && (
        <Path d={SERVICE_SIGN_RENTAL_KEY_PATH} fill={roadSignColorValues[iconColour]} />
      )}
      {symbol && !isRadioStation && (
        <G transform={rentalTransform}>
          {serviceSignSymbolPaths[symbol].map((path) => {
            const d = typeof path === "string" ? path : path.d;
            const fill = typeof path === "string" ? roadSignColorValues[iconColour] : roadSignColorValues[path.colour];
            return <Path key={d} d={d} fill={fill} />;
          })}
        </G>
      )}
      {isRadioStation && firstLineText && (
        <SvgText
          x={slotCenterX}
          y={firstLineY}
          fontSize={firstLineFontSize}
          fontWeight={roadSignFontWeightValues.heavy}
          fontFamily="Transport New"
          letterSpacing={ROAD_SIGN_LETTER_SPACING}
          textAnchor="middle"
          alignmentBaseline="central"
          fill={roadSignColorValues[iconColour]}
        >
          {firstLineText}
        </SvgText>
      )}
      {isRadioStation && secondLineText && (
        <SvgText
          x={slotCenterX}
          y={secondLineY}
          fontSize={secondLineFontSize}
          fontWeight={roadSignFontWeightValues.heavy}
          fontFamily="Transport New"
          letterSpacing={ROAD_SIGN_LETTER_SPACING}
          textAnchor="middle"
          alignmentBaseline="central"
          fill={roadSignColorValues[iconColour]}
        >
          {secondLineText}
        </SvgText>
      )}
    </Svg>
  );
}
