export const GAP_SIZE_VALUES = {
  sm: 8,
  md: 12,
  lg: 24,
} as const;

export type GapSize = keyof typeof GAP_SIZE_VALUES;
export type GapValue = GapSize | number | string;

export function resolveGapValue(value: GapValue): string {
  if (typeof value === "number") {
    return `${value}px`;
  }

  if (value in GAP_SIZE_VALUES) {
    return `${GAP_SIZE_VALUES[value as GapSize]}px`;
  }

  return value;
}

export function resolveGapNumber(value?: GapSize | number): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "number") {
    return value;
  }

  return GAP_SIZE_VALUES[value];
}