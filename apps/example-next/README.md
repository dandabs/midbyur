# Midbyur + Next.js Setup

Configuration reference for integrating `@midbyur/ui` in a Next.js App Router project with direct CSS import. No Tailwind setup is required.

## Run This Example

From the repo root:

```bash
pnpm install
pnpm --filter @midbyur/example-next dev
```

Open `http://localhost:3000`.

## Start A New Next.js App

```bash
pnpm create next-app@latest my-app
cd my-app
pnpm add @midbyur/ui @midbyur/theme next react react-dom react-native react-native-web
pnpm add -D webpack @babel/plugin-transform-flow-strip-types babel-loader typescript @types/react @types/react-dom @types/node
```

## Required Configuration

### 1. Global Stylesheet

Create `app/globals.css`:

```css
@import "../packages/ui/src/components/styles.css";
```

If you are consuming a published package, change the import to your distributed UI stylesheet path.

### 2. Next.js Config

Create or update `next.config.ts`:

```ts
import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@midbyur/ui",
    "@expo/html-elements",
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

### 3. Server Polyfill For `__DEV__`

Create `app/polyfills.ts`:

```ts
(globalThis as unknown as Record<string, unknown>).__DEV__ =
  process.env.NODE_ENV !== "production";
```

Import it first in `app/layout.tsx`.

### 4. Root Layout

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

### 5. Client-Only Provider Boundary

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

### 6. First Page

```tsx
"use client";

import { Button } from "@midbyur/ui";

export default function Home() {
  return <Button>Hello Miðbýur</Button>;
}
```

## Scripts

```bash
pnpm --filter @midbyur/example-next dev
pnpm --filter @midbyur/example-next lint
pnpm --filter @midbyur/example-next build
```

## Troubleshooting

### Button renders unstyled

- Confirm `app/globals.css` imports the Midbyur stylesheet.
- Confirm `globals.css` is imported by `app/layout.tsx`.

### Hydration failed because server HTML did not match client

Do not render `MidbyurProvider` directly in the server layout. Keep it behind `ClientProviders`.
