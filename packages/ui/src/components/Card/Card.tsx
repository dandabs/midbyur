"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type CardProps = Readonly<{
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageHeight?: number | string;
}> & Omit<HTMLAttributes<HTMLDivElement>, "children">;

function resolveHeightValue(height: number | string): string {
  return typeof height === "number" ? `${height}px` : height;
}

export function Card({
  children,
  imageSrc,
  imageAlt = "",
  imageHeight = "48em",
  className,
  ...props
}: CardProps) {
  const rootClassName = ["w-full overflow-hidden bg-(--color-surface)", className]
    .filter(Boolean)
    .join(" ");

  const cardImageStyle: CSSProperties = {
    height: resolveHeightValue(imageHeight),
  };

  return (
    <div
      className={rootClassName}
      {...props}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="block w-full object-cover"
          style={cardImageStyle}
        />
      ) : null}

      <div className="px-6 py-6">{children}</div>
    </div>
  );
}
