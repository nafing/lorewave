<!-- AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. -->
<!-- Run: pnpm -C packages/core docs:api -->

# Core API (Generated)

This page is generated from component source files in packages/core/src/components.

## Box

- Source: `packages/core/src/components/Box/Box.tsx`

| Prop | Type | Default |
| --- | --- | --- |
| `children?` | `React.ReactNode` | - |

## Paper

- Source: `packages/core/src/components/Paper/Paper.tsx`

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `React.ReactNode` | - |
| `shadow?` | `Token` | - |
| `withBorder?` | `boolean` | `false` |

## Group

- Source: `packages/core/src/components/Group/Group.tsx`
- Extends: `Omit<React.HTMLAttributes<HTMLDivElement>, "color">`

| Prop | Type | Default |
| --- | --- | --- |
| `gap?` | `FullToken` | `"sm"` |
| `align?` | `React.CSSProperties["alignItems"]` | `"center"` |
| `justify?` | `React.CSSProperties["justifyContent"]` | `"flex-start"` |
| `wrap?` | `React.CSSProperties["flexWrap"]` | `"wrap"` |
| `grow?` | `boolean` | `false` |

## Stack

- Source: `packages/core/src/components/Stack/Stack.tsx`

| Prop | Type | Default |
| --- | --- | --- |
| `children?` | `React.ReactNode` | - |
| `gap?` | `FullToken` | `"sm"` |
| `align?` | `React.CSSProperties["alignItems"]` | `"stretch"` |
| `justify?` | `React.CSSProperties["justifyContent"]` | `"flex-start"` |

## Grid

- Source: `packages/core/src/components/Grid/Grid.tsx`

| Prop | Type | Default |
| --- | --- | --- |
| `children?` | `React.ReactNode` | - |
| `cols?` | `number` | `12` |
| `gutter?` | `FullToken` | `"md"` |
| `gutterX?` | `FullToken` | - |
| `gutterY?` | `FullToken` | - |
| `align?` | `React.CSSProperties["alignItems"]` | `"stretch"` |
| `justify?` | `React.CSSProperties["justifyContent"]` | `"flex-start"` |

## Grid.Col

- Source: `packages/core/src/components/Grid/Grid.tsx`

| Prop | Type | Default |
| --- | --- | --- |
| `children?` | `React.ReactNode` | - |
| `span?` | `number` | - |
| `offset?` | `number` | - |
| `order?` | `React.CSSProperties["order"]` | - |
| `breakpoints?` | `GridColBreakpoints = Partial< Record<GridBreakpoint, number \| GridColBreakpointConfig> >` | - |

## Button

- Source: `packages/core/src/components/Button/Button.tsx`
- Extends: `Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">`

| Prop | Type | Default |
| --- | --- | --- |
| `children?` | `React.ReactNode` | - |
| `size?` | `Token` | `"sm"` |
| `variant?` | `Variant` | `"filled"` |
| `leftSection?` | `React.ReactNode` | - |
| `rightSection?` | `React.ReactNode` | - |
| `loading?` | `boolean` | - |
| `fullWidth?` | `boolean` | - |

## Button.Group

- Source: `packages/core/src/components/Button/ButtonGroup.tsx`
- Extends: `Omit<React.HTMLAttributes<HTMLDivElement>, "color">`

| Prop | Type | Default |
| --- | --- | --- |
| `radius?` | `FullToken` | - |

## ActionIcon

- Source: `packages/core/src/components/ActionIcon/ActionIcon.tsx`
- Extends: `Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">`

| Prop | Type | Default |
| --- | --- | --- |
| `children?` | `React.ReactNode` | - |
| `size?` | `Token` | `"sm"` |
| `variant?` | `Variant` | `"filled"` |
| `loading?` | `boolean` | - |

## ActionIcon.Group

- Source: `packages/core/src/components/ActionIcon/ActionIconGroup.tsx`
- Extends: `Omit<React.HTMLAttributes<HTMLDivElement>, "color">`

| Prop | Type | Default |
| --- | --- | --- |
| `radius?` | `FullToken` | - |

## TextInput

- Source: `packages/core/src/components/TextInput/TextInput.tsx`
- Extends: `Omit< React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value" | "defaultValue" >`
- Omit native HTML props: `onChange`

| Prop | Type | Default |
| --- | --- | --- |
| `placeholder?` | `string` | - |
| `disabled?` | `boolean` | - |
| `readonly?` | `boolean` | - |
| `size?` | `Token` | `"sm"` |
| `value?` | `string` | - |
| `defaultValue?` | `string` | - |
| `onChange?` | `TextInputOnChange = ( value: string, event: React.ChangeEvent<HTMLInputElement>, ) => void` | - |
| `error?` | `boolean \| string` | - |
| `label?` | `React.ReactNode` | - |
| `description?` | `React.ReactNode` | - |
| `leftSection?` | `React.ReactNode` | - |
| `rightSection?` | `React.ReactNode` | - |

## NumberInput

- Source: `packages/core/src/components/NumberInput/NumberInput.tsx`
- Extends: `Omit< React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange" | "value" | "defaultValue" >`
- Omit native HTML props: `onChange`

| Prop | Type | Default |
| --- | --- | --- |
| `readonly?` | `boolean` | - |
| `size?` | `Token` | `"sm"` |
| `value?` | `number` | - |
| `defaultValue?` | `number` | - |
| `onChange?` | `NumberInputOnChange = ( value: number, event: React.ChangeEvent<HTMLInputElement>, ) => void` | - |
| `error?` | `boolean \| string` | - |
| `label?` | `React.ReactNode` | - |
| `description?` | `React.ReactNode` | - |
| `leftSection?` | `React.ReactNode` | - |
| `rightSection?` | `React.ReactNode` | - |

## Text

- Source: `packages/core/src/components/Text/Text.tsx`

| Prop | Type | Default |
| --- | --- | --- |
| `children?` | `React.ReactNode` | - |
| `size?` | `Token` | `"md"` |
| `span?` | `boolean` | `false` |
| `inherit?` | `boolean` | `false` |
| `lineClamp?` | `number` | - |

## Title

- Source: `packages/core/src/components/Title/Title.tsx`

| Prop | Type | Default |
| --- | --- | --- |
| `children?` | `React.ReactNode` | - |
| `order?` | `TitleOrder = 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` |

## Notes

- This page documents explicit component prop interfaces from source files.
- Inherited native props (from React HTML attribute interfaces) are summarized via the Extends line.
- Additional style props come from CoreStyleProps via coreCompute and are documented in style-props.md.

