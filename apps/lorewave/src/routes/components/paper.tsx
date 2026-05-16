import { Badge, Paper, Stack, Text, Title } from "@lorewave/core";
import { createFileRoute } from "@tanstack/react-router";
import classes from "./demo.module.css";

export const Route = createFileRoute("/components/paper")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack classNames={{ root: classes.page }} gap="md">
      <div className={classes.header}>
        <Badge size="xs" variant="light" color="secondary" miw="fit-content">
          Surfaces
        </Badge>
        <Title order={2}>Paper</Title>
        <Text size="sm" color="dimmed">
          Paper tworzy powierzchnie UI z opcjonalnym borderem, radius i shadow.
        </Text>
      </div>

      <div className={classes.grid}>
        <Paper withBorder radius="md" classNames={{ root: classes.card }}>
          <Stack gap="xs">
            <Text fw={700}>withBorder</Text>
            <Text size="sm" color="dimmed">
              Dobra baza pod panele, widgety i kontenery formularzy.
            </Text>
          </Stack>
        </Paper>

        <Paper withBorder radius="md" shadow="md" classNames={{ root: classes.card }}>
          <Stack gap="xs">
            <Text fw={700}>Shadow</Text>
            <Text size="sm" color="dimmed">
              Cień pomaga oddzielić sekcję od tła i wzmacnia hierarchię.
            </Text>
          </Stack>
        </Paper>
      </div>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="sm">
          <Text fw={700}>Nested paper</Text>
          <div className={classes.preview}>
            <Paper withBorder radius="sm" p="sm">
              <Text size="sm">Inner paper for highlighted sub-content.</Text>
            </Paper>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
}
