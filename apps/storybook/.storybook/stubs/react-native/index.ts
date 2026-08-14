// Web/Storybook stub for the bare `react-native` import (aliased here instead
// of directly to `react-native-web`, since `react-native-web` does not export
// `TurboModuleRegistry`). Libraries like `react-native-svg` import
// `TurboModuleRegistry` from `react-native` for native TurboModule specs
// (e.g. `fabric/NativeSvgViewModule`, `fabric/NativeSvgRenderableModule`).
// Those specs are only reached through lazy, on-demand helper methods
// (`Svg#toDataURL`, `Shape#getBBox`/`getCTM`/etc.) that aren't meaningful on
// web, so a single inert stub object is enough to satisfy every TurboModule
// spec's method surface without crashing at import/eval time.
import * as ReactNativeWeb from "react-native-web";

export * from "react-native-web";

const inertNativeModule = {
  toDataURL: () => undefined,
  getBBox: () => ({ x: 0, y: 0, width: 0, height: 0 }),
  getCTM: () => [1, 0, 0, 1, 0, 0],
  getScreenCTM: () => [1, 0, 0, 1, 0, 0],
  isPointInFill: () => false,
  isPointInStroke: () => false,
  getTotalLength: () => 0,
  getPointAtLength: () => ({ x: 0, y: 0 }),
};

export const TurboModuleRegistry = {
  get: () => inertNativeModule,
  getEnforcing: () => inertNativeModule,
};

// react-native-web has no default export of its own (only named exports), so
// `export { default } from "react-native-web"` fails to resolve at all. Provide
// our own default (the namespace object) in case anything default-imports `react-native`.
export default ReactNativeWeb;
