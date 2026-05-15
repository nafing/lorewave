import {
  ActionIcon,
  Box,
  Group,
  Button,
  TextInput,
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
import React from "react";

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
  const [inputValue, setInputValue] = React.useState("");

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

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>ActionIcon</Title>
          <Text fz="sm" fw={700}>
            ActionIcon supports all variants and sizes, as well as the new
            loading state.
          </Text>
          <Group>
            {SIZES.map((size) => (
              <ActionIcon key={size} size={size}>
                <IconStar />
              </ActionIcon>
            ))}
          </Group>

          <Group>
            {VARIANTS.map((variant) => (
              <ActionIcon key={variant} variant={variant}>
                <IconSettings />
              </ActionIcon>
            ))}
          </Group>

          <Group>
            {COLORS.map((color) => (
              <ActionIcon key={color} color={color}>
                <IconPlus />
              </ActionIcon>
            ))}

            <ActionIcon color="#ff69b4">
              <IconPlus />
            </ActionIcon>
          </Group>

          <ActionIcon.Group radius="xl">
            <ActionIcon>
              <IconArrowLeft />
            </ActionIcon>
            <ActionIcon disabled>
              <IconArrowLeft />
            </ActionIcon>
            <ActionIcon loading>
              <IconArrowLeft />
            </ActionIcon>
          </ActionIcon.Group>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>TextInput</Title>
          <Text fz="sm" fw={700}>
            TextInput supports all variants and sizes with proper styling.
          </Text>

          <Stack gap="md">
            {SIZES.map((size) => (
              <TextInput
                key={size}
                size={size}
                label={`${size} size`}
                placeholder={`${size} size input`}
              />
            ))}
          </Stack>

          <Stack gap="md" mt="md">
            <TextInput
              label="Email"
              placeholder="Enter your email"
              description="We'll never share your email"
              error="Invalid email address"
            />
            <TextInput
              label="Password"
              placeholder="Enter password"
              error="Password must be at least 8 characters"
            />
            <TextInput placeholder="Disabled input" disabled />
            <TextInput placeholder="Read-only input" readonly />
            <TextInput
              placeholder="With left section"
              leftSection={<IconStar size={16} />}
            />
            <TextInput
              placeholder="With right section"
              rightSection={<IconSettings size={16} />}
            />
            <TextInput
              label="With both sections"
              placeholder="Search..."
              leftSection={<IconStar size={16} />}
              rightSection={<IconArrowLeft size={16} />}
            />
          </Stack>
        </Stack>
      </Paper>

      <Group mt="xl">
        <Text size="sm">Standard Group nadal dziala do layoutu.</Text>
      </Group>
    </Box>
  );
};

export default App;
