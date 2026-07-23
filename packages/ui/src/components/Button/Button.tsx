"use client";

import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { Pressable, type PressableProps, type ViewStyle } from "react-native";
import { Text, type TextColor } from "../Text/Text";
import { Spinner } from "../Spinner/Spinner";
import { withClassName } from "../../cssInterop";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

export type ButtonType = "solid" | "outline" | "link";

export type ButtonProps = Readonly<{
  children: ReactNode;
  variant?: ButtonVariant;
  type?: ButtonType;
  fluid?: boolean;
  loading?: boolean;
  htmlType?: "button" | "submit" | "reset";
  className?: string;
}> & Omit<PressableProps, "children">;

const variantToForegroundTextColor: Readonly<Record<ButtonVariant, TextColor>> = {
  primary: "primaryForeground",
  secondary: "secondaryForeground",
  success: "successForeground",
  danger: "dangerForeground",
  warning: "warningForeground",
  info: "infoForeground",
};

function resolveButtonLabelColor(
  type: ButtonType,
  variant: ButtonVariant,
  disabled: boolean,
): TextColor {
  if (disabled) return "disabledText";
  if (type === "solid") return variantToForegroundTextColor[variant];
  return "current";
}

function normalizeButtonChildren(children: ReactNode, textColor: TextColor): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return (
        <Text
          variant="label"
          color={textColor}
        >
          {child}
        </Text>
      );
    }

    if (isValidElement(child) && child.type === Text) {
      const textChild = child as ReactElement<{ color?: TextColor }>;

      return cloneElement(textChild, {
        ...textChild.props,
        color: textColor,
      });
    }

    return child;
  });
}

export function Button({
  children,
  variant = "primary",
  type = "solid",
  fluid = true,
  loading = false,
  htmlType,
  className,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const labelColor = resolveButtonLabelColor(type, variant, Boolean(disabled || loading));

  const rootClassName = [
    "mb-button",
    fluid ? "mb-button--fluid" : "mb-button--auto",
    `mb-button--${type}`,
    `mb-button--${variant}`,
    `mb-button--${type}-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Pressable
      style={withClassName(rootClassName, style as ViewStyle) as ViewStyle}
      accessibilityRole="button"
      disabled={disabled || loading}
      // htmlType is accepted for API compatibility but unused in RN primitives.
      {...props}
    >
      <>
        {loading ? (
          <Spinner
            color={labelColor}
            size="small"
            className="mb-button__spinner"
          />
        ) : null}
        {normalizeButtonChildren(children, labelColor)}
      </>
    </Pressable>
  );
}
