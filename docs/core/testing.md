# Testing Guide

`@lorewave/core` uses Vitest and Testing Library for regression coverage.

## Tooling

- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `jsdom`

Configured in:

- `packages/core/vite.config.ts`
- `packages/core/tests/setup.ts`

## Test locations

- `packages/core/tests/components/inputs-regression.test.tsx`
- `packages/core/tests/components/native-props-regression.test.tsx`
- `packages/core/tests/utils/get-size.test.ts`

## Covered regressions

## Inputs

- `TextInput` custom `onChange(value, event)` contract
- `NumberInput` custom `onChange(value, event)` contract
- `readonly` alias compatibility
- forwarding of native handlers like `onBlur`

## Native props consistency

- `Button` default `type="button"`
- forwarding of button native props (`type`, `name`, `form`)
- forwarding for `ActionIcon`
- forwarding for `Group`, `Button.Group`, `ActionIcon.Group`

## Utility behavior

- size and spacing conversion
- radius and shadow defaults
- border parsing and color token resolution

## Commands

Run tests:

```bash
pnpm -C packages/core test
```

Watch mode:

```bash
pnpm -C packages/core test:watch
```

Run lint for source and tests:

```bash
pnpm -C packages/core exec eslint src tests --ext .ts,.tsx
```

## Recommended CI order

```bash
pnpm -C packages/core docs:api
pnpm -C packages/core exec eslint src tests --ext .ts,.tsx
pnpm -C packages/core test
pnpm -C packages/core exec tsc -p tsconfig.app.json --noEmit
pnpm -C apps/demo run build
```
