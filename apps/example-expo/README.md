# Miðbýur + Expo Setup

Configuration reference for running `@midbyur/ui` in Expo with NativeWind and native toasts/fonts.

## What Was Added From A Default Expo App

Dependencies:

- `expo-dev-client`
- `expo-font`
- `burnt`
- `react-native-css-interop`
- `nativewind`
- `tailwindcss`

Scripts:

- `start:dev-client`
- `ios:run`
- `android:run`

Config/files:

- `babel.config.js` with `jsxImportSource: "nativewind"`
- `metro.config.js` using `withNativeWind(...)`
- `tailwind.config.js` scanning app + `packages/ui/src`
- `global.css` (Tailwind entry)
- `nativewind-env.d.ts`
- `fonts.ts` + `assets/fonts/*.ttf`

## Required Install Commands

From repo root:

```bash
pnpm install
```

For this app (workspace):

```bash
pnpm --filter @midbyur/example-expo add expo-dev-client expo-font burnt react-native-css-interop
```

If you only need to add `burnt` in an Expo app:

```bash
npx expo install burnt
```

## Run This Example

1. Start Metro for dev client:

```bash
pnpm --filter @midbyur/example-expo start:dev-client
```

1. Build/run native app:

```bash
pnpm --filter @midbyur/example-expo ios:run
pnpm --filter @midbyur/example-expo android:run
```

Web:

```bash
pnpm --filter @midbyur/example-expo web
```

## Required Project Configuration

### `package.json` scripts

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

### `babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
  };
};
```

Important:

- Do not add `nativewind/babel` for this setup.

### `metro.config.js`

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

config.watchFolders = [require("path").resolve(__dirname, "../..")];

module.exports = withNativeWind(config, {
  input: "./global.css",
});
```

### `global.css`

```css
@tailwind components;
@tailwind utilities;
```

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
};
```

### `nativewind-env.d.ts` and `tsconfig.json`

`nativewind-env.d.ts`:

```ts
/// <reference types="nativewind/types" />
declare module "*.css";
```

`tsconfig.json` must include `nativewind-env.d.ts` and nativewind types.

### `fonts.ts` and assets

Current mapping in this app:

```ts
import type { FontSource } from "expo-font";

export const MIDBYUR_NATIVE_FONTS: Record<string, FontSource> = {
  "Stack Sans Text": require("./assets/fonts/StackSansText.ttf"),
  "Stack Sans Notch": require("./assets/fonts/StackSansNotch.ttf"),
  "Stack Sans Headline": require("./assets/fonts/StackSansHeadline.ttf"),
};
```

Current fonts folder includes both `.ttf` and `[wght].ttf` files. Use the plain `.ttf` names in mappings for Metro compatibility.

## Usage Notes

- Import `./global.css` in app entry.
- Wrap UI with `MidbyurProvider`.
- Native toasts (`burnt`) require a dev build; do not rely on Expo Go for this flow.

## Troubleshooting

### Native toasts do not show

Use dev-client flow:

```bash
pnpm --filter @midbyur/example-expo start:dev-client
pnpm --filter @midbyur/example-expo ios:run
```

### Styles missing on native/web

1. Verify `tailwind.config.js` content paths include `../../packages/ui/src/**/*.{js,jsx,ts,tsx}`.
2. Verify `metro.config.js` uses `withNativeWind` and `input: "./global.css"`.
3. Clear cache:

```bash
pnpm --filter @midbyur/example-expo start -- --clear
```

### Font changes not reflected

1. Confirm mapped file names in `fonts.ts` exist in `assets/fonts`.
2. Restart Metro with `--clear`.
3. Re-run native app (`ios:run`/`android:run`).
