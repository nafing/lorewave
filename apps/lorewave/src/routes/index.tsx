import { createFileRoute } from "@tanstack/react-router";
import { Box, Title } from "@lorewave/core";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box>
      <Title order={1}>Welcome to Lorewave</Title>
      <Title order={2} color="dimmed">
        Explore the library and its components using the sidebar on the left.
      </Title>
    </Box>
  );
}
