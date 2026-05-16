import { createFileRoute } from "@tanstack/react-router";
import { Badge, Box, Paper, Stack, Text, Title } from "@lorewave/core";
import classes from "./demo.module.css";

export const Route = createFileRoute("/components/stack")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack classNames={{ root: classes.page }} gap="md">
      <div className={classes.header}>
        <Badge size="xs" variant="light" color="success" miw="fit-content">
          Layout
        </Badge>
        <Title order={2}>Stack</Title>
        <Text size="sm" color="dimmed">
          Stack porządkuje elementy w pionie z kontrolą odstępów i wyrównania.
        </Text>
      </div>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="sm">
          <Text fw={700}>Default vertical stack</Text>
          <div className={classes.preview}>
            <Stack gap="sm">
              <Box p="sm" radius="sm" bg="body" bd="1px solid border">Step 1</Box>
              <Box p="sm" radius="sm" bg="body" bd="1px solid border">Step 2</Box>
              <Box p="sm" radius="sm" bg="body" bd="1px solid border">Step 3</Box>
            </Stack>
          </div>
        </Stack>
      </Paper>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="sm">
          <Text fw={700}>Custom alignment</Text>
          <div className={classes.preview}>
            <Stack gap="xs" align="center">
              <Box p="xs" radius="sm" bg="primary" color="white">Centered</Box>
              <Box p="xs" radius="sm" bg="secondary" color="white">Items</Box>
            </Stack>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
}
