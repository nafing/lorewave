# @lorewave/core

Documentation:

- [Core Home](../../docs/core/README.md)
- [API Reference (Generated)](../../docs/core/api.md)
- [Style Props and Tokens](../../docs/core/style-props.md)
- [Testing Guide](../../docs/core/testing.md)
- [Architecture Notes](../../docs/core/architecture.md)

Quick usage:

```tsx
import "@lorewave/core/styles/main.css";
import { Button } from "@lorewave/core";

export function Example() {
  return <Button variant="filled">Hello</Button>;
}
```

Run tests:

```bash
pnpm -C packages/core test
```

Generate API docs from code:

```bash
pnpm -C packages/core docs:api
```
