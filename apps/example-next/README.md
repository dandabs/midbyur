# Midbyur + Next.js Setup

This app is the working reference for using `@midbyur/ui` inside a Next.js App Router project.

It includes the extra pieces needed to make Midbyur styling and providers work correctly in Next:

- Tailwind v4 scanning both the app and the UI package.
- `react-native` aliased to `react-native-web`.
- NativeWind and related packages transpiled by Next.
- A server-side `__DEV__` polyfill for packages that expect it.
- A client-only provider boundary to avoid hydration mismatches from the web toaster.

## Run This Example

From the repo root:

```bash
pnpm install
pnpm --filter @midbyur/example-next dev
```

Open `http://localhost:3000`.

## Start A New Next.js App

Create a new app with the App Router enabled, then add the Midbyur dependencies.

```bash
pnpm create next-app@latest my-app
cd my-app
pnpm add @midbyur/ui @midbyur/theme next react react-dom react-native react-native-web
pnpm add -D tailwindcss @tailwindcss/postcss nativewind webpack @babel/plugin-transform-flow-strip-types babel-loader typescript @types/react @types/react-dom @types/node
```

If you are consuming `@midbyur/ui` from a monorepo workspace package, keep reading as-is. If you are consuming a published package, adjust the Tailwind `@source` path to wherever the distributed component files live.

## Required Configuration

### 1. PostCSS

Create `postcss.config.mjs`:

```js
const config = {
	plugins: {
		"@tailwindcss/postcss": {},
	},
};

export default config;
```

### 2. Tailwind CSS Entry

Create `app/globals.css`:

```css
@import "tailwindcss" important;
@source "./**/*.{js,ts,jsx,tsx,mdx}";
@source "../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}";
```

Notes:

- The `important` flag matters. Without it, the Midbyur button styles rendered but were later overwritten in the browser.
- The UI package must be included in `@source`, otherwise Tailwind will not emit the classes used by Midbyur components.
- Update the `@source` path to match your repository layout.

### 3. Next.js Config

Create or update `next.config.ts`:

```ts
import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@midbyur/ui",
		"@expo/html-elements",
		"nativewind",
		"react-native-css-interop",
		"burnt",
	],
	webpack: (config) => {
		config.plugins ??= [];
		config.plugins.push(
			new webpack.DefinePlugin({
				__DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
			}),
		);

		config.resolve ??= {};
		config.resolve.alias ??= {};
		config.resolve.alias["react-native"] = "react-native-web";

		return config;
	},
};

export default nextConfig;
```

Notes:

- `transpilePackages` is required because Midbyur depends on React Native and NativeWind packages that need to go through Next's compiler.
- The `react-native` alias is required for web.
- Defining `__DEV__` in webpack is not enough on its own for server rendering. The next step handles that.

### 4. Server Polyfill For `__DEV__`

Create `app/polyfills.ts`:

```ts
(globalThis as unknown as Record<string, unknown>).__DEV__ =
	process.env.NODE_ENV !== "production";
```

Import it first in `app/layout.tsx` before anything that might pull in `@midbyur/ui`, `react-native`, or NativeWind.

### 5. Root Layout

Create `app/layout.tsx`:

```tsx
import "./polyfills";
import "./globals.css";
import { ClientProviders } from "./client-providers";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ClientProviders>{children}</ClientProviders>
			</body>
		</html>
	);
}
```

The `suppressHydrationWarning` is intentional here because Midbyur's toaster layer is client-only.

### 6. Client-Only Provider Boundary

Do not use `ssr: false` directly inside `layout.tsx`, because `layout.tsx` is a Server Component. Put the dynamic import inside a Client Component.

Create `app/providers.tsx`:

```tsx
"use client";

import { MidbyurProvider } from "@midbyur/ui";

export function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <MidbyurProvider>{children}</MidbyurProvider>;
}
```

Create `app/client-providers.tsx`:

```tsx
"use client";

import dynamic from "next/dynamic";

const Providers = dynamic(() => import("./providers").then((mod) => mod.Providers), {
	ssr: false,
});

export function ClientProviders({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Providers>{children}</Providers>;
}
```

This is required because Midbyur currently includes a toaster wrapper that checks `document` and cannot render consistently on the server.

### 7. TypeScript

Make sure `tsconfig.json` includes NativeWind types:

```json
{
	"compilerOptions": {
		"types": ["nativewind/types"]
	}
}
```

### 8. First Component

If a page directly imports interactive Midbyur UI components, make that page a Client Component.

Create `app/page.tsx`:

```tsx
"use client";

import { Button } from "@midbyur/ui";

export default function Home() {
	return (
		<main>
			<Button>Hello Miðbýur</Button>
		</main>
	);
}
```

## Why Each Piece Exists

- Missing `@source` entries causes Tailwind classes from `@midbyur/ui` to never be generated.
- Missing `important` can make the button appear styled briefly and then lose its styles after hydration.
- Missing `react-native-web` alias breaks React Native-based imports on the web.
- Missing `transpilePackages` leaves required workspace dependencies uncompiled.
- Missing `__DEV__` server polyfill can crash or misbehave during server rendering.
- Rendering `MidbyurProvider` on the server causes hydration mismatches because of the toaster layer.

## Project Scripts

This example uses:

```bash
pnpm --filter @midbyur/example-next dev
pnpm --filter @midbyur/example-next lint
pnpm --filter @midbyur/example-next build
```

## Troubleshooting

### Button renders unstyled

Check all of the following:

- `app/globals.css` imports Tailwind with `important`.
- `app/globals.css` includes an `@source` entry for the UI package.
- `globals.css` is imported by `app/layout.tsx`.

### Styles flash and then disappear

This was caused here by omitting `important` from the Tailwind import. Use:

```css
@import "tailwindcss" important;
```

### Hydration failed because the server HTML did not match the client

Do not render `MidbyurProvider` directly in the server layout. Keep the provider behind the `ClientProviders` boundary shown above.
