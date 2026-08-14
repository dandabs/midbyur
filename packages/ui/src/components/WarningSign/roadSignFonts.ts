/**
 * Shared "Transport New" font setup for Icelandic road sign components that
 * render text (larger informational/warning signs, distance signs, etc.).
 *
 * Font files are the k-type.com "Transport New" family (Medium/Heavy), the
 * same typeface used on official Icelandic and UK road signage, sourced from
 * https://github.com/openpermissions/service-ui/tree/master/assets/fonts.
 * Font files themselves live per-app (`apps/*\/public/fonts`,
 * `apps/example-expo/assets/fonts`) alongside the existing Stack Sans fonts,
 * and are registered via `@font-face` (web) / `MIDBYUR_NATIVE_FONTS` (native).
 *
 * Road sign text uses noticeably wider letter spacing than body copy, so
 * `ROAD_SIGN_LETTER_SPACING` should be applied wherever this font is used.
 */
export const ROAD_SIGN_FONT_FAMILY = "Transport New";

export type RoadSignFontWeight = "medium" | "heavy";

export const roadSignFontWeightValues: Readonly<Record<RoadSignFontWeight, number>> = {
  medium: 500,
  heavy: 700,
};

/** Matches the character spacing used on Icelandic road sign text panels. */
export const ROAD_SIGN_LETTER_SPACING = "0.04em";
