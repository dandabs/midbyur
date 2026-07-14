"use client";

import { Toaster } from "sonner";
import type { ToastProviderProps } from "./ToastProvider";
import { resolveGapNumber } from "../../spacing";

type CustomWebToasterProps = Pick<ToastProviderProps, "config">;

export function CustomWebToaster({ config }: CustomWebToasterProps) {
  if (typeof document === "undefined") {
    return null;
  }

  return (
    <>
      <style>
        {`
          [data-sonner-toast][data-styled="true"] [data-title] {
            font-family: "Stack Sans Text", ui-sans-serif, system-ui, sans-serif;
          }

          [data-sonner-toast][data-styled="true"] [data-description] {
            font-family: "Stack Sans Text", ui-sans-serif, system-ui, sans-serif;
          }

          [data-sonner-toast][data-styled="true"] [data-close-button] {
            top: 0.5rem !important;
            transform: none !important;
            padding: 0.375rem !important;
          }

          [data-sonner-toast][data-styled="true"][data-x-position="right"] [data-close-button] {
            right: 0.5rem !important;
            left: auto !important;
          }

          [data-sonner-toast][data-styled="true"][data-x-position="left"] [data-close-button] {
            left: 0.5rem !important;
            right: auto !important;
          }
        `}
      </style>
      <Toaster
        position={config?.position ?? "bottom-right"}
        theme={config?.theme ?? "system"}
        richColors={config?.richColors ?? true}
        expand={config?.expand}
        visibleToasts={config?.visibleToasts ?? 4}
        hotkey={config?.hotkey}
        dir={config?.dir}
        containerAriaLabel={config?.containerAriaLabel}
        offset={config?.offset}
        gap={resolveGapNumber(config?.gap) ?? 12}
        closeButton={config?.closeButton ?? true}
        toastOptions={{
          classNames: {
            toast:
              "rounded-none border-0 bg-(--color-surface) text-(--color-text) shadow-[0_14px_36px_rgba(0,0,0,0.24)]",
            title: "text-(--color-text) text-base font-light leading-relaxed",
            description: "text-(--color-textMuted) text-sm font-light leading-relaxed",
            actionButton:
              "rounded-none border-0 bg-(--color-primary) text-(--color-primaryForeground) text-sm font-medium",
            cancelButton:
              "rounded-none border-0 bg-(--color-secondary) text-(--color-secondaryForeground) text-sm font-medium",
            closeButton:
              "h-7 w-7 rounded-none border-0 bg-transparent p-1.5 text-(--color-textMuted)",
          },
        }}
      />
    </>
  );
}