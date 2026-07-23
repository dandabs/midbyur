"use client";

import {
  forwardRef,
  type ReactNode,
} from "react";
import {
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
  type KeyboardTypeOptions,
} from "react-native";
import { withClassName } from "../../cssInterop";

export type InputProps = Readonly<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  className?: string;
  inputClassName?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}> & Omit<TextInputProps, "value" | "onChangeText" | "editable" | "placeholder" | "secureTextEntry" | "keyboardType" | "maxLength">;

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    value,
    onChangeText,
    placeholder,
    editable = true,
    secureTextEntry = false,
    keyboardType,
    maxLength,
    className,
    inputClassName,
    prefix,
    suffix,
    style,
    ...props
  },
  ref,
) {
  const rootClassName = ["mb-input", !editable && "mb-input--disabled", className]
    .filter(Boolean)
    .join(" ");

  const fieldClassName = ["mb-input__field", inputClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <View style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}>
      {prefix ? (
        <View style={withClassName("mb-input__prefix") as ViewStyle}>
          {prefix}
        </View>
      ) : null}
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        style={withClassName(fieldClassName) as ViewStyle}
        {...props}
      />
      {suffix ? (
        <View style={withClassName("mb-input__suffix") as ViewStyle}>
          {suffix}
        </View>
      ) : null}
    </View>
  );
});
