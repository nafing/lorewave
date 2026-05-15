# Style Props and Tokens

This page documents the shared styling model used by components built with `coreCompute`.

## Tokens

Defined in `packages/core/src/types/core.ts`.

- `Token`: `"xs" | "sm" | "md" | "lg" | "xl"`
- `FullToken`: token, numeric value, or string CSS value
- `Colors`: `primary | secondary | success | error | warning | info`
- `Variant`: `filled | light | outline | subtle | transparent | white`
- `FamilyToken`: `text | mono | monospace | heading | headings`

## CoreStyleProps groups

## Spacing

- Margin: `m mt mr mb ml ms me mis mie mx my`
- Padding: `p pt pr pb pl ps pe pis pie px py`

## Visual

- `radius`
- `bd`
- `bg`
- `bc`
- `color`

## Typography

- `ff`
- `fz`
- `fw`
- `lts`
- `ta`
- `lh`
- `fs`
- `tt`
- `td`

## Size and layout

- `w miw maw h mih mah`
- `pos top right bottom left inset`
- `display flex`
- `opacity cursor overflow`

## Conversion rules

Most conversions are handled by `packages/core/src/utils/compute/core-style.ts`.

- spacing props resolve through `getSpacing`
- `radius` resolves through `getRadius`
- `fz` resolves through `getFontSize`
- `lh` resolves through `getLineHeight`
- color-like props resolve through `getColor`

## Color resolution

Implemented in `packages/core/src/utils/get-color.ts`.

Behavior summary:

- token-like values become CSS variables (example: `primary` -> `var(--lorewave-color-primary)`)
- CSS literals are passed through (`#hex`, `rgb()`, `hsl()`, `color-mix()`, gradients)
- custom variable names prefixed with `--` become `var(--token)`

## Size resolution

Implemented in `packages/core/src/utils/get-size.ts` and `packages/core/src/utils/rem.ts`.

Behavior summary:

- numeric size values are converted to rem
- rem values are scaled with `var(--lorewave-scale)`
- token values become `var(--lorewave-...-token)` depending on helper prefix
- multi-value strings are supported in rem converter

## Notes

- Components can omit selected style props with `omitProps` in `coreCompute` options.
- Component-level CSS variables are merged with computed style props and slot overrides.
