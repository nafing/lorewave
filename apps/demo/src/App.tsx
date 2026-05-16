import {
  ActionIcon,
  Badge,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Box,
  Group,
  Grid,
  Button,
  TextInput,
  TextArea,
  NumberInput,
  Select,
  MultiSelect,
  NavLink,
  Tooltip,
  Popover,
  Portal,
  Modal,
  Menu,
  ContextMenu,
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
  const [bio, setBio] = React.useState<string>(
    "I design and build resilient UI primitives for product teams.",
  );
  const [amount, setAmount] = React.useState<number>(129);
  const [framework, setFramework] = React.useState<string>("");
  const [frameworks, setFrameworks] = React.useState<string[]>(["react"]);
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [productUpdates, setProductUpdates] = React.useState(true);
  const [autoSync, setAutoSync] = React.useState(true);
  const [usageAnalytics, setUsageAnalytics] = React.useState(false);
  const [volume, setVolume] = React.useState<number>(72);
  const [brightness, setBrightness] = React.useState<number>(38);
  const [portalOpened, setPortalOpened] = React.useState(false);
  const [modalOpened, setModalOpened] = React.useState(false);
  const [activeRoute, setActiveRoute] = React.useState<
    "overview" | "billing" | "activity"
  >("overview");
  const [notificationChannel, setNotificationChannel] = React.useState<
    "email" | "sms"
  >("email");
  const [popoverOpened, setPopoverOpened] = React.useState(false);
  const [menuPinned, setMenuPinned] = React.useState(true);
  const [menuView, setMenuView] = React.useState<"list" | "grid">("list");
  const [contextPinned, setContextPinned] = React.useState(false);
  const [contextView, setContextView] = React.useState<"list" | "grid">(
    "grid",
  );

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
          <Title>NavLink</Title>
          <Text fz="sm" fw={700}>
            NavLink supports active routes, sections, descriptions and disabled
            state.
          </Text>

          <Stack gap="xs" maw={360}>
            <NavLink
              href="#overview"
              active={activeRoute === "overview"}
              leftSection={<IconStar size={16} />}
              rightSection={<IconArrowLeft size={14} />}
              onClick={(event) => {
                event.preventDefault();
                setActiveRoute("overview");
              }}
            >
              Overview
            </NavLink>

            <NavLink
              href="#billing"
              active={activeRoute === "billing"}
              leftSection={<IconSettings size={16} />}
              description="Manage subscriptions, invoices and payment methods"
              rightSection={<Badge size="xs" variant="light">3</Badge>}
              onClick={(event) => {
                event.preventDefault();
                setActiveRoute("billing");
              }}
            >
              Billing
            </NavLink>

            <NavLink
              href="#activity"
              active={activeRoute === "activity"}
              leftSection={<IconPlus size={16} />}
              description="Latest events across the workspace"
              onClick={(event) => {
                event.preventDefault();
                setActiveRoute("activity");
              }}
            >
              Activity log
            </NavLink>

            <NavLink
              href="#disabled"
              disabled
              leftSection={<IconArrowLeft size={16} />}
              description="Unavailable in current plan"
            >
              Audit trail
            </NavLink>
          </Stack>
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
          <Title>Portal</Title>
          <Text fz="sm" fw={700}>
            Portal renders content at document level and supports inline mode.
          </Text>

          <Group>
            <Button
              onClick={() => {
                setPortalOpened(true);
              }}
            >
              Open portal layer
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setPortalOpened(false);
              }}
            >
              Close layer
            </Button>
          </Group>

          <Box
            p="sm"
            bd="1px dashed var(--lorewave-color-border)"
            radius="md"
          >
            <Portal withinPortal={false}>
              <Badge variant="light" color="info">
                This badge is rendered inline with withinPortal=false
              </Badge>
            </Portal>
          </Box>

          {portalOpened && (
            <Portal id="demo-portal-layer" reuseTargetNode>
              <Box
                pos="fixed"
                top={0}
                left={0}
                right={0}
                bottom={0}
                style={{
                  zIndex: 1200,
                  background:
                    "color-mix(in srgb, var(--lorewave-color-black) 38%, transparent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                }}
                onClick={() => {
                  setPortalOpened(false);
                }}
              >
                <Paper
                  p="md"
                  miw={260}
                  maw={420}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <Stack>
                    <Text fw={700}>Portal layer</Text>
                    <Text fz="sm" color="var(--lorewave-color-dimmed)">
                      This card is mounted outside the demo tree.
                    </Text>
                    <Button
                      size="xs"
                      onClick={() => {
                        setPortalOpened(false);
                      }}
                    >
                      Dismiss
                    </Button>
                  </Stack>
                </Paper>
              </Box>
            </Portal>
          )}
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>Modal</Title>
          <Text fz="sm" fw={700}>
            Modal supports focus trapping, close controls and portal targeting.
          </Text>

          <Group>
            <Button
              onClick={() => {
                setModalOpened(true);
              }}
            >
              Open modal
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setModalOpened(true);
              }}
            >
              Open in custom portal target
            </Button>
          </Group>

          <div id="demo-modal-target" />

          <Modal
            opened={modalOpened}
            onOpenChange={setModalOpened}
            title="Project access"
            portalTarget="#demo-modal-target"
            closeOnEscape
            closeOnClickOutside
          >
            <Stack>
              <Text fz="sm">
                Invite teammates to collaborate on this workspace.
              </Text>
              <TextInput placeholder="name@company.com" label="Email" />
              <Group justify="flex-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setModalOpened(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setModalOpened(false);
                  }}
                >
                  Send invite
                </Button>
              </Group>
            </Stack>
          </Modal>
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
                <Menu.Item
                  leftSection={<IconPlus size={14} />}
                  description="Create a new draft in current workspace"
                >
                  Create file
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconSettings size={14} />}
                  description="Open preferences and account configuration"
                >
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
                    description="Single column with detailed rows"
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
                    description="Two-column compact card view"
                    checked={menuView === "grid"}
                    onChange={() => {
                      setMenuView("grid");
                    }}
                  >
                    Grid view
                  </Menu.Radio>
                </Menu.Sub>

                <Menu.Checkbox
                  description="Keep this menu pinned in quick access"
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
          <Title>ContextMenu</Title>
          <Text fz="sm" fw={700}>
            ContextMenu uses the same item model as Menu, but opens on
            right-click over target content.
          </Text>

          <Group align="stretch">
            <ContextMenu>
              <ContextMenu.Target>
                <Paper
                  p="md"
                  bd="1px dashed var(--lorewave-color-border)"
                  miw={260}
                  cursor="context-menu"
                >
                  <Stack gap="xs">
                    <Text fw={700}>Right click this panel</Text>
                    <Text fz="sm" color="var(--lorewave-color-dimmed)">
                      Open contextual actions for view mode and quick pinning.
                    </Text>
                  </Stack>
                </Paper>
              </ContextMenu.Target>

              <ContextMenu.Dropdown>
                <ContextMenu.Label>Workspace</ContextMenu.Label>
                <ContextMenu.Item
                  leftSection={<IconPlus size={14} />}
                  description="Create a new draft from this location"
                >
                  New note
                </ContextMenu.Item>
                <ContextMenu.Item
                  leftSection={<IconSettings size={14} />}
                  description="Open workspace preferences"
                >
                  Open settings
                </ContextMenu.Item>

                <ContextMenu.Divider />

                <ContextMenu.Sub
                  label="View mode"
                  leftSection={<IconStar size={14} />}
                >
                  <ContextMenu.Radio
                    name="context-view"
                    value="list"
                    description="Single column with more details"
                    checked={contextView === "list"}
                    onChange={() => {
                      setContextView("list");
                    }}
                  >
                    List view
                  </ContextMenu.Radio>
                  <ContextMenu.Radio
                    name="context-view"
                    value="grid"
                    description="Compact two-column arrangement"
                    checked={contextView === "grid"}
                    onChange={() => {
                      setContextView("grid");
                    }}
                  >
                    Grid view
                  </ContextMenu.Radio>
                </ContextMenu.Sub>

                <ContextMenu.Checkbox
                  description="Keep this panel pinned in quick access"
                  checked={contextPinned}
                  onChange={(checked) => {
                    setContextPinned(checked);
                  }}
                >
                  Pin panel
                </ContextMenu.Checkbox>
              </ContextMenu.Dropdown>
            </ContextMenu>

            <Text fz="sm" color="var(--lorewave-color-dimmed)">
              Context view: {contextView} | Pinned: {contextPinned ? "yes" : "no"}
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
          <Title>Checkbox</Title>
          <Text fz="sm" fw={700}>
            Checkbox supports controlled and uncontrolled usage, labels,
            descriptions, readonly/disabled states and indeterminate mode.
          </Text>

          <Grid mt="md" cols={5} gutter="md">
            {SIZES.map((size) => (
              <Grid.Col key={size} span={1}>
                <Checkbox
                  size={size}
                  label={`${size} size checkbox`}
                  defaultChecked={size === "md"}
                />
              </Grid.Col>
            ))}
          </Grid>

          <Grid mt="md" cols={5} gutter="md">
            <Grid.Col span={1}>
              <Checkbox
                label="Accept terms"
                description="Required to continue"
                checked={acceptTerms}
                onChange={setAcceptTerms}
                error={!acceptTerms ? "Please accept terms" : undefined}
              />
            </Grid.Col>

            <Grid.Col span={1}>
              <Checkbox
                label="Product updates"
                checked={productUpdates}
                onChange={setProductUpdates}
              />
            </Grid.Col>

            <Grid.Col span={1}>
              <Checkbox
                label="Indeterminate example"
                description="Partially selected group"
                indeterminate
              />
            </Grid.Col>

            <Grid.Col span={1}>
              <Checkbox label="Disabled" disabled defaultChecked />
            </Grid.Col>

            <Grid.Col span={1}>
              <Checkbox label="Read-only" readonly defaultChecked />
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>TextArea</Title>
          <Text fz="sm" fw={700}>
            TextArea supports controlled values and validation states.
          </Text>

          <Grid mt="md" cols={5} gutter="md">
            <Grid.Col span={1}>
              <TextArea
                label="Bio"
                placeholder="Tell us about yourself"
                description="This value is controlled in React state"
                value={bio}
                onChange={setBio}
                error={
                  bio.trim().length < 30
                    ? "Bio should be at least 30 characters"
                    : undefined
                }
                rows={4}
              />
            </Grid.Col>

            <Grid.Col span={1}>
              <TextArea
                label="Feedback"
                placeholder="Share your thoughts"
                rows={4}
                leftSection={<IconStar size={16} />}
              />
            </Grid.Col>

            <Grid.Col span={1}>
              <TextArea
                label="With right section"
                placeholder="Write something"
                rows={4}
                rightSection={<IconSettings size={16} />}
              />
            </Grid.Col>

            <Grid.Col span={1}>
              <TextArea
                label="Disabled"
                placeholder="Disabled textarea"
                rows={4}
                disabled
              />
            </Grid.Col>

            <Grid.Col span={1}>
              <TextArea
                label="Read-only"
                defaultValue="Readonly value"
                rows={4}
                readonly
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
          <Title>Switch</Title>
          <Text fz="sm" fw={700}>
            Switch supports controlled and uncontrolled usage, labels,
            descriptions and readonly/disabled states.
          </Text>

          <Grid mt="md" cols={5} gutter="md">
            {SIZES.map((size) => (
              <Grid.Col key={size} span={1}>
                <Switch
                  size={size}
                  label={`${size} size switch`}
                  defaultChecked={size === "md"}
                  description="Switch description"
                />
              </Grid.Col>
            ))}
          </Grid>

          <Grid mt="md" cols={5} gutter="md">
            <Grid.Col span={1}>
              <Switch
                label="Auto sync"
                description="Keep project changes synchronized"
                checked={autoSync}
                onChange={setAutoSync}
              />
            </Grid.Col>

            <Grid.Col span={1}>
              <Switch
                label="Usage analytics"
                description="Help us improve developer experience"
                checked={usageAnalytics}
                onChange={setUsageAnalytics}
                error={
                  !usageAnalytics
                    ? "Recommended for better diagnostics"
                    : undefined
                }
              />
            </Grid.Col>

            <Grid.Col span={1}>
              <Switch
                label="Disabled switch"
                description="Interaction is blocked"
                disabled
                defaultChecked
              />
            </Grid.Col>

            <Grid.Col span={1}>
              <Switch
                label="Read-only switch"
                description="Visible state without editing"
                readonly
                defaultChecked
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>Radio</Title>
          <Text fz="sm" fw={700}>
            Radio supports controlled and uncontrolled usage, labels,
            descriptions, readonly/disabled states and native radio grouping.
          </Text>

          <Grid mt="md" cols={5} gutter="md">
            {SIZES.map((size) => (
              <Grid.Col key={size} span={1}>
                <Radio
                  size={size}
                  name={`size-radio-${size}`}
                  label={`${size} size radio`}
                  defaultChecked={size === "md"}
                />
              </Grid.Col>
            ))}
          </Grid>

          <Grid mt="md" cols={5} gutter="md">
            <Grid.Col span={1}>
              <Stack gap="xs">
                <Radio
                  name="notification-channel"
                  label="Email"
                  description="Primary communication channel"
                  checked={notificationChannel === "email"}
                  onChange={(checked) => {
                    if (checked) {
                      setNotificationChannel("email");
                    }
                  }}
                />
                <Radio
                  name="notification-channel"
                  label="SMS"
                  description="Short mobile notifications"
                  checked={notificationChannel === "sms"}
                  onChange={(checked) => {
                    if (checked) {
                      setNotificationChannel("sms");
                    }
                  }}
                  error={
                    notificationChannel !== "email" &&
                    notificationChannel !== "sms"
                      ? "Please select a channel"
                      : undefined
                  }
                />
              </Stack>
            </Grid.Col>

            <Grid.Col span={1}>
              <Radio
                name="shipping-speed"
                label="Express"
                description="Disabled option"
                disabled
              />
            </Grid.Col>

            <Grid.Col span={1}>
              <Radio
                name="privacy-scope"
                label="Internal only"
                description="Read-only selected option"
                readonly
                defaultChecked
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      <Paper p="xs" mt="xl">
        <Stack>
          <Title>Slider</Title>
          <Text fz="sm" fw={700}>
            Slider supports controlled and uncontrolled usage, labels,
            descriptions, constraints and readonly/disabled states.
          </Text>

          <Grid mt="md" cols={5} gutter="md">
            {SIZES.map((size) => (
              <Grid.Col key={size} span={1}>
                <Slider
                  size={size}
                  label={`${size} size`}
                  description="Default range 0-100"
                  defaultValue={size === "md" ? 60 : 35}
                />
              </Grid.Col>
            ))}
          </Grid>

          <Grid mt="md" cols={5} gutter="md">
            <Grid.Col span={2}>
              <Stack gap="xs">
                <Slider
                  label="Volume"
                  description="Output level"
                  min={0}
                  max={100}
                  step={1}
                  value={volume}
                  onChange={setVolume}
                />
                <Text fz="sm" color="var(--lorewave-color-dimmed)">
                  Volume: {volume}%
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={2}>
              <Stack gap="xs">
                <Slider
                  label="Brightness"
                  description="Display light"
                  min={10}
                  max={90}
                  step={5}
                  value={brightness}
                  onChange={setBrightness}
                  error={brightness < 20 ? "Brightness is too low" : undefined}
                />
                <Text fz="sm" color="var(--lorewave-color-dimmed)">
                  Brightness: {brightness}
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={1}>
              <Stack gap="xs">
                <Slider
                  label="Disabled"
                  description="No interaction"
                  disabled
                  defaultValue={50}
                />
                <Slider
                  label="Read-only"
                  description="Visible current state"
                  readonly
                  defaultValue={65}
                />
              </Stack>
            </Grid.Col>
          </Grid>
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
