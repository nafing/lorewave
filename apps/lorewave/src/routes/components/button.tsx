import { createFileRoute } from "@tanstack/react-router";
import { Badge, Button, Group, Paper, Stack, Text, Title } from "@lorewave/core";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";
import classes from "./demo.module.css";

export const Route = createFileRoute("/components/button")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack classNames={{ root: classes.page }} gap="md">
      <div className={classes.header}>
        <Badge size="xs" variant="light" color="warning" miw="fit-content">
          Actions
        </Badge>
        <Title order={2}>Button</Title>
        <Text size="sm" color="dimmed">
          Button wspiera warianty wizualne, sekcje ikon, loading i grouping.
        </Text>
      </div>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="sm">
          <Text fw={700}>Variants</Text>
          <div className={classes.preview}>
            <Group gap="xs" wrap="wrap">
              <Button variant="filled">Filled</Button>
              <Button variant="light">Light</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="subtle">Subtle</Button>
              <Button variant="tab" active>
                Tab active
              </Button>
            </Group>
          </div>
        </Stack>
      </Paper>

      <div className={classes.grid}>
        <Paper withBorder radius="md" classNames={{ root: classes.card }}>
          <Stack gap="sm">
            <Text fw={700}>Sections and loading</Text>
            <div className={classes.preview}>
              <Group gap="xs" wrap="wrap">
                <Button leftSection={<IconSparkles size={14} stroke={1.8} />}>
                  Generate
                </Button>
                <Button rightSection={<IconArrowRight size={14} stroke={1.8} />}>
                  Continue
                </Button>
                <Button loading>Processing</Button>
              </Group>
            </div>
          </Stack>
        </Paper>

        <Paper withBorder radius="md" classNames={{ root: classes.card }}>
          <Stack gap="sm">
            <Text fw={700}>Button.Group</Text>
            <div className={classes.preview}>
              <Button.Group>
                <Button variant="outline">Day</Button>
                <Button variant="filled">Week</Button>
                <Button variant="outline">Month</Button>
              </Button.Group>
            </div>
          </Stack>
        </Paper>
      </div>
    </Stack>
  );
}
