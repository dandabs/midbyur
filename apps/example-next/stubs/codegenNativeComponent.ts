import type { ComponentType } from "react";

// Native codegen is unavailable in Next.js web builds.
// This keeps react-native-safe-area-context imports resolvable.
export default function codegenNativeComponent(_name: string): ComponentType {
  return () => null;
}
