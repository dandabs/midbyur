"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type SectionType = "default" | "image";

export type SectionProps = Readonly<{
  children?: ReactNode;
  type?: SectionType;
  imageUrl?: string;
  overlayOpacity?: number;
  height?: number | string;
}> & Omit<HTMLAttributes<HTMLElement>, "children">;

function resolveHeightValue(height: number | string): string {
  return typeof height === "number" ? `${height}px` : height;
}

function clampOpacity(value: number): number {
  if (value < 0) {
    return 0;
  }

  if (value > 1) {
    return 1;
  }

  return value;
}

export function Section({
  children,
  type = "default",
  imageUrl,
  overlayOpacity = 0.45,
  height,
  className,
  style,
  ...props
}: SectionProps) {
  const isImage = type === "image";
  const resolvedHeight = isImage ? (height ?? 400) : height;
  const hasFixedHeight = resolvedHeight !== undefined;

  const rootClassName = [
    "relative w-full py-24",
    hasFixedHeight ? "flex items-center" : "",
    isImage ? "overflow-hidden" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sectionStyle: CSSProperties = {
    ...(resolvedHeight ? { minHeight: resolveHeightValue(resolvedHeight) } : {}),
    ...style,
  };

  return (
    <section
      className={rootClassName}
      style={sectionStyle}
      {...props}
    >
      {isImage ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black"
            style={{ opacity: clampOpacity(overlayOpacity) }}
          />
          <div className="relative z-10 w-full text-white">{children}</div>
        </>
      ) : (
        children
      )}
    </section>
  );
}
