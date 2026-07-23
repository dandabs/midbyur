# Miðbýur + Expo Setup

Configuration reference for using @midbyur/ui in Expo Router with direct stylesheet import. No NativeWind or Tailwind setup is required in the app.

## Run This Example

From the repo root:

```bash
pnpm install
pnpm --filter @midbyur/example-expo start:dev-client
```

Then run a native build:

```bash
pnpm --filter @midbyur/example-expo ios:run
pnpm --filter @midbyur/example-expo android:run
```

For web:

```bash
pnpm --filter @midbyur/example-expo web
```

## Required Packages

The Expo app needs:

- @midbyur/ui
- @midbyur/theme
- react-native-css-interop
- expo-router
- expo-dev-client
- expo-font
- expo-linking
- expo-constants
- @expo/metro-runtime
- @expo/log-box
- @expo/dom-webview
- burnt

## Required Configuration

### 1. Package Entry

package.json should use:

```json
{
  "main": "expo-router/entry"
}
```

Use scripts equivalent to:

```json
{
  "scripts": {
    "start": "expo start",
    "start:dev-client": "expo start --dev-client",
    "ios": "expo run:ios",
    "ios:run": "expo run:ios",
    "android": "expo run:android",
    "android:run": "expo run:android",
    "web": "expo start --web"
  }
}
```

### 2. Babel

babel.config.js:

```js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
  };
};
```

### 3. Expo Router Plugin

app.json should include:

```json
{
  "expo": {
    "plugins": ["expo-router"]
  }
}
```

### 4. Metro

metro.config.js:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withCssInterop } = require("react-native-css-interop/metro");
const path = require("node:path");

const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

const appNodeModulesPath = path.resolve(__dirname, "node_modules");
const workspaceNodeModulesPath = path.resolve(__dirname, "../../node_modules");

config.resolver = config.resolver || {};
config.resolver.nodeModulesPaths = [appNodeModulesPath, workspaceNodeModulesPath];

config.watchFolders = [path.resolve(__dirname, "../..")];

module.exports = withCssInterop(config, {
  inlineRem: 15,
});
```

### 5. Shared Stylesheet Import

Import the shared UI stylesheet directly in app/_layout.tsx:

```ts
import "../../../packages/ui/src/components/styles.css";
```

If you use App.tsx instead of Expo Router, import:

```ts
import "../../packages/ui/src/components/styles.css";
```

### 6. TypeScript CSS Declaration

nativewind-env.d.ts:

```ts
declare module "*.css";
```

Keep this file included in tsconfig.json.

### 7. Fonts

fonts.ts:

```ts
import type { FontSource } from "expo-font";

export const MIDBYUR_NATIVE_FONTS: Record<string, FontSource> = {
  "Stack Sans Text": require("./assets/fonts/StackSansText.ttf"),
  "Stack Sans Notch": require("./assets/fonts/StackSansNotch.ttf"),
  "Stack Sans Headline": require("./assets/fonts/StackSansHeadline.ttf"),
};
```

## Troubleshooting

### Native toasts do not show

Use a dev build instead of Expo Go:

```bash
pnpm --filter @midbyur/example-expo start:dev-client
pnpm --filter @midbyur/example-expo ios:run
```

### Styles are missing

- Confirm app/_layout.tsx imports ../../../packages/ui/src/components/styles.css directly.
- Confirm metro.config.js wraps config with withCssInterop.
- Clear Metro cache:

```bash
pnpm --filter @midbyur/example-expo start -- --clear
```

### Font updates are not visible

- Confirm mapped files in fonts.ts exist in assets/fonts.
- Restart Metro with --clear.
- Re-run ios:run or android:run.
