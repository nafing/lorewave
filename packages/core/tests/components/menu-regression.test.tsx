import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Menu } from "../../src/components/Menu/Menu";

describe("menu regression", () => {
  it("opens menu and closes after clicking item", async () => {
    render(
      <Menu withinPortal={false}>
        <Menu.Target>
          <button type="button">Open menu</button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Action item</Menu.Item>
        </Menu.Dropdown>
      </Menu>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("menuitem", { name: "Action item" }));

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("supports checkbox toggle without closing menu", () => {
    const onChange = vi.fn();

    render(
      <Menu withinPortal={false}>
        <Menu.Target>
          <button type="button">Open menu</button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Checkbox onChange={onChange}>Pin project</Menu.Checkbox>
        </Menu.Dropdown>
      </Menu>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const checkbox = screen.getByRole("menuitemcheckbox", { name: "Pin project" });

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("supports uncontrolled radio groups", () => {
    render(
      <Menu withinPortal={false}>
        <Menu.Target>
          <button type="button">Open menu</button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Radio name="view" value="list" defaultChecked>
            List
          </Menu.Radio>
          <Menu.Radio name="view" value="grid">
            Grid
          </Menu.Radio>
        </Menu.Dropdown>
      </Menu>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    const list = screen.getByRole("menuitemradio", { name: "List" });
    const grid = screen.getByRole("menuitemradio", { name: "Grid" });

    expect(list).toHaveAttribute("aria-checked", "true");
    expect(grid).toHaveAttribute("aria-checked", "false");

    fireEvent.click(grid);

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: "List" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
    expect(screen.getByRole("menuitemradio", { name: "Grid" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("does not close submenu after clicking checkbox or radio", () => {
    render(
      <Menu withinPortal={false}>
        <Menu.Target>
          <button type="button">Open menu</button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Sub label="Preferences">
            <Menu.Checkbox defaultChecked>Pin tab</Menu.Checkbox>
            <Menu.Radio name="density" value="comfortable" defaultChecked>
              Comfortable
            </Menu.Radio>
            <Menu.Radio name="density" value="compact">
              Compact
            </Menu.Radio>
          </Menu.Sub>
        </Menu.Dropdown>
      </Menu>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("menuitem", { name: /Preferences/ }));

    const pinTab = screen.getByRole("menuitemcheckbox", { name: "Pin tab" });
    fireEvent.click(pinTab);

    expect(screen.getByRole("menuitemcheckbox", { name: "Pin tab" })).toBeInTheDocument();
    expect(pinTab).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("menuitemradio", { name: "Comfortable" })).toHaveAttribute(
      "aria-checked",
      "true",
    );

    fireEvent.click(screen.getByRole("menuitemradio", { name: "Compact" }));

    expect(screen.getByRole("menuitemcheckbox", { name: "Pin tab" })).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: "Comfortable" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
    expect(screen.getByRole("menuitemradio", { name: "Compact" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("opens submenu content", () => {
    render(
      <Menu withinPortal={false}>
        <Menu.Target>
          <button type="button">Open menu</button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Sub label="More options">
            <Menu.Item>Sub action</Menu.Item>
          </Menu.Sub>
        </Menu.Dropdown>
      </Menu>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("menuitem", { name: /More options/ }));

    expect(screen.getByRole("menuitem", { name: "Sub action" })).toBeInTheDocument();
  });

  it("renders label and divider", () => {
    render(
      <Menu withinPortal={false}>
        <Menu.Target>
          <button type="button">Open menu</button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Workspace</Menu.Label>
          <Menu.Item>Open</Menu.Item>
          <Menu.Divider />
          <Menu.Item>Delete</Menu.Item>
        </Menu.Dropdown>
      </Menu>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByText("Workspace")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Open" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Delete" })).toBeInTheDocument();
  });

  it("renders descriptions for item, checkbox and radio", () => {
    render(
      <Menu withinPortal={false}>
        <Menu.Target>
          <button type="button">Open menu</button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item description="Create a new file in workspace">Create file</Menu.Item>
          <Menu.Checkbox description="Keep this section visible">Pin sidebar</Menu.Checkbox>
          <Menu.Radio
            name="layout"
            value="list"
            description="Compact rows layout"
            defaultChecked
          >
            List
          </Menu.Radio>
        </Menu.Dropdown>
      </Menu>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByText("Create a new file in workspace")).toBeInTheDocument();
    expect(screen.getByText("Keep this section visible")).toBeInTheDocument();
    expect(screen.getByText("Compact rows layout")).toBeInTheDocument();
  });
});
