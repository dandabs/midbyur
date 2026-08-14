"use client";

import { themeModes } from "@midbyur/theme";
import { useMemo, useRef, useState } from "react";
import { PanResponder, View, type LayoutChangeEvent, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { useMidbyurTheme } from "../../provider";
import { Text } from "../Text/Text";

export type SliderProps = Readonly<{
  value: number;
  min: number;
  max: number;
  step?: number;
  onValueChange: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  formatValue?: (value: number) => string;
  /** Labels shown below the ends of the track, e.g. "10 km" / "300 km". Defaults to the raw
   * `min`/`max` numbers if omitted. Pass `false` to hide the scale labels entirely. */
  formatScaleLabel?: ((boundary: number) => string) | false;
  disabled?: boolean;
  className?: string;
}>;

const HANDLE_SIZE = 24;
const TRACK_HEIGHT = 4;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundToStep(value: number, min: number, step: number): number {
  return min + Math.round((value - min) / step) * step;
}

/**
 * A single-value draggable slider on a horizontal line — for numeric ranges with no natural text
 * input (e.g. a search radius). Built on RN's built-in PanResponder rather than
 * react-native-gesture-handler so this package doesn't need to add that as a dependency; consumer
 * apps that already use gesture-handler for other things (bottom sheets, etc.) don't conflict
 * with it since PanResponder is a separate, always-available RN API.
 */
export function Slider({
  value,
  min,
  max,
  step = 1,
  onValueChange,
  onSlidingComplete,
  formatValue,
  formatScaleLabel,
  disabled = false,
  className,
}: SliderProps) {
  const theme = useMidbyurTheme();
  const colors = themeModes[theme] ?? themeModes.light;

  const [trackWidth, setTrackWidth] = useState(0);
  const dragStartValue = useRef(value);
  const dragStartX = useRef(0);
  const [dragging, setDragging] = useState(false);

  const clampedValue = clamp(value, min, max);
  const fraction = max > min ? (clampedValue - min) / (max - min) : 0;

  const handleLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: () => {
          dragStartValue.current = clampedValue;
          setDragging(true);
        },
        onPanResponderMove: (_event, gestureState) => {
          if (trackWidth <= 0) return;
          const startFraction = max > min ? (dragStartValue.current - min) / (max - min) : 0;
          dragStartX.current = startFraction * trackWidth;
          const nextX = clamp(dragStartX.current + gestureState.dx, 0, trackWidth);
          const nextFraction = trackWidth > 0 ? nextX / trackWidth : 0;
          const rawValue = min + nextFraction * (max - min);
          const nextValue = clamp(roundToStep(rawValue, min, step), min, max);
          onValueChange(nextValue);
        },
        onPanResponderRelease: () => {
          setDragging(false);
          onSlidingComplete?.(clampedValue);
        },
        onPanResponderTerminate: () => {
          setDragging(false);
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, trackWidth, min, max, step],
  );

  // `var(--color-*)` only resolves through the css-interop `withClassName` pipeline on plain
  // style objects it never processed here — plain inline style props silently keep the literal
  // string, which React Native then just ignores, leaving the track/fill/handle invisible
  // (blending into whatever the parent's actual background is). Resolve real colors instead.
  const trackStyle: ViewStyle = {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: colors.border,
    justifyContent: "center",
  };

  const fillStyle: ViewStyle = {
    position: "absolute",
    left: 0,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    width: `${fraction * 100}%`,
    backgroundColor: colors.primary,
  };

  const handleStyle: ViewStyle = {
    position: "absolute",
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: HANDLE_SIZE / 2,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.surface,
    left: fraction * trackWidth - HANDLE_SIZE / 2,
    top: -(HANDLE_SIZE - TRACK_HEIGHT) / 2,
    opacity: disabled ? 0.5 : 1,
    transform: dragging ? [{ scale: 1.15 }] : [{ scale: 1 }],
  };

  const scaleLabeler = formatScaleLabel === false ? null : (formatScaleLabel ?? String);

  return (
    <View style={withClassName(["mb-slider", className].filter(Boolean).join(" ")) as ViewStyle}>
      {formatValue ? (
        <Text size="sm" color="textMuted" style={{ marginBottom: 8 }}>
          {formatValue(clampedValue)}
        </Text>
      ) : null}

      <View
        style={{ paddingVertical: HANDLE_SIZE / 2, justifyContent: "center" }}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
      >
        <View style={trackStyle}>
          <View style={fillStyle} />
        </View>
        <View style={handleStyle} />
      </View>

      {scaleLabeler ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text size="xs" color="textMuted">
            {scaleLabeler(min)}
          </Text>
          <Text size="xs" color="textMuted">
            {scaleLabeler(max)}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
