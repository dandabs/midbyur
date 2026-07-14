"use client";

import { type ReactNode, lazy, Suspense } from "react";
import type { GapSize } from "../../spacing";

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

// Lazy load the Toaster component to avoid parsing JSX in build tools like Chromatic
const ToasterWrapper = lazy(() =>
  import("./ToasterWrapper").then((mod) => ({ default: mod.ToasterWrapper }))
);

export function ToastProvider({ children, config }: ToastProviderProps) {
  return (
    <>
      <Suspense fallback={null}>
        <ToasterWrapper config={config} />
      </Suspense>
      {children}
    </>
  );
}
