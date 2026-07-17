# Miðbýur + Expo Setup

Configuration reference for using @midbyur/ui in an Expo app.

## Required Native Packages

Install these in your Expo app:

```bash
pnpm add expo-dev-client expo-font burnt react-native-css-interop
```

Install `burnt` explicitly if you only want toast support:

```bash
npx expo install burnt
```

Notes:

- expo-dev-client is required for native modules used by the UI/toast stack.
- burnt provides native toast/alert presentation on iOS/Android.
- expo-font enables loading custom native font files.

## Run This Example

From the repository root:

```bash
pnpm install
pnpm --filter @midbyur/example-expo start:dev-client
```

Build and open native clients:

```bash
pnpm --filter @midbyur/example-expo ios:run
pnpm --filter @midbyur/example-expo android:run
```

Web:

```bash
pnpm --filter @midbyur/example-expo web
```

## Add Miðbýur To A New Or Existing Expo App

In this monorepo, use workspace dependencies:

```bash
pnpm add @midbyur/ui@workspace:* @midbyur/theme@workspace:* expo react react-dom react-native react-native-web
pnpm add expo-dev-client expo-font burnt react-native-css-interop
pnpm add -D babel-preset-expo nativewind@4.0.0-alpha.31 tailwindcss@^3.4.17 typescript @types/react
```

For a published library, replace workspace versions with published package versions.

### 1. Configure Babel

Create or update babel.config.js:

```js
module.exports = function (api) {
	api.cache(true);

	return {
		presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
	};
};
```

Do not add nativewind/babel in this setup.

### 2. Configure Metro

Create or update metro.config.js:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname, { isCSSEnabled: true });
config.watchFolders = [require("path").resolve(__dirname, "../..")];

module.exports = withNativeWind(config, {
	input: "./global.css",
});
```

Adjust watchFolders to the workspace root. Remove it when using a published package.

### 3. Add NativeWind CSS Entry And Content Sources

Create global.css:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Create tailwind.config.js:

```js
/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./src/**/*.{js,jsx,ts,tsx}",
		"../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
};
```

### 4. Add NativeWind Types

Create nativewind-env.d.ts:

```ts
/// <reference types="nativewind/types" />
```

Ensure tsconfig.json includes:

```json
{
	"compilerOptions": {
		"types": ["nativewind/types"]
	}
}
```

### 5. Configure Native Fonts

This example includes a font mapping file at ./fonts.ts.

1. Add .ttf files under ./assets/fonts.
2. Uncomment and adjust mappings in ./fonts.ts.
3. Restart Expo dev server with cache clear.

Example mapping:

```ts
export const MIDBYUR_NATIVE_FONTS = {
	"Stack Sans Text": require("./assets/fonts/StackSansText-Regular.ttf"),
	"Stack Sans Notch": require("./assets/fonts/StackSansNotch-Regular.ttf"),
	"Stack Sans Headline": require("./assets/fonts/StackSansHeadline-Medium.ttf"),
};
```

### 6. Use Components

```tsx
import "./global.css";
import { Button, Page, Text, showSuccessToast } from "@midbyur/ui";

export default function App() {
	return (
		<Page>
			<Text variant="h1">Hello Miðbýur</Text>
			<Button onPress={() => void showSuccessToast("Saved")}>Save</Button>
		</Page>
	);
}
```

## Troubleshooting

### Native toasts do not appear on iOS/Android

Use a development build instead of Expo Go:

```bash
pnpm --filter @midbyur/example-expo ios:run
pnpm --filter @midbyur/example-expo android:run
pnpm --filter @midbyur/example-expo start:dev-client
```

### Components have no utility styles

Confirm tailwind content includes ../../packages/ui/src/**/*.{js,jsx,ts,tsx}.

Then restart with a clean cache:

```bash
pnpm --filter @midbyur/example-expo start -- --clear
```

### Custom fonts are not applied on native

Verify all of the following:

- Font files exist under ./assets/fonts.
- Family names in ./fonts.ts match names referenced by UI typography.
- Metro cache was cleared after font map changes.
