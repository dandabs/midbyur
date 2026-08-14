/**
 * Shared octagon geometry for the Icelandic mandatory-stop sign.
 *
 * Unlike `WarningSign`/`ProhibitorySign`, this shape isn't extracted from
 * reference artwork — Icelandic STOP signs use the standard international
 * octagon, drawn here as three concentric regular octagons (border / border
 * background / background) so each ring can be recoloured independently via
 * `StopSign`'s props.
 */
export const STOP_SIGN_VIEW_BOX = "0 0 600 600";

export const STOP_SIGN_CENTER = { x: 300, y: 300 } as const;

/** Circumradius of the outermost octagon (the `borderColour` outline). */
export const STOP_SIGN_OUTER_RADIUS = 290;

/** Width of the outer border ring, in the same units as `STOP_SIGN_OUTER_RADIUS`. */
export const STOP_SIGN_BORDER_WIDTH = 6;

/** Width of the inner border-background ring (between the border and the main background). */
export const STOP_SIGN_BORDER_BACKGROUND_WIDTH = 22;

function regularOctagonPath(center: { x: number; y: number }, circumradius: number): string {
  const points: string[] = [];
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI / 8) * (2 * i + 1);
    const x = center.x + circumradius * Math.sin(angle);
    const y = center.y - circumradius * Math.cos(angle);
    points.push(`${x.toFixed(3)},${y.toFixed(3)}`);
  }
  return `M ${points.join(" L ")} Z`;
}

/** Outermost octagon, coloured by `borderColour`. */
export function buildStopSignBorderPath(): string {
  return regularOctagonPath(STOP_SIGN_CENTER, STOP_SIGN_OUTER_RADIUS);
}

/** Middle octagon (drawn on top of the border), coloured by `backgroundBorderColour`. */
export function buildStopSignBorderBackgroundPath(): string {
  return regularOctagonPath(STOP_SIGN_CENTER, STOP_SIGN_OUTER_RADIUS - STOP_SIGN_BORDER_WIDTH);
}

/** Innermost octagon (drawn on top of the border background), coloured by `backgroundColour`. */
export function buildStopSignBackgroundPath(): string {
  return regularOctagonPath(
    STOP_SIGN_CENTER,
    STOP_SIGN_OUTER_RADIUS - STOP_SIGN_BORDER_WIDTH - STOP_SIGN_BORDER_BACKGROUND_WIDTH,
  );
}
