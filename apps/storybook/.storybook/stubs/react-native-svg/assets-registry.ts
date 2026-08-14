// Stub for `@react-native/assets-registry/registry`, pulled in transitively by
// react-native-svg's web `prepare.ts` -> `lib/resolveAssetUri.ts` (used only for
// resolving numeric React Native asset IDs on `<Image href={...} />` elements).
// This package isn't installed/linked in this monorepo's web apps, and our SVG
// usage (paths/shapes/text) never renders an `Image` element with a numeric
// asset ID, so a no-op `getAssetByID` is enough to satisfy the import.
export function getAssetByID(): undefined {
  return undefined;
}
