import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tooltip } from "../../src/components/Tooltip/Tooltip";

describe("tooltip regression", () => {
  it("shows and hides on hover", async () => {
    render(
      <Tooltip label="Tooltip text" openDelay={0} closeDelay={0}>
        <button type="button">Hover target</button>
      </Tooltip>,
    );

    const target = screen.getByRole("button", { name: "Hover target" });
    const reference = target.parentElement as HTMLElement;

    fireEvent.mouseEnter(reference);
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Tooltip text");

    fireEvent.mouseLeave(reference);
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("supports open and close with focus", async () => {
    render(
      <Tooltip label="Focus tooltip" openDelay={0} closeDelay={0}>
        <button type="button">Focus target</button>
      </Tooltip>,
    );

    const target = screen.getByRole("button", { name: "Focus target" });

    fireEvent.focus(target);
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Focus tooltip");

    fireEvent.blur(target);
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("does not show when disabled", async () => {
    render(
      <Tooltip label="Disabled" disabled openDelay={0} closeDelay={0}>
        <button type="button">Disabled target</button>
      </Tooltip>,
    );

    const target = screen.getByRole("button", { name: "Disabled target" });

    fireEvent.mouseEnter(target);
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("supports controlled opened state", () => {
    const handleOpenChange = vi.fn();

    render(
      <Tooltip
        label="Controlled"
        opened
        openDelay={0}
        closeDelay={0}
        onOpenChange={handleOpenChange}
      >
        <button type="button">Controlled target</button>
      </Tooltip>,
    );

    expect(screen.getByRole("tooltip")).toHaveTextContent("Controlled");

    const target = screen.getByRole("button", { name: "Controlled target" });
    const reference = target.parentElement as HTMLElement;
    fireEvent.mouseEnter(reference);
    fireEvent.mouseLeave(reference);

    expect(handleOpenChange).toHaveBeenCalled();
  });
});
