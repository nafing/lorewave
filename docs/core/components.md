# Component Guides

This page highlights recently added components and practical edge cases.

## TextArea

Use `TextArea` for multi-line text input with validation, labels and sections.

```tsx
import { TextArea } from "@lorewave/core";

<TextArea
  label="Bio"
  placeholder="Tell us about yourself"
  description="This value is controlled in React state"
  value={bio}
  onChange={setBio}
  error={bio.trim().length < 30 ? "Bio should be at least 30 characters" : undefined}
  rows={4}
/>
```

Edge cases:

- `readonly` alias is supported (`readonly` and native `readOnly` both work).
- `leftSection` and `rightSection` are decorative in layout (non-interactive).
- `onChange` follows `(value, event)` contract for consistency with `TextInput`.

## NavLink

Use `NavLink` for vertical or side navigation rows with active and disabled states.

```tsx
import { NavLink } from "@lorewave/core";

<NavLink
  href="#billing"
  active={route === "billing"}
  description="Manage subscriptions and invoices"
  onClick={(event) => {
    event.preventDefault();
    setRoute("billing");
  }}
>
  Billing
</NavLink>
```

Edge cases:

- `active` sets `aria-current="page"`.
- `disabled` blocks click interaction and sets `aria-disabled`.
- Native anchor attributes (`href`, `target`, `rel`, etc.) are forwarded.

## Portal

`Portal` renders content outside the current React subtree.

```tsx
import { Portal } from "@lorewave/core";

<Portal id="shared-overlay-root" reuseTargetNode>
  <div>Layer content</div>
</Portal>
```

Options:

- `withinPortal={false}` renders children inline.
- `target` accepts `HTMLElement` or CSS selector string.
- `reuseTargetNode` + `id` allows multiple instances to share one container.

## Modal

`Modal` is a Portal-based overlay for blocking dialogs.

```tsx
import { Modal } from "@lorewave/core";

<Modal
  opened={opened}
  onOpenChange={setOpened}
  title="Project access"
  closeOnEscape
  closeOnClickOutside
  portalTarget="#overlay-root"
>
  <div>Dialog content</div>
</Modal>
```

Edge cases:

- Controlled usage: drive with `opened` + `onOpenChange`.
- Escape and outside-click closing can be toggled independently.
- `withinPortal` and `portalTarget` behave the same way as in other floating components.

## Shared Portal API For Floating Components

The following components expose the same portal props:

- `Tooltip`
- `Popover`
- `Menu`
- `ContextMenu`
- `Modal`

Shared props:

- `withinPortal?: boolean`
- `portalTarget?: HTMLElement | string`
- `portalReuseTargetNode?: boolean`
- `portalId?: string`

This keeps overlay routing consistent across floating UI primitives.