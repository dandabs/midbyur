"use client";

import type { ToastProviderProps } from "./ToastProvider";
import { useEffect, useState } from "react";
import { resolveGapNumber } from "../../spacing";

// This component is in a separate file to allow lazy loading and avoid
// build-time parsing issues in Storybook/Chromatic.
export function ToasterWrapper({
  config,
}: Pick<ToastProviderProps, "config">) {
  const [Toaster, setToaster] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // Load the web toaster runtime-only to keep builds stable.
    (async () => {
      try {
        const sonner = await import("sonner");
        setToaster(() => sonner.Toaster);
      } catch (e) {
        // sonner might not be available in non-web environments
        console.warn("Toaster component not available", e);
      }
    })();
  }, []);

  if (!Toaster) {
    return null;
  }

  return (
    <Toaster
      position={config?.position ?? "bottom-right"}
      theme={config?.theme ?? "system"}
      richColors={config?.richColors}
      expand={config?.expand}
      visibleToasts={config?.visibleToasts}
      hotkey={config?.hotkey}
      dir={config?.dir}
      containerAriaLabel={config?.containerAriaLabel}
      offset={config?.offset}
      gap={resolveGapNumber(config?.gap)}
      closeButton={config?.closeButton}
      cn={config?.cn}
    />
  );
}
