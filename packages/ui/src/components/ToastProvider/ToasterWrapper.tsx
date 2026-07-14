"use client";

import type { ToastProviderProps } from "./ToastProvider";
import { CustomWebToaster } from "./CustomWebToaster";

export function ToasterWrapper({
  config,
}: Pick<ToastProviderProps, "config">) {
  if (typeof document === "undefined") {
    return null;
  }

  return <CustomWebToaster config={config} />;
}
