// __DEV__ is a global expected by react-native and nativewind packages.
// Next.js webpack DefinePlugin replaces it in bundled client code, but
// Server Components run in raw Node.js before that substitution applies.
// This module must be the very first import in layout.tsx so it runs
// before any @midbyur/ui or react-native imports on the server.
(globalThis as unknown as Record<string, unknown>).__DEV__ =
  process.env.NODE_ENV !== "production";
