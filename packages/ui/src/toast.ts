import { Alert } from "react-native";

export type ToastPreset = "done" | "error" | "none";
export type AlertPreset = "done" | "error" | "heart" | "none";
export type HapticFeedback = "success" | "warning" | "error" | "none";
export type ToastPosition = "top" | "bottom";

export interface ToastOptions {
  title: string;
  message?: string;
  preset?: ToastPreset;
  duration?: number;
  haptic?: HapticFeedback;
  shouldDismissByDrag?: boolean;
  from?: ToastPosition;
}

export interface AlertOptions {
  title: string;
  message?: string;
  preset?: AlertPreset;
  duration?: number;
}

function isWebRuntime(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

type NativeBurntModule = {
  toast: (options: {
    title: string;
    message?: string;
    preset?: ToastPreset;
    duration?: number;
    haptic?: HapticFeedback;
    shouldDismissByDrag?: boolean;
    from?: ToastPosition;
  }) => Promise<void>;
  alert: (options: {
    title: string;
    message?: string;
    preset?: AlertPreset;
    duration?: number;
  }) => Promise<void>;
  dismissAllAlerts: () => void;
};

type SonnerToastApi = {
  (message: string, data?: { description?: string; duration?: number; icon?: string }): string | number;
  success: (message: string, data?: { description?: string; duration?: number }) => string | number;
  error: (message: string, data?: { description?: string; duration?: number }) => string | number;
  dismiss: (id?: number | string) => string | number;
};

type SonnerModule = {
  toast?: SonnerToastApi;
  default?: {
    toast?: SonnerToastApi;
  };
};

async function getNativeBurntModule(): Promise<NativeBurntModule> {
  const moduleId = "burnt";
  const burnt = await import(/* @vite-ignore */ moduleId);
  return burnt as NativeBurntModule;
}

async function runWithNativeBurnt<T>(fn: (burnt: NativeBurntModule) => Promise<T>): Promise<T | undefined> {
  try {
    const burnt = await getNativeBurntModule();
    return await fn(burnt);
  } catch {
    return undefined;
  }
}

async function getWebSonnerToast(): Promise<SonnerToastApi | null> {
  try {
    const sonner = await import("sonner") as SonnerModule;
    return sonner.toast ?? sonner.default?.toast ?? null;
  } catch {
    return null;
  }
}

async function showWebToast(options: ToastOptions): Promise<void> {
  const toast = await getWebSonnerToast();
  if (!toast) {
    return;
  }

  const payload = {
    description: options.message,
    duration: (options.duration ?? 2) * 1000,
  };

  if (options.preset === "done") {
    toast.success(options.title, payload);
    return;
  }

  if (options.preset === "error") {
    toast.error(options.title, payload);
    return;
  }

  toast(options.title, payload);
}

async function showWebAlert(options: AlertOptions): Promise<void> {
  const toast = await getWebSonnerToast();
  if (!toast) {
    return;
  }

  const payload = {
    description: options.message,
    duration: (options.duration ?? 2) * 1000,
  };

  if (options.preset === "done") {
    toast.success(options.title, payload);
    return;
  }

  if (options.preset === "error") {
    toast.error(options.title, payload);
    return;
  }

  if (options.preset === "heart") {
    toast(options.title, {
      ...payload,
      icon: "❤️",
    });
    return;
  }

  toast(options.title, payload);
}

/**
 * Show a toast notification
 */
export function showToast(options: ToastOptions): Promise<void> {
  if (isWebRuntime()) {
    return showWebToast(options);
  }

  return runWithNativeBurnt((burnt) =>
    burnt.toast({
      title: options.title,
      message: options.message,
      preset: options.preset ?? "none",
      duration: options.duration ?? 2,
      haptic: options.haptic ?? "none",
      shouldDismissByDrag: options.shouldDismissByDrag ?? true,
      from: options.from ?? "top",
    }),
  ).then(() => {
    return;
  });
}

/**
 * Show a success toast
 */
export function showSuccessToast(title: string, message?: string, duration = 2): Promise<void> {
  return showToast({
    title,
    message,
    preset: "done",
    duration,
    haptic: "success",
  });
}

/**
 * Show an error toast
 */
export function showErrorToast(title: string, message?: string, duration = 3): Promise<void> {
  return showToast({
    title,
    message,
    preset: "error",
    duration,
    haptic: "error",
  });
}

/**
 * Show a warning toast
 */
export function showWarningToast(title: string, message?: string, duration = 3): Promise<void> {
  return showToast({
    title,
    message,
    preset: "none",
    duration,
    haptic: "warning",
  });
}

/**
 * Show an info toast
 */
export function showInfoToast(title: string, message?: string, duration = 2): Promise<void> {
  return showToast({
    title,
    message,
    preset: "none",
    duration,
  });
}

/**
 * Show an alert notification
 * On Web: displays as a toast
 * On iOS: displays as a native alert popup
 * On Android: falls back to toast
 */
export function showAlert(options: AlertOptions): Promise<void> {
  if (isWebRuntime()) {
    return showWebAlert(options);
  }

  return runWithNativeBurnt((burnt) =>
    burnt.alert({
      title: options.title,
      message: options.message,
      preset: options.preset ?? "none",
      duration: options.duration ?? 2,
    }),
  ).then((result) => {
    if (result !== undefined) {
      return;
    }

    if (options.message) {
      Alert.alert(options.title, options.message);
      return;
    }

    Alert.alert(options.title);
  });
}

/**
 * Show a success alert
 */
export function showSuccessAlert(title: string, message?: string, duration = 2): Promise<void> {
  return showAlert({
    title,
    message,
    preset: "done",
    duration,
  });
}

/**
 * Show an error alert
 */
export function showErrorAlert(title: string, message?: string, duration = 3): Promise<void> {
  return showAlert({
    title,
    message,
    preset: "error",
    duration,
  });
}

/**
 * Show a heart alert (animated heart icon)
 */
export function showHeartAlert(title: string, message?: string, duration = 2): Promise<void> {
  return showAlert({
    title,
    message,
    preset: "heart",
    duration,
  });
}

/**
 * Dismiss all active toasts and alerts
 */
export function dismissAllToasts(): void {
  if (isWebRuntime()) {
    void getWebSonnerToast()
      .then((toast) => {
        toast?.dismiss();
      })
      .catch(() => {
        // ignore dismissal failures in non-browser contexts
      });
    return;
  }

  void getNativeBurntModule()
    .then((burnt) => {
      burnt.dismissAllAlerts();
    })
    .catch(() => {
      // ignore dismissal failures in unsupported runtimes
    });
}

// Export a compatibility wrapper for advanced usage.
export const Burnt = {
  toast: showToast,
  alert: showAlert,
  dismissAllAlerts: dismissAllToasts,
};
