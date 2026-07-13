"use client";

import type { CSSProperties, HTMLAttributes } from "react";
import { Text, type TextColor } from "../Text/Text";

export type NavigationItem = Readonly<{
  title: string;
  href: string;
  active?: boolean;
}>;

export type NavigationProps = Readonly<{
  items: NavigationItem[];
  color?: TextColor;
  gap?: number | string;
}> & Omit<HTMLAttributes<HTMLElement>, "children">;

function resolveGapValue(gap: number | string): string {
  return typeof gap === "number" ? `${gap}px` : gap;
}

export function Navigation({
  items,
  color = "text",
  gap = 16,
  className,
  style,
  ...props
}: NavigationProps) {
  const rootClassName = ["w-full", className].filter(Boolean).join(" ");

  const listStyle: CSSProperties = {
    gap: resolveGapValue(gap),
  };

  return (
    <nav
      className={rootClassName}
      style={style}
      {...props}
    >
      <ul
        className="flex w-full flex-row items-center"
        style={listStyle}
      >
        {items.map((item) => (
          <li key={`${item.href}-${item.title}`}>
            <a
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={[
                "inline-flex items-center justify-center rounded-none px-0 py-0 transition-colors duration-150",
                item.active
                  ? "underline decoration-2 underline-offset-4"
                  : "hover:underline hover:decoration-2 hover:underline-offset-4",
              ].join(" ")}
            >
              <Text
                as="span"
                variant="body"
                color={color}
                className="text-current"
              >
                {item.title}
              </Text>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
