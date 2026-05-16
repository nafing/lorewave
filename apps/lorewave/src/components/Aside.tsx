import { Box, NavLink, Stack, Text, Title } from "@lorewave/core";
import { Link } from "@tanstack/react-router";

const Aside = ({
  navItems,
}: {
  navItems: {
    label: string;
    description: string;
    href: string;
  }[];
}) => {
  return (
    <Box component="aside" px="md" pb="xs">
      <Stack gap="md">
        <div>
          <Text tt="uppercase" color="dimmed" size="xs">
            Workspace
          </Text>
          <Title order={4}>Components</Title>
        </div>

        <Stack gap="xs">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              component={Link}
              to={item.href}
              description={item.description}
            >
              {item.label}
            </NavLink>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Aside;
