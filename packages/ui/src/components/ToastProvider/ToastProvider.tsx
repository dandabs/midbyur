"use client";

import { type ReactNode } from "react";
import { Platform } from "react-native";
import type { GapSize } from "../../spacing";
import { ToasterWrapper } from "./ToasterWrapper";

export type ToastProviderProps = Readonly<{
  children: ReactNode;
  config?: {
    position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
    theme?: "light" | "dark" | "system";
    richColors?: boolean;
    expand?: boolean;
    visibleToasts?: number;
    hotkey?: string[];
    dir?: "rtl" | "ltr";
    containerAriaLabel?: string;
    offset?: string | number;
    gap?: GapSize | number;
    closeButton?: boolean;
    cn?: (...args: unknown[]) => string;
  };
}>;

export function ToastProvider({ children, config }: ToastProviderProps) {
  if (Platform.OS !== "web") {
    return <>{children}</>;
  }

  return (
    <>
      <ToasterWrapper config={config} />
      {children}
    </>
  );
}
