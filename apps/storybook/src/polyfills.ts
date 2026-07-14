// __DEV__ is a global expected by react-native and nativewind packages.
// Must be imported before any @midbyur/ui / react-native imports.
(globalThis as unknown as Record<string, unknown>).__DEV__ =
  process.env.NODE_ENV !== "production";
