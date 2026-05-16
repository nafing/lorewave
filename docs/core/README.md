# @lorewave/core Documentation

This section is split into focused pages.

## Read first

- [API Reference (Generated)](./api.md)
- [Component Guides](./components.md)
- [Style Props and Tokens](./style-props.md)
- [Testing Guide](./testing.md)
- [Architecture Notes](./architecture.md)

## Docs workflow

Generate API tables directly from source code:

```bash
pnpm docs:api
```

Run from repository root or use package-scoped command:

```bash
pnpm -C packages/core docs:api
```

Check whether generated docs are up to date:

```bash
pnpm docs:api:check
```
