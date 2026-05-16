import { Badge, Code, Paper, Stack, Text, Title } from "@lorewave/core";
import { createFileRoute } from "@tanstack/react-router";
import classes from "./demo.module.css";

export const Route = createFileRoute("/components/code")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack classNames={{ root: classes.page }} gap="md">
      <div className={classes.header}>
        <Badge size="xs" variant="light" color="secondary" miw="fit-content">
          Typography
        </Badge>
        <Title order={2}>Code</Title>
        <Text size="sm" color="dimmed">
          Komponent do inline i block snippetów z monospace fontem i spójnym
          stylem Lorewave.
        </Text>
      </div>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="sm">
          <Text fw={700}>Inline code</Text>
          <div className={classes.preview}>
            <Text>
              Uruchom <Code>pnpm -C packages/core test</Code> aby sprawdzić
              regresje komponentów.
            </Text>
          </div>
        </Stack>
      </Paper>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="sm">
          <Text fw={700}>Block code</Text>
          <div className={classes.preview}>
            <Code block>
              {`import { Code } from "@lorewave/core";

<Code>npm run dev</Code>
<Code block>{"pnpm -C apps/lorewave build"}</Code>`}
            </Code>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
}
