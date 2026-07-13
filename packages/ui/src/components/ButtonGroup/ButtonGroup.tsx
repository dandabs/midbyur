"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type ButtonGroupDirection = "horizontal" | "vertical";

export type ButtonGroupProps = Readonly<{
  children?: ReactNode;
  direction?: ButtonGroupDirection;
  gap?: number | string;
}> & Omit<HTMLAttributes<HTMLDivElement>, "children">;

function resolveGapValue(gap: number | string): string {
  return typeof gap === "number" ? `${gap}px` : gap;
}

export function ButtonGroup({
  children,
  direction = "horizontal",
  gap = 12,
  className,
  style,
  ...props
}: ButtonGroupProps) {
  const rootClassName = [
    "flex w-full",
    direction === "horizontal" ? "flex-row items-center" : "flex-col",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const rootStyle: CSSProperties = {
    gap: resolveGapValue(gap),
    ...style,
  };

  return (
    <div
      className={rootClassName}
      style={rootStyle}
      {...props}
    >
      {children}
    </div>
  );
}
