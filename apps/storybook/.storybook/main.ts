import type { StorybookConfig } from '@storybook/nextjs-vite';

import { dirname } from "path"
import { mergeConfig, defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

import { fileURLToPath } from "url"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  "stories": [
    "../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)",
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
        },
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