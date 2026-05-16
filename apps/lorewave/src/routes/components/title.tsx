import { Badge, Paper, Stack, Text, Title } from "@lorewave/core";
import { createFileRoute } from "@tanstack/react-router";
import classes from "./demo.module.css";

export const Route = createFileRoute("/components/title")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack classNames={{ root: classes.page }} gap="md">
      <div className={classes.header}>
        <Badge size="xs" variant="light" color="warning" miw="fit-content">
          Typography
        </Badge>
        <Title order={2}>Title</Title>
        <Text size="sm" color="dimmed">
          Title renderuje semantyczne nagłówki h1-h6 i zachowuje spójną skalę
          typografii.
        </Text>
      </div>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="xs" classNames={{ root: classes.preview }}>
          <Title order={1}>Heading 1</Title>
          <Title order={2}>Heading 2</Title>
          <Title order={3}>Heading 3</Title>
          <Title order={4}>Heading 4</Title>
          <Title order={5}>Heading 5</Title>
          <Title order={6}>Heading 6</Title>
        </Stack>
      </Paper>
    </Stack>
  );
}
