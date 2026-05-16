import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@lorewave/core";
import { IconBrandGithub, IconSearch, IconSparkles } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <Box m="md">
      <Stack>
        <Group justify="space-between" wrap="wrap" gap="md">
          <Group gap="sm" wrap="nowrap" flex={2}>
            <Image src={logo} alt="Lorewave logo" w={42} />

            <Box>
              <Group>
                <Badge size="xs" variant="light" color="info">
                  v 1.0.0
                </Badge>
                <Text size="md" fw={700} color="dimmed">
                  Lorewave Library
                </Text>
              </Group>
              <Text size="xs">
                Library of components and hooks for building FiveM UI
              </Text>
            </Box>
          </Group>

          <Box flex={1}>
            <TextInput
              aria-label="Search"
              placeholder="Search stories, tags, arcs..."
              leftSection={<IconSearch size={15} stroke={1.8} />}
            />
          </Box>

          <Group flex={2} justify="end" gap="xs" wrap="nowrap">
            <Tooltip label="Github repository">
              <ActionIcon size="sm">
                <IconBrandGithub size={16} stroke={1.9} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Change log and updates">
              <ActionIcon size="sm">
                <IconSparkles size={16} stroke={1.9} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        <Group gap="xs" wrap="nowrap">
          <Button size="xs" variant="tab" component={Link} to="/">
            Get Started
          </Button>
          <Button size="xs" variant="tab" component={Link} to="/components">
            Components
          </Button>
          <Button size="xs" variant="tab" component={Link} to="/hooks">
            Hooks
          </Button>
        </Group>
      </Stack>
    </Box>
  );
};

export default Header;
