"use client";

import { Delete, Phone } from "lucide-react";
import { useState } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { themeModes } from "@midbyur/theme";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { IconButton } from "../IconButton/IconButton";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import type { DialPadProps } from "./DialPad";

const KEYPAD_ROWS: readonly (readonly string[])[] = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

export function DialPad({
  displayValue,
  error = null,
  onDigitPress,
  onBackspace,
  onCall,
  controlsDisabled = false,
  backspaceDisabled = false,
  callDisabled = false,
}: DialPadProps) {
  const scheme = useColorScheme();
  const mode = scheme === "dark" ? "dark" : "light";
  const colors = themeModes[mode];

  const [pressedDigit, setPressedDigit] = useState<string | null>(null);
  const [isBackspacePressed, setIsBackspacePressed] = useState(false);
  const [isCallPressed, setIsCallPressed] = useState(false);

  return (
    <>
      <View style={styles.displayWrap}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>

      {error ? (
        <Card>
          <Stack gap={14}>
            <Text size="sm" weight="bold" color="danger">
              Error
            </Text>
            <Text size="sm" color="danger">
              {error}
            </Text>
          </Stack>
        </Card>
      ) : null}

      <Stack gap={12} className="w-full" style={styles.keypadWrap}>
        {KEYPAD_ROWS.map((row) => {
          const rowKey = row.join("");

          return (
            <View key={`row-${rowKey}`} style={styles.keypadRow}>
              {row.map((digit) => (
                <Button
                  key={digit}
                  onPress={() => onDigitPress(digit)}
                  onPressIn={() => setPressedDigit(digit)}
                  onPressOut={() => setPressedDigit(null)}
                  disabled={controlsDisabled}
                  style={[
                    styles.circleButton,
                    {
                      backgroundColor: pressedDigit === digit ? colors.surfaceAccent : colors.surface,
                    },
                  ]}
                >
                  <Text style={{ color: colors.text, fontSize: 30, fontWeight: "600" }}>{digit}</Text>
                </Button>
              ))}
            </View>
          );
        })}

        <View style={styles.keypadRow}>
          <View style={styles.circleSpacer} />
          <Button
            onPress={() => onDigitPress("0")}
            onPressIn={() => setPressedDigit("0")}
            onPressOut={() => setPressedDigit(null)}
            disabled={controlsDisabled}
            style={[
              styles.circleButton,
              {
                backgroundColor: pressedDigit === "0" ? colors.surfaceAccent : colors.surface,
              },
            ]}
          >
            <Text style={{ color: colors.text, fontSize: 30, fontWeight: "600" }}>0</Text>
          </Button>
          <IconButton
            icon={Delete}
            onPress={onBackspace}
            onPressIn={() => setIsBackspacePressed(true)}
            onPressOut={() => setIsBackspacePressed(false)}
            disabled={backspaceDisabled}
            size={25}
            style={[
              styles.circleIconButton,
              {
                backgroundColor: isBackspacePressed ? colors.surfaceAccent : colors.surface,
              },
            ]}
          />
        </View>

        <View style={styles.keypadRow}>
          <View style={styles.circleSpacer} />
          <IconButton
            icon={Phone}
            color="successForeground"
            onPress={onCall}
            onPressIn={() => setIsCallPressed(true)}
            onPressOut={() => setIsCallPressed(false)}
            disabled={callDisabled}
            size={30}
            style={[
              styles.circleIconButton,
              {
                backgroundColor: isCallPressed ? colors.successHover : colors.success,
              },
            ]}
          />
          <View style={styles.circleSpacer} />
        </View>
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  displayWrap: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    minHeight: 96,
  },
  displayText: {
    fontSize: 44,
    lineHeight: 52,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  keypadWrap: {
    width: "100%",
    alignItems: "center",
  },
  keypadRow: {
    width: "100%",
    maxWidth: 320,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circleButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 0,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  circleSpacer: {
    width: 88,
    height: 88,
  },
  circleIconButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 0,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});