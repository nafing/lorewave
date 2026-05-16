import { createFileRoute } from "@tanstack/react-router";
import { Badge, Box, Group, Paper, Stack, Text, Title } from "@lorewave/core";
import classes from "./demo.module.css";

export const Route = createFileRoute("/components/group")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack classNames={{ root: classes.page }} gap="md">
      <div className={classes.header}>
        <Badge size="xs" variant="light" color="info" miw="fit-content">
          Layout
        </Badge>
        <Title order={2}>Group</Title>
        <Text size="sm" color="dimmed">
          Group ustawia elementy w rzędzie i kontroluje odstęp, wyrównanie,
          zawijanie oraz rozciąganie.
        </Text>
      </div>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="sm">
          <Text fw={700}>Justify and align</Text>
          <div className={classes.preview}>
            <Group justify="space-between" align="center" wrap="nowrap">
              <Box p="sm" bg="primary" color="white" radius="sm">
                Left
              </Box>
              <Box p="sm" bg="success" color="white" radius="sm">
                Center
              </Box>
              <Box p="sm" bg="warning" color="white" radius="sm">
                Right
              </Box>
            </Group>
          </div>
        </Stack>
      </Paper>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="sm">
          <Text fw={700}>Wrap and grow</Text>
          <div className={classes.preview}>
            <Group grow>
              <Box p="sm" bg="body" bd="1px solid border" radius="sm">
                Item 1
              </Box>
              <Box p="sm" bg="body" bd="1px solid border" radius="sm">
                Item 2
              </Box>
              <Box p="sm" bg="body" bd="1px solid border" radius="sm">
                Item 3
              </Box>
            </Group>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
}
