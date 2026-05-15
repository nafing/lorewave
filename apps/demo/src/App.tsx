import {
  ActionIcon,
  Box,
  Group,
  Button,
  Text,
  Title,
  Paper,
  Stack,
} from "@lorewave/core";
import {
  IconArrowLeft,
  IconPlus,
  IconSettings,
  IconStar,
} from "@tabler/icons-react";
import type {
  Colors,
  Token,
  Variant,
} from "../../../packages/core/src/types/core";

const VARIANTS: Variant[] = [
  "filled",
  "light",
  "outline",
  "subtle",
  "transparent",
  "white",
];

const SIZES: Token[] = ["xs", "sm", "md", "lg", "xl"];

const COLORS: Colors[] = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "info",
];

const App = () => {
  return (
    <Box m="xl">
      <Title order={2} mb="md">
        Lorewave
      </Title>
      <Text mb="xl">Typography components are now available in core.</Text>

      <Paper p="xs">
        <Stack>
          <Title>Button</Title>
          <Text fz="sm" fw={700}>
            All button variants and sizes are supported, along with the new
            loading state.
          </Text>

          <Group>
            {SIZES.map((size) => (
              <Button key={size} size={size}>
                {size} SIZE
              </Button>
            ))}
          </Group>

          <Group>
            {VARIANTS.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant} VARIANT
              </Button>
            ))}
          </Group>

          <Group>
            {COLORS.map((color) => (
              <Button key={color} color={color}>
                {color} COLOR
              </Button>
            ))}

            <Button color="#ff69b4">#ff69b4 COLOR (pink)</Button>
          </Group>

          <Button.Group radius="xl">
            <Button leftSection={<IconArrowLeft />}>Hello World</Button>
            <Button disabled>Hello World</Button>
            <Button loading>Hello World</Button>
          </Button.Group>
        </Stack>
      </Paper>

      <Text mb="sm">ActionIcon</Text>
      <ActionIcon.Group radius="xl">
        <ActionIcon aria-label="Create item">
          <IconPlus />
        </ActionIcon>
        <ActionIcon
          variant="light"
          color="secondary"
          size="xs"
          aria-label="Open settings"
        >
          <IconSettings />
        </ActionIcon>
        <ActionIcon
          variant="outline"
          color="error"
          radius="xl"
          aria-label="Favorite"
        >
          <IconStar />
        </ActionIcon>
        <ActionIcon loading aria-label="Loading action">
          <IconPlus />
        </ActionIcon>
        <ActionIcon disabled aria-label="Disabled action">
          <IconSettings />
        </ActionIcon>
      </ActionIcon.Group>

      <Group mt="xl">
        <Text size="sm">Standard Group nadal dziala do layoutu.</Text>
      </Group>
    </Box>
  );
};

export default App;
