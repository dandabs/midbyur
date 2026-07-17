# Storybook App

## Commands

From repo root:

```bash
pnpm --filter @midbyur/storybook storybook
pnpm --filter @midbyur/storybook build-storybook
pnpm --filter @midbyur/storybook lint
```

## Story Discovery

Configured in `.storybook/main.ts`:

- `../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)`
- `../src/stories/**/*.mdx`

## Sidebar Order

Configured in `.storybook/preview.tsx` with `parameters.options.storySort.order`:

- `Get started`
- `Configure your project`
- `Components`

## Documentation Pages

- `src/stories/Introduction.mdx`
- `src/stories/SetupWithNextjs.mdx`
- `src/stories/SetupWithExpo.mdx`
- `src/stories/Configure.mdx`
