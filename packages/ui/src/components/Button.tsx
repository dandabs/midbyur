"use client";

import {
  Button as GSButton,
  ButtonText,
} from "@gluestack-ui/themed";

type ButtonProps = Readonly<{
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}>;

export function Button({
  children,
  variant = "primary",
}: ButtonProps) {

  return (
    <GSButton
      backgroundColor={variant === "primary" ? "$primary500" : "$background"}
      borderRadius="$lg"
    >
      <ButtonText>
        {children}
      </ButtonText>
    </GSButton>
  );
}
