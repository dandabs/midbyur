"use client";

import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { Pressable, type PressableProps, type ViewStyle } from "react-native";
import { Text } from "../Text/Text";
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
  htmlType?: "button" | "submit" | "reset";
  className?: string;
}> & Omit<PressableProps, "children">;

function normalizeButtonChildren(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return (
        <Text
          variant="label"
          color="current"
        >
          {child}
        </Text>
      );
    }

    if (isValidElement(child) && child.type === Text) {
      const textChild = child as ReactElement<{ color?: "current" }>;

      return cloneElement(textChild, {
        ...textChild.props,
        color: "current",
      });
    }

    return child;
  });
}

const variantColorVariables: Readonly<
  Record<
    ButtonVariant,
    {
      "--button-bg": string;
      "--button-hover-bg": string;
      "--button-fg": string;
    }
  >
> = {
  primary: {
    "--button-bg": "var(--color-primary)",
    "--button-hover-bg": "var(--color-primaryHover)",
    "--button-fg": "var(--color-primaryForeground)",
  },
  secondary: {
    "--button-bg": "var(--color-secondary)",
    "--button-hover-bg": "var(--color-secondaryHover)",
    "--button-fg": "var(--color-secondaryForeground)",
  },
  success: {
    "--button-bg": "var(--color-success)",
    "--button-hover-bg": "var(--color-successHover)",
    "--button-fg": "var(--color-successForeground)",
  },
  danger: {
    "--button-bg": "var(--color-danger)",
    "--button-hover-bg": "var(--color-dangerHover)",
    "--button-fg": "var(--color-dangerForeground)",
  },
  warning: {
    "--button-bg": "var(--color-warning)",
    "--button-hover-bg": "var(--color-warningHover)",
    "--button-fg": "var(--color-warningForeground)",
  },
  info: {
    "--button-bg": "var(--color-info)",
    "--button-hover-bg": "var(--color-infoHover)",
    "--button-fg": "var(--color-infoForeground)",
  },
};

const buttonTypeClassNames: Readonly<Record<ButtonType, string>> = {
  solid:
    "px-4 py-1.5 bg-(--button-bg) text-(--button-fg) enabled:hover:bg-(--button-hover-bg) disabled:bg-(--color-disabled) disabled:text-(--color-disabledText)",
  outline:
    "px-4 py-1.5 border border-(--button-bg) bg-transparent text-(--button-bg) enabled:hover:bg-(--button-bg) enabled:hover:text-(--button-fg) disabled:border-(--color-border) disabled:text-(--color-disabledText)",
  link:
    "px-0 py-0 bg-transparent text-(--button-bg) enabled:hover:underline enabled:hover:decoration-2 enabled:hover:underline-offset-4 enabled:hover:text-(--button-hover-bg) disabled:text-(--color-disabledText)",
};

export function Button({
  children,
  variant = "primary",
  type = "solid",
  fluid = true,
  htmlType,
  className,
  style,
  ...props
}: ButtonProps) {
  const rootClassName = [
    "inline-flex cursor-pointer items-center justify-center rounded-none text-sm font-medium transition-colors duration-150",
    fluid ? "w-full" : "w-auto",
    type === "link" ? "focus-visible:outline-none" : "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-borderStrong)",
    "disabled:cursor-not-allowed",
    buttonTypeClassNames[type],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const buttonStyle = {
    ...variantColorVariables[variant],
    ...style,
  } as ViewStyle;

  return (
    <Pressable
      style={withClassName(rootClassName, buttonStyle) as ViewStyle}
      accessibilityRole="button"
      // htmlType is accepted for API compatibility but unused in RN primitives.
      {...props}
    >
      {normalizeButtonChildren(children)}
    </Pressable>
  );
}
