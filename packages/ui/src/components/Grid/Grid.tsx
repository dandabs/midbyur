"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type GridProps = Readonly<{
  children?: ReactNode;
  cols?: number | string;
  gap?: number | string;
}> & Omit<HTMLAttributes<HTMLDivElement>, "children">;

function resolveSpacingValue(value: number | string): string {
  return typeof value === "number" ? `${value}px` : value;
}

function resolveColumnsValue(cols: number | string): string {
  if (typeof cols === "number") {
    return `repeat(${cols}, minmax(0, 1fr))`;
  }

  return cols;
}

export function Grid({
  children,
  cols = 3,
  gap = 24,
  className,
  style,
  ...props
}: GridProps) {
  const rootClassName = ["grid w-full", className].filter(Boolean).join(" ");

  const rootStyle: CSSProperties = {
    gridTemplateColumns: resolveColumnsValue(cols),
    gap: resolveSpacingValue(gap),
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
