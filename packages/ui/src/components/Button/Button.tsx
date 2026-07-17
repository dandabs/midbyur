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

const variantToTextColor: Readonly<Record<ButtonVariant, TextColor>> = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
};

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
  return variantToTextColor[variant];
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

const variantClassNames: Readonly<
  Record<
    ButtonVariant,
    {
      solidBg: string;
      solidHoverBg: string;
      solidFg: string;
      outlineColor: string;
      outlineHoverBg: string;
      outlineHoverFg: string;
      linkColor: string;
      linkHoverColor: string;
    }
  >
> = {
  primary: {
    solidBg: "bg-[var(--color-primary)]",
    solidHoverBg: "enabled:hover:bg-[var(--color-primaryHover)]",
    solidFg: "text-[var(--color-primaryForeground)]",
    outlineColor: "border-[var(--color-primary)] text-[var(--color-primary)]",
    outlineHoverBg: "enabled:hover:bg-[var(--color-primary)]",
    outlineHoverFg: "enabled:hover:text-[var(--color-primaryForeground)]",
    linkColor: "text-[var(--color-primary)]",
    linkHoverColor: "enabled:hover:text-[var(--color-primaryHover)]",
  },
  secondary: {
    solidBg: "bg-[var(--color-secondary)]",
    solidHoverBg: "enabled:hover:bg-[var(--color-secondaryHover)]",
    solidFg: "text-[var(--color-secondaryForeground)]",
    outlineColor: "border-[var(--color-secondary)] text-[var(--color-secondary)]",
    outlineHoverBg: "enabled:hover:bg-[var(--color-secondary)]",
    outlineHoverFg: "enabled:hover:text-[var(--color-secondaryForeground)]",
    linkColor: "text-[var(--color-secondary)]",
    linkHoverColor: "enabled:hover:text-[var(--color-secondaryHover)]",
  },
  success: {
    solidBg: "bg-[var(--color-success)]",
    solidHoverBg: "enabled:hover:bg-[var(--color-successHover)]",
    solidFg: "text-[var(--color-successForeground)]",
    outlineColor: "border-[var(--color-success)] text-[var(--color-success)]",
    outlineHoverBg: "enabled:hover:bg-[var(--color-success)]",
    outlineHoverFg: "enabled:hover:text-[var(--color-successForeground)]",
    linkColor: "text-[var(--color-success)]",
    linkHoverColor: "enabled:hover:text-[var(--color-successHover)]",
  },
  danger: {
    solidBg: "bg-[var(--color-danger)]",
    solidHoverBg: "enabled:hover:bg-[var(--color-dangerHover)]",
    solidFg: "text-[var(--color-dangerForeground)]",
    outlineColor: "border-[var(--color-danger)] text-[var(--color-danger)]",
    outlineHoverBg: "enabled:hover:bg-[var(--color-danger)]",
    outlineHoverFg: "enabled:hover:text-[var(--color-dangerForeground)]",
    linkColor: "text-[var(--color-danger)]",
    linkHoverColor: "enabled:hover:text-[var(--color-dangerHover)]",
  },
  warning: {
    solidBg: "bg-[var(--color-warning)]",
    solidHoverBg: "enabled:hover:bg-[var(--color-warningHover)]",
    solidFg: "text-[var(--color-warningForeground)]",
    outlineColor: "border-[var(--color-warning)] text-[var(--color-warning)]",
    outlineHoverBg: "enabled:hover:bg-[var(--color-warning)]",
    outlineHoverFg: "enabled:hover:text-[var(--color-warningForeground)]",
    linkColor: "text-[var(--color-warning)]",
    linkHoverColor: "enabled:hover:text-[var(--color-warningHover)]",
  },
  info: {
    solidBg: "bg-[var(--color-info)]",
    solidHoverBg: "enabled:hover:bg-[var(--color-infoHover)]",
    solidFg: "text-[var(--color-infoForeground)]",
    outlineColor: "border-[var(--color-info)] text-[var(--color-info)]",
    outlineHoverBg: "enabled:hover:bg-[var(--color-info)]",
    outlineHoverFg: "enabled:hover:text-[var(--color-infoForeground)]",
    linkColor: "text-[var(--color-info)]",
    linkHoverColor: "enabled:hover:text-[var(--color-infoHover)]",
  },
};

function getButtonTypeClasses(type: ButtonType, variant: ButtonVariant): string {
  const variantClasses = variantClassNames[variant];

  if (type === "solid") {
    return [
      "px-4 py-1.5",
      variantClasses.solidBg,
      variantClasses.solidFg,
      variantClasses.solidHoverBg,
      "disabled:bg-[var(--color-disabled)]",
      "disabled:text-[var(--color-disabledText)]",
    ].join(" ");
  }

  if (type === "outline") {
    return [
      "px-4 py-1.5 border bg-transparent",
      variantClasses.outlineColor,
      variantClasses.outlineHoverBg,
      variantClasses.outlineHoverFg,
      "disabled:border-[var(--color-border)]",
      "disabled:text-[var(--color-disabledText)]",
    ].join(" ");
  }

  return [
    "px-0 py-0 bg-transparent",
    variantClasses.linkColor,
    "enabled:hover:underline enabled:hover:decoration-2 enabled:hover:underline-offset-4",
    variantClasses.linkHoverColor,
    "disabled:text-[var(--color-disabledText)]",
  ].join(" ");
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
  const typeClassName = getButtonTypeClasses(type, variant);
  const labelColor = resolveButtonLabelColor(type, variant, Boolean(disabled || loading));

  const rootClassName = [
    "inline-flex flex-row cursor-pointer items-center justify-center rounded-none text-sm font-medium transition-colors duration-150",
    fluid ? "w-full" : "w-auto",
    type === "link" ? "focus-visible:outline-none" : "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-borderStrong)]",
    "disabled:cursor-not-allowed",
    typeClassName,
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
            className="mr-2"
          />
        ) : null}
        {normalizeButtonChildren(children, labelColor)}
      </>
    </Pressable>
  );
}
