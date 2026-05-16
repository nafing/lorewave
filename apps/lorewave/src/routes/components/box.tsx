import { Badge, Box, Code, Paper, Stack, Text, Title } from "@lorewave/core";
import { createFileRoute } from "@tanstack/react-router";
import classes from "./demo.module.css";

export const Route = createFileRoute("/components/box")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack classNames={{ root: classes.page }} gap="md">
      <div className={classes.header}>
        <Badge size="xs" variant="light" color="success" miw="fit-content">
          Layout Primitive
        </Badge>
        <Title order={2}>Box</Title>
        <Text size="sm" color="dimmed">
          Box to najbardziej uniwersalny kontener w core. Używaj go do szybkiego
          layoutu i stylowania przez style-props.
        </Text>
      </div>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="sm">
          <Text fw={700}>Basic usage</Text>
          <Box className={classes.preview}>
            <Box
              p="md"
              radius="md"
              bg="primary"
              color="white"
              fw={600}
              bd="1px solid primary"
            >
              This content is wrapped by Box with style props.
            </Box>
          </Box>
        </Stack>
      </Paper>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="sm">
          <Text fw={700}>Polymorphic</Text>
          <Box className={classes.preview}>
            <Box
              component="section"
              p="sm"
              radius="sm"
              bg="body"
              bd="1px solid border"
            >
              <Text fw={600}>Box rendered as section</Text>
              <Text size="sm" color="dimmed">
                Dzięki propowi component możesz zmienić element root bez utraty
                styl-props.
              </Text>
            </Box>
          </Box>
        </Stack>
      </Paper>

      <Code>
        {`import { Box, Text } from "@lorewave/core";

<Box p="md" radius="md" bg="primary" color="white">
  <Text>Reusable layout block</Text>
</Box>`}
      </Code>
    </Stack>
  );
}
