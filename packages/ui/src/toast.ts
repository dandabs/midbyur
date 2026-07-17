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

async function showWebToast(options: ToastOptions): Promise<void> {
  const sonner = await import("sonner");
  const payload = {
    description: options.message,
    duration: (options.duration ?? 2) * 1000,
  };

  if (options.preset === "done") {
    sonner.toast.success(options.title, payload);
    return;
  }

  if (options.preset === "error") {
    sonner.toast.error(options.title, payload);
    return;
  }

  sonner.toast(options.title, payload);
}

async function showWebAlert(options: AlertOptions): Promise<void> {
  const sonner = await import("sonner");
  const payload = {
    description: options.message,
    duration: (options.duration ?? 2) * 1000,
  };

  if (options.preset === "done") {
    sonner.toast.success(options.title, payload);
    return;
  }

  if (options.preset === "error") {
    sonner.toast.error(options.title, payload);
    return;
  }

  if (options.preset === "heart") {
    sonner.toast(options.title, {
      ...payload,
      icon: "❤️",
    });
    return;
  }

  sonner.toast(options.title, payload);
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
      from: options.from ?? "bottom",
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
    void import("sonner")
      .then((sonner) => {
        sonner.toast.dismiss();
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
