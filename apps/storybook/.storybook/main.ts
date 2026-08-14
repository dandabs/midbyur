import type { StorybookConfig } from '@storybook/nextjs-vite';

import { createRequire } from "node:module"
import { dirname } from "node:path"
import { mergeConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

import { fileURLToPath } from "node:url"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const runtimeStubsDir = fileURLToPath(new URL("./stubs", import.meta.url));

// `react-native-web` is not hoisted to apps/storybook/node_modules under pnpm's
// strict linking (it's only a resolvable dependency of packages/ui and the example
// apps), so a bare `react-native-web` specifier can't be resolved from files under
// `.storybook/stubs`. Resolve its absolute location from `packages/ui`, which does
// depend on it, and alias the bare specifier to that path below.
const reactNativeWebDir = dirname(
  createRequire(fileURLToPath(new URL("../../../packages/ui/package.json", import.meta.url))).resolve(
    "react-native-web/package.json",
  ),
);

// react-native-svg's plain entry point (`lib/module/index.js` -> `./ReactNativeSVG`)
// resolves to `ReactNativeSVG.js`, whose `Svg` element renders a native/Fabric view
// (`fabric/AndroidSvgViewNativeComponent` / `IOSSvgViewNativeComponent`, built via the
// `codegenNativeComponent` stub above, which returns `null`) — causing
// "Element type is invalid ... got: null" in the browser. The library ships a
// proper DOM-based implementation for exactly this purpose, but it's spread across
// two files: `ReactNativeSVG.web.js` (the "entry" file) and `elements.web.js` (the
// actual `Svg`/`G`/`Path`/etc. component classes). Aliasing only the entry file isn't
// enough: `ReactNativeSVG.web.js` re-exports from a *relative* `./elements` import,
// and Vite resolves bare/extensionless relative imports like that to `elements.js`
// (the native/Fabric version) by default — it doesn't automatically prefer
// `elements.web.js` the way Metro/webpack's platform-extension resolution would.
// `elements.web.js` itself has no such ambiguity (its own relative imports are under
// `./web/*`, which only exists as web code), so alias straight to that file instead,
// skipping the ambiguous entry-file indirection entirely.
const reactNativeSvgWebEntry = createRequire(
  fileURLToPath(new URL("../../../packages/ui/package.json", import.meta.url)),
).resolve("react-native-svg/lib/module/elements.web.js");

const config: StorybookConfig = {
  "stories": [
    "../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/stories/**/*.mdx",
  ],
  "addons": [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  "framework": getAbsolutePath('@storybook/nextjs-vite'),
  "staticDirs": [
    "../public"
  ],
  viteFinal: async (viteConfig) => {
    return mergeConfig(viteConfig, {
      plugins: [
        tailwindcss(),
      ],
      define: {
        __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
      },
      resolve: {
        alias: [
          // Alias only the bare react-native package. Keep deep imports available for targeted stubbing below.
          // Uses a local shim (not react-native-web directly) that re-exports react-native-web
          // plus a stubbed `TurboModuleRegistry`, since react-native-web doesn't export that
          // binding but libraries like react-native-svg import it from `react-native`.
          { find: /^react-native$/, replacement: `${runtimeStubsDir}/react-native/index.ts` },
          // Bare `react-native-web` specifier used by the stub above — see
          // `reactNativeWebDir` comment for why this can't resolve on its own.
          { find: /^react-native-web$/, replacement: reactNativeWebDir },
          // See `reactNativeSvgWebEntry` comment above.
          { find: /^react-native-svg$/, replacement: reactNativeSvgWebEntry },
          // react-native-svg's web code path (`web/utils/prepare.ts` -> `lib/resolveAssetUri.ts`,
          // used for resolving numeric asset IDs on `<Image>` elements) imports this native
          // asset-registry package, which isn't installed/linked in this monorepo's web apps.
          // Not needed for our path/shape/text-only SVG usage.
          {
            find: /^@react-native\/assets-registry\/registry$/,
            replacement: `${runtimeStubsDir}/react-native-svg/assets-registry.ts`,
          },
          // Chromatic/Storybook web builds should not traverse expo-router's native tab internals.
          // This stub keeps shared UI exports resolvable without pulling react-native-screens tab host files.
          { find: "expo-router/ui", replacement: `${runtimeStubsDir}/expo-router/ui.tsx` },
          // react-native-safe-area-context lib/module pulls this native-only path.
          // react-native-web has no equivalent, so stub it out for web builds.
          {
            find: /^react-native\/Libraries\/Utilities\/codegenNativeComponent(?:\.js)?$/,
            replacement: `${runtimeStubsDir}/react-native/codegenNativeComponent.ts`,
          },
          // Some builds resolve these files first and then traverse into native codegen.
          // Replace those resolved spec modules directly with inert web stubs.
          {
            find: /react-native-safe-area-context\/lib\/module\/specs\/NativeSafeAreaProvider(?:\.js)?(?:\?.*)?$/,
            replacement: `${runtimeStubsDir}/react-native-safe-area-context/specs/NativeSafeAreaProvider.ts`,
          },
          {
            find: /react-native-safe-area-context\/lib\/module\/specs\/NativeSafeAreaView(?:\.js)?(?:\?.*)?$/,
            replacement: `${runtimeStubsDir}/react-native-safe-area-context/specs/NativeSafeAreaView.ts`,
          },
          {
            find: "react-native-css-interop/dist/runtime/native/rem",
            replacement: `${runtimeStubsDir}/react-native-css-interop/rem.ts`,
          },
          {
            find: "react-native-css-interop/dist/runtime/native/variables",
            replacement: `${runtimeStubsDir}/react-native-css-interop/variables.ts`,
          },
          {
            find: "react-native-css-interop/dist/runtime/native/stylesheet",
            replacement: `${runtimeStubsDir}/react-native-css-interop/stylesheet.ts`,
          },
        ],
      },
      server: {
        sourcemapIgnoreList: (sourcePath) => sourcePath.includes("react-native-css-interop/dist/runtime/native/"),
      },
      optimizeDeps: {
        exclude: ["react-native", "nativewind", "react-native-css-interop", "react-native-safe-area-context", "burnt"],
      },
    });
  },
  webpackFinal: async (config) => {
    // Mark burnt as an external module to prevent parsing issues in Chromatic
    config.externals = {
      ...config.externals,
      "burnt/web": "burnt/web",
      burnt: "burnt",
    };
    return config;
  },
};
export default config;