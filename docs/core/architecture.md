# Architecture Notes

This document explains how `@lorewave/core` is assembled.

## Core building block: coreCompute

Implemented in `packages/core/src/utils/compute/core.ts`.

`coreCompute` composes each component from:

- slot class names
- style props converted to inline style
- component-level CSS variables (`vars`)
- data attributes (`mods`)
- filtered native HTML attributes

It returns slot prop maps used by each render function.

## Slot model

Every component defines slot names and maps CSS modules to slots.

Examples:

- `Button`: `root`, `loader`, `inner`, `section`, `label`
- `TextInput`: `root`, `label`, `wrapper`, `input`, `leftSection`, `rightSection`, `description`, `error`
- `Grid.Col`: `col`

Slot overrides are exposed through:

- `classNames?: Partial<Record<Slot, string>>`
- `styles?: Partial<Record<Slot, CSSProperties>>`

## Native prop filtering

Allowed native keys are listed in `packages/core/src/utils/compute/html_attr_keys.ts`.

Design choice:

- forward only approved HTML/ARIA/event props
- always forward `data-*`
- avoid blindly passing every unknown prop to DOM

Input components can exclude selected native keys with `omitHTMLProps`.

## Style layer

Shared style props are converted in `packages/core/src/utils/compute/core-style.ts`.

Helpers used by components:

- `getColor`
- `getColorVariant`
- `getSize`
- `getSpacing`
- `getRadius`
- `getFontSize`
- `getLineHeight`
- `getShadow`

## Composition patterns

Several components expose attached subcomponents through `Object.assign`:

- `Button.Group`
- `ActionIcon.Group`
- `Grid.Col`

This keeps API discoverable while reusing independent component implementations.

## Input API decision

`TextInput` and `NumberInput` use value-first change handlers.

- `TextInput`: `onChange(value: string, event)`
- `NumberInput`: `onChange(value: number, event)`

Why:

- direct compatibility with React state setters
- simpler controlled usage in applications

## Documentation automation

Generated API docs are built by:

- `packages/core/scripts/generate-api-docs.mjs`

Output:

- `docs/core/api.md`

The generator parses component source interfaces and `defaultProps` definitions.
