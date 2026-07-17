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
        alias: {
          "react-native": "react-native-web",
          "react-native-css-interop/dist/runtime/native/rem": `${runtimeStubsDir}/react-native-css-interop/rem.ts`,
          "react-native-css-interop/dist/runtime/native/variables": `${runtimeStubsDir}/react-native-css-interop/variables.ts`,
          "react-native-css-interop/dist/runtime/native/stylesheet": `${runtimeStubsDir}/react-native-css-interop/stylesheet.ts`,
        },
      },
      server: {
        sourcemapIgnoreList: (sourcePath) => sourcePath.includes("react-native-css-interop/dist/runtime/native/"),
      },
      optimizeDeps: {
        exclude: ["react-native", "nativewind", "react-native-css-interop", "burnt"],
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