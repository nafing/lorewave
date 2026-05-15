import {
  ActionIcon,
  Badge,
  Box,
  Group,
  Grid,
  Button,
  TextInput,
  NumberInput,
  Select,
  MultiSelect,
  Tooltip,
  Popover,
  Menu,
  Divider,
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

const SELECT_OPTIONS = [
  {
    value: "react",
    label: "React",
    description: "UI library focused on components",
    icon: <IconStar size={14} />,
  },
  {
    value: "vue",
    label: "Vue",
    description: "Progressive framework",
    icon: <IconSettings size={14} />,
  },
  {
    value: "svelte",
    label: "Svelte",
    description: "Compiler-based approach",
    icon: <IconPlus size={14} />,
  },
  {
    value: "solid",
    label: "Solid",
    description: "Fine-grained reactivity",
    icon: <IconArrowLeft size={14} />,
  },
  {
    value: "legacy",
    label: "Legacy option",
    description: "Hidden in dropdown",
    hidden: true,
  },
];

const SIMPLE_SELECT_OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
];

const App = () => {
  const [inputValue, setInputValue] = React.useState<string>(
    "nafingone@gmail.com",
  );
  const [amount, setAmount] = React.useState<number>(129);
  const [framework, setFramework] = React.useState<string>("");
  const [frameworks, setFrameworks] = React.useState<string[]>(["react"]);
  const [popoverOpened, setPopoverOpened] = React.useState(false);
  const [menuPinned, setMenuPinned] = React.useState(true);
  const [menuView, setMenuView] = React.useState<"list" | "grid">("list");

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
          <Title>Badge</Title>
          <Text fz="sm" fw={700}>
            Badge supports all sizes, variants, colors and section content.
          </Text>

          <Group>
            {SIZES.map((size) => (
              <Badge key={size} size={size}>
                {size} BADGE
              </Badge>
            ))}
          </Group>

          <Group>
            {VARIANTS.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant} BADGE
              </Badge>
            ))}
          </Group>

          <Group>
            {COLORS.map((color) => (
              <Badge key={color} color={color}>
                {color} BADGE
              </Badge>
            ))}

            <Badge color="#ff69b4">#ff69b4 BADGE</Badge>
          </Group>

          <Group wrap="nowrap">
            <Badge
              leftSection={<IconStar size={12} />}
              rightSection={<IconArrowLeft size={12} />}
            >
              With sections
            </Badge>

            <Badge variant="outline" maw={180}>
              Badge with longer content
            </Badge>

            <Badge fullWidth color="success" variant="filled">
              Full width
            </Badge>
          </Group>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>Tooltip</Title>
          <Text fz="sm" fw={700}>
            Tooltip supports hover/focus interactions, positions and multiline
            content.
          </Text>

          <Group>
            <Tooltip label="Simple tooltip">
              <Button variant="outline">Hover me</Button>
            </Tooltip>

            <Tooltip label="Tooltip on badge" position="right">
              <Badge color="info" variant="light">
                Info
              </Badge>
            </Tooltip>

            <Tooltip
              label="This is a longer tooltip content that can wrap into multiple lines when multiline mode is enabled."
              position="bottom"
              multiline
              maxWidth={220}
            >
              <ActionIcon variant="outline" aria-label="help">
                <IconSettings />
              </ActionIcon>
            </Tooltip>
          </Group>

          <Group>
            <Tooltip label="Top position" position="top">
              <Badge variant="outline">Top</Badge>
            </Tooltip>

            <Tooltip label="Right position" position="right">
              <Badge variant="outline">Right</Badge>
            </Tooltip>

            <Tooltip label="Bottom position" position="bottom">
              <Badge variant="outline">Bottom</Badge>
            </Tooltip>

            <Tooltip label="Left position" position="left">
              <Badge variant="outline">Left</Badge>
            </Tooltip>
          </Group>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>Popover</Title>
          <Text fz="sm" fw={700}>
            Popover supports click interactions, controlled mode and custom
            dropdown content.
          </Text>

          <Group>
            <Popover
              dropdown={
                <Stack gap="xs">
                  <Text fw={700}>Quick Actions</Text>
                  <Button size="xs" variant="light">
                    Create note
                  </Button>
                  <Button size="xs" variant="subtle">
                    Open settings
                  </Button>
                </Stack>
              }
            >
              <Button variant="outline">Open popover</Button>
            </Popover>

            <Popover
              position="right"
              width={220}
              dropdown={
                <Stack gap="xs">
                  <Text fw={700}>Framework</Text>
                  <Text size="sm" color="var(--lorewave-color-dimmed)">
                    React is currently selected in the demo state.
                  </Text>
                  <Badge variant="light" color="success">
                    Connected
                  </Badge>
                </Stack>
              }
            >
              <Badge variant="outline">Open side popover</Badge>
            </Popover>

            <Popover
              opened={popoverOpened}
              onOpenChange={setPopoverOpened}
              closeOnClickOutside
              dropdown={
                <Stack gap="xs">
                  <Text fw={700}>Controlled popover</Text>
                  <Text size="sm">
                    Open state is controlled from React state.
                  </Text>
                  <Button
                    size="xs"
                    onClick={() => {
                      setPopoverOpened(false);
                    }}
                  >
                    Close
                  </Button>
                </Stack>
              }
            >
              <ActionIcon
                aria-label="toggle controlled popover"
                variant="outline"
              >
                <IconSettings />
              </ActionIcon>
            </Popover>
          </Group>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>Menu</Title>
          <Text fz="sm" fw={700}>
            Menu supports nested actions with Menu.Item, Menu.Sub,
            Menu.Checkbox, Menu.Radio, Menu.Label and Menu.Divider.
          </Text>

          <Group>
            <Menu>
              <Menu.Target>
                <Button variant="outline">Open menu</Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>File</Menu.Label>
                <Menu.Item leftSection={<IconPlus size={14} />}>
                  Create file
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={14} />}>
                  Open settings
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Preferences</Menu.Label>

                <Menu.Sub
                  label="View mode"
                  leftSection={<IconStar size={14} />}
                >
                  <Menu.Radio
                    name="view-mode"
                    value="list"
                    checked={menuView === "list"}
                    onChange={() => {
                      setMenuView("list");
                    }}
                  >
                    List view
                  </Menu.Radio>
                  <Menu.Radio
                    name="view-mode"
                    value="grid"
                    checked={menuView === "grid"}
                    onChange={() => {
                      setMenuView("grid");
                    }}
                  >
                    Grid view
                  </Menu.Radio>
                </Menu.Sub>

                <Menu.Checkbox
                  checked={menuPinned}
                  onChange={(checked) => {
                    setMenuPinned(checked);
                  }}
                >
                  Pin to sidebar
                </Menu.Checkbox>
              </Menu.Dropdown>
            </Menu>

            <Text fz="sm" color="var(--lorewave-color-dimmed)">
              View: {menuView} | Pinned: {menuPinned ? "yes" : "no"}
            </Text>
          </Group>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>TextInput</Title>
          <Text fz="sm" fw={700}>
            TextInput supports all variants and sizes with proper styling.
          </Text>

          <Grid mt="md" cols={5} gutter="md">
            {SIZES.map((size) => (
              <Grid.Col key={size} span={1}>
                <TextInput
                  size={size}
                  label={`${size} size`}
                  placeholder={`${size} size input`}
                />
              </Grid.Col>
            ))}
          </Grid>

          <Grid mt="md" cols={5} gutter="md">
            <Grid.Col span={1}>
              <TextInput
                label="Email"
                placeholder="Enter your email"
                description="We'll never share your email"
                error={
                  inputValue && !inputValue.includes("@")
                    ? "Invalid email address"
                    : undefined
                }
                value={inputValue}
                onChange={setInputValue}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <TextInput
                label="Password"
                placeholder="Enter password"
                error="Password must be at least 8 characters"
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <TextInput placeholder="Disabled input" disabled />
            </Grid.Col>
            <Grid.Col span={1}>
              <TextInput placeholder="Read-only input" readonly />
            </Grid.Col>
            <Grid.Col span={1}>
              <TextInput
                placeholder="With left section"
                leftSection={<IconStar size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <TextInput
                placeholder="With right section"
                rightSection={<IconSettings size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <TextInput
                label="With both sections"
                placeholder="Search..."
                leftSection={<IconStar size={16} />}
                rightSection={<IconArrowLeft size={16} />}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>Divider</Title>
          <Text fz="sm" fw={700}>
            Divider supports horizontal and vertical orientation with optional
            labels.
          </Text>

          <Stack gap="md">
            <Text fz="sm">Section A content</Text>
            <Divider />
            <Text fz="sm">Section B content</Text>

            <Divider label="Centered label" />
            <Divider label="Label left" labelPosition="left" />
            <Divider label="Label right" labelPosition="right" />

            <Divider variant="solid" label="Solid" />
            <Divider variant="dashed" label="Dashed" />
            <Divider variant="dotted" label="Dotted" />

            <Group align="stretch" h={36} gap="md">
              <Text fz="sm">Left</Text>
              <Divider orientation="vertical" />
              <Text fz="sm">Right</Text>
            </Group>
          </Stack>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>NumberInput</Title>
          <Text fz="sm" fw={700}>
            NumberInput supports sizing, constraints and controlled values.
          </Text>

          <Grid mt="md" cols={5} gutter="md">
            {SIZES.map((size) => (
              <Grid.Col key={size} span={1}>
                <NumberInput
                  size={size}
                  label={`${size} size`}
                  placeholder={`${size} size number`}
                  min={0}
                  max={999}
                  step={1}
                />
              </Grid.Col>
            ))}
          </Grid>

          <Grid mt="md" cols={5} gutter="md">
            <Grid.Col span={1}>
              <NumberInput
                label="Amount"
                description="Allowed range: 0-500"
                placeholder="Enter amount"
                min={0}
                max={500}
                step={5}
                value={amount}
                onChange={setAmount}
                leftSection={<IconPlus size={16} />}
                rightSection={<Text size="sm">USD</Text>}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <NumberInput
                placeholder="Disabled number input"
                disabled
                value={15}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <NumberInput
                placeholder="Read-only number input"
                readonly
                value={42}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <NumberInput
                placeholder="With error"
                value={900}
                error="Value exceeds allowed range"
                rightSection={<IconSettings size={16} />}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>Select</Title>
          <Text fz="sm" fw={700}>
            Select supports all sizes, labels, validation state and controlled
            values.
          </Text>

          <Grid mt="md" cols={12} gutter="md">
            {SIZES.map((size) => (
              <Grid.Col key={size} span={2}>
                <Select
                  size={size}
                  label={`${size} size`}
                  placeholder={`Pick ${size} option`}
                  data={SIMPLE_SELECT_OPTIONS}
                />
              </Grid.Col>
            ))}
          </Grid>

          <Grid mt="md" cols={9} gutter="md">
            <Grid.Col span={3}>
              <Select
                label="Framework"
                description="Choose your frontend framework"
                placeholder="Select framework"
                searchable
                searchPlaceholder="Search framework"
                data={SELECT_OPTIONS}
                value={framework}
                onChange={setFramework}
                leftSection={<IconStar size={16} />}
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <Select
                label="Disabled select"
                placeholder="Cannot choose now"
                data={SELECT_OPTIONS}
                disabled
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <Select
                label="Validation"
                placeholder="Select required option"
                data={SELECT_OPTIONS}
                error={!framework ? "Please select a framework" : undefined}
                rightSection={<IconSettings size={16} />}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>MultiSelect</Title>
          <Text fz="sm" fw={700}>
            MultiSelect supports selecting many options, searchable filtering
            and validation state.
          </Text>

          <Grid mt="md" cols={12} gutter="md">
            {SIZES.map((size) => (
              <Grid.Col key={size} span={2}>
                <MultiSelect
                  size={size}
                  label={`${size} size`}
                  placeholder={`Pick ${size} options`}
                  data={SIMPLE_SELECT_OPTIONS}
                  defaultValue={["react"]}
                />
              </Grid.Col>
            ))}
          </Grid>

          <Grid mt="md" cols={9} gutter="md">
            <Grid.Col span={3}>
              <MultiSelect
                label="Frameworks"
                description="Choose one or more frontend frameworks"
                placeholder="Select frameworks"
                searchable
                searchPlaceholder="Search frameworks"
                data={SELECT_OPTIONS}
                value={frameworks}
                onChange={setFrameworks}
                leftSection={<IconStar size={16} />}
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <MultiSelect
                label="Disabled multi select"
                placeholder="Cannot choose now"
                data={SELECT_OPTIONS}
                value={["react", "vue"]}
                disabled
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <MultiSelect
                label="Validation"
                placeholder="Select at least one option"
                data={SELECT_OPTIONS}
                value={frameworks}
                onChange={setFrameworks}
                error={
                  frameworks.length === 0
                    ? "Please select at least one framework"
                    : undefined
                }
                rightSection={<IconSettings size={16} />}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>Grid</Title>
          <Text fz="sm" fw={700}>
            Grid and Grid.Col support responsive span, offset and order via
            breakpoints.
          </Text>

          <Grid cols={12} gutter="md">
            <Grid.Col span={12}>
              <Box
                p="md"
                bg="var(--lorewave-color-paper)"
                bd="1px solid var(--lorewave-color-border)"
                radius="sm"
              >
                <Text size="sm" fw={700}>
                  span=12
                </Text>
              </Box>
            </Grid.Col>

            <Grid.Col
              span={12}
              breakpoints={{
                sm: 6,
                lg: 4,
              }}
            >
              <Box
                p="md"
                bg="var(--lorewave-color-paper)"
                bd="1px solid var(--lorewave-color-border)"
                radius="sm"
              >
                <Text size="sm">12 / sm:6 / lg:4</Text>
              </Box>
            </Grid.Col>

            <Grid.Col
              span={12}
              breakpoints={{
                sm: 6,
                lg: 4,
              }}
            >
              <Box
                p="md"
                bg="var(--lorewave-color-paper)"
                bd="1px solid var(--lorewave-color-border)"
                radius="sm"
              >
                <Text size="sm">12 / sm:6 / lg:4</Text>
              </Box>
            </Grid.Col>

            <Grid.Col
              span={12}
              breakpoints={{
                sm: 12,
                lg: {
                  span: 3,
                  offset: 1,
                },
                xl: {
                  span: 2,
                  offset: 2,
                },
              }}
            >
              <Box
                p="md"
                bg="var(--lorewave-color-paper)"
                bd="1px solid var(--lorewave-color-border)"
                radius="sm"
              >
                <Text size="sm">offset on lg/xl</Text>
              </Box>
            </Grid.Col>

            <Grid.Col
              span={12}
              breakpoints={{
                xs: 6,
                md: {
                  span: 4,
                  order: -1,
                },
              }}
            >
              <Box
                p="md"
                bg="var(--lorewave-color-paper)"
                bd="1px solid var(--lorewave-color-border)"
                radius="sm"
              >
                <Text size="sm">xs:6, md:4 order:-1</Text>
              </Box>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      <Group mt="xl">
        <Text size="sm">Standard Group nadal dziala do layoutu.</Text>
      </Group>
    </Box>
  );
};

export default App;
