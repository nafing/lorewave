import { createFileRoute } from "@tanstack/react-router";
import { Badge, Button, Paper, Stack, Text, Title } from "@lorewave/core";
import { Link } from "@tanstack/react-router";
import classes from "./demo.module.css";

export const Route = createFileRoute("/components/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack classNames={{ root: classes.page }}>
      <div className={classes.header}>
        <Badge size="xs" variant="light" color="info" miw="fit-content">
          Lorewave Core
        </Badge>
        <Title order={2}>Components Library</Title>
        <Text color="dimmed" size="sm">
          Wybierz komponent z panelu po lewej. Każda podstrona zawiera działające
          demo, bazowe warianty i szybki snippet do użycia.
        </Text>
      </div>

      <Paper withBorder radius="md" classNames={{ root: classes.card }}>
        <Stack gap="xs">
          <Text fw={700}>Co znajdziesz w demach</Text>
          <Text size="sm" color="dimmed">
            Pokazujemy praktyczne użycie propsów, styl-props i stany komponentów
            bez boilerplate. Możesz kopiować sekcje 1:1 do projektu.
          </Text>
          <Button
            mt="xs"
            size="xs"
            variant="light"
            component={Link}
            to="/components/code"
            miw="fit-content"
          >
            Open Code demo
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
