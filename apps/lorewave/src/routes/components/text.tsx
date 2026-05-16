import { createFileRoute } from "@tanstack/react-router";
import { Badge, Paper, Stack, Text, Title } from "@lorewave/core";
import classes from "./demo.module.css";

export const Route = createFileRoute("/components/text")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack classNames={{ root: classes.page }} gap="md">
      <div className={classes.header}>
        <Badge size="xs" variant="light" color="info" miw="fit-content">
          Typography
        </Badge>
        <Title order={2}>Text</Title>
        <Text size="sm" color="dimmed">
          Text służy do opisów, etykiet i akapitów z kontrolą rozmiaru oraz
          line-clamp.
        </Text>
      </div>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="xs">
          <Text fw={700}>Sizes</Text>
          <div className={classes.preview}>
            <Stack gap="xs">
              <Text size="xs">Text size xs</Text>
              <Text size="sm">Text size sm</Text>
              <Text size="md">Text size md</Text>
              <Text size="lg">Text size lg</Text>
            </Stack>
          </div>
        </Stack>
      </Paper>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="xs">
          <Text fw={700}>Line clamp</Text>
          <div className={classes.preview}>
            <Text lineClamp={2} color="dimmed">
              Lorewave helps building interfaces quickly with composable
              primitives. This text is intentionally long to present the
              clamping behavior and keep the card compact.
            </Text>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
}
