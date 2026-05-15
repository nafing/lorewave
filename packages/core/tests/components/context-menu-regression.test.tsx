import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContextMenu } from "../../src/components/ContextMenu/ContextMenu";

describe("context-menu regression", () => {
  const renderTarget = () => {
    return screen.getByText("Context area");
  };

  it("opens menu on context click and closes after clicking item", async () => {
    render(
      <ContextMenu withinPortal={false}>
        <ContextMenu.Target>
          <div>Context area</div>
        </ContextMenu.Target>
        <ContextMenu.Dropdown>
          <ContextMenu.Item>Action item</ContextMenu.Item>
        </ContextMenu.Dropdown>
      </ContextMenu>,
    );

    fireEvent.contextMenu(renderTarget());
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("menuitem", { name: "Action item" }));

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("supports checkbox toggle without closing menu", () => {
    const onChange = vi.fn();

    render(
      <ContextMenu withinPortal={false}>
        <ContextMenu.Target>
          <div>Context area</div>
        </ContextMenu.Target>
        <ContextMenu.Dropdown>
          <ContextMenu.Checkbox onChange={onChange}>Pin project</ContextMenu.Checkbox>
        </ContextMenu.Dropdown>
      </ContextMenu>,
    );

    fireEvent.contextMenu(renderTarget());
    const checkbox = screen.getByRole("menuitemcheckbox", { name: "Pin project" });

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("supports uncontrolled radio groups", () => {
    render(
      <ContextMenu withinPortal={false}>
        <ContextMenu.Target>
          <div>Context area</div>
        </ContextMenu.Target>
        <ContextMenu.Dropdown>
          <ContextMenu.Radio name="view" value="list" defaultChecked>
            List
          </ContextMenu.Radio>
          <ContextMenu.Radio name="view" value="grid">
            Grid
          </ContextMenu.Radio>
        </ContextMenu.Dropdown>
      </ContextMenu>,
    );

    fireEvent.contextMenu(renderTarget());

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

  it("opens submenu content", () => {
    render(
      <ContextMenu withinPortal={false}>
        <ContextMenu.Target>
          <div>Context area</div>
        </ContextMenu.Target>
        <ContextMenu.Dropdown>
          <ContextMenu.Sub label="More options">
            <ContextMenu.Item>Sub action</ContextMenu.Item>
          </ContextMenu.Sub>
        </ContextMenu.Dropdown>
      </ContextMenu>,
    );

    fireEvent.contextMenu(renderTarget());
    fireEvent.click(screen.getByRole("menuitem", { name: /More options/ }));

    expect(screen.getByRole("menuitem", { name: "Sub action" })).toBeInTheDocument();
  });

  it("renders label, divider and descriptions", () => {
    render(
      <ContextMenu withinPortal={false}>
        <ContextMenu.Target>
          <div>Context area</div>
        </ContextMenu.Target>
        <ContextMenu.Dropdown>
          <ContextMenu.Label>Workspace</ContextMenu.Label>
          <ContextMenu.Item description="Create a new file in workspace">
            Create file
          </ContextMenu.Item>
          <ContextMenu.Divider />
          <ContextMenu.Checkbox description="Keep this section visible">
            Pin sidebar
          </ContextMenu.Checkbox>
        </ContextMenu.Dropdown>
      </ContextMenu>,
    );

    fireEvent.contextMenu(renderTarget());

    expect(screen.getByText("Workspace")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(screen.getByText("Create a new file in workspace")).toBeInTheDocument();
    expect(screen.getByText("Keep this section visible")).toBeInTheDocument();
  });
});
