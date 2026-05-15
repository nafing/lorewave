import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ActionIcon } from "../../src/components/ActionIcon/ActionIcon";
import { Button } from "../../src/components/Button/Button";
import { Group } from "../../src/components/Group/Group";

describe("native props consistency", () => {
  it("Button defaults to type=button", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("Button forwards native button attributes", () => {
    render(
      <Button type="submit" name="submit-action" form="settings-form">
        Submit
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("name", "submit-action");
    expect(button).toHaveAttribute("form", "settings-form");
  });

  it("ActionIcon forwards native button attributes", () => {
    render(
      <ActionIcon type="submit" name="icon-submit" aria-label="settings">
        s
      </ActionIcon>,
    );

    const button = screen.getByRole("button", { name: "settings" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("name", "icon-submit");
  });

  it("Group forwards native HTML props and handlers", () => {
    const handleClick = vi.fn();

    render(
      <Group role="toolbar" aria-label="actions" onClick={handleClick}>
        <button type="button">A</button>
      </Group>,
    );

    const group = screen.getByRole("toolbar", { name: "actions" });
    fireEvent.click(group);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Button.Group and ActionIcon.Group forward native HTML props", () => {
    render(
      <>
        <Button.Group role="group" aria-label="button-group">
          <Button>One</Button>
          <Button>Two</Button>
        </Button.Group>

        <ActionIcon.Group role="group" aria-label="icon-group">
          <ActionIcon aria-label="icon-1">1</ActionIcon>
          <ActionIcon aria-label="icon-2">2</ActionIcon>
        </ActionIcon.Group>
      </>,
    );

    expect(screen.getByRole("group", { name: "button-group" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "icon-group" })).toBeInTheDocument();
  });
});
