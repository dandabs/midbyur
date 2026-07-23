# Miðbýur

Workspace for shared UI packages and example apps.

## Requirements

- Node.js 22+
- pnpm 10+

## Install

From repository root:

```bash
pnpm install
```

## Common Commands

Run from repository root.

- Start Expo dev client:

```bash
pnpm --filter @midbyur/example-expo start:dev-client
```

- Run Expo on iOS:

```bash
pnpm --filter @midbyur/example-expo ios:run
```

- Run Expo on Android:

```bash
pnpm --filter @midbyur/example-expo android:run
```

- Run Expo web:

```bash
pnpm --filter @midbyur/example-expo web
```

- Start Next example:

```bash
pnpm --filter @midbyur/example-next dev
```

- Start Storybook:

```bash
pnpm --filter @midbyur/storybook storybook
```

- Build Storybook:

```bash
pnpm --filter @midbyur/storybook build-storybook
```

- Typecheck Expo app:

```bash
pnpm --filter @midbyur/example-expo typecheck
```

## Workspace Layout

- apps/example-expo: Expo Router example app
- apps/example-next: Next.js example app
- apps/storybook: Storybook documentation and component catalog
- packages/ui: Shared UI components and styles
- packages/theme: Shared theme tokens

## Setup References

- Expo setup: apps/example-expo/README.md
- Storybook Expo guide: apps/storybook/src/stories/SetupWithExpo.mdx
- Next setup guide: apps/storybook/src/stories/SetupWithNextjs.mdx

## Notes

- Styling is based on shared CSS from packages/ui.
- Expo uses react-native-css-interop to consume shared stylesheet classes on native.
