import type { StorybookConfig } from '@storybook/nextjs-vite';

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
          { find: /^react-native$/, replacement: "react-native-web" },
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