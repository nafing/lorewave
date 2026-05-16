import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Popover } from "../../src/components/Popover/Popover";

describe("popover regression", () => {
  it("opens and closes on click", async () => {
    render(
      <Popover dropdown={<div>Popover content</div>}>
        <button type="button">Toggle popover</button>
      </Popover>,
    );

    const target = screen.getByRole("button", { name: "Toggle popover" });
    const reference = target.parentElement as HTMLElement;

    fireEvent.click(reference);
    expect(await screen.findByRole("dialog")).toHaveTextContent("Popover content");

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("supports controlled opened state", () => {
    const handleOpenChange = vi.fn();

    render(
      <Popover
        opened
        onOpenChange={handleOpenChange}
        dropdown={<div>Controlled content</div>}
      >
        <button type="button">Controlled trigger</button>
      </Popover>,
    );

    expect(screen.getByRole("dialog")).toHaveTextContent("Controlled content");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleOpenChange).toHaveBeenCalled();
  });

  it("does not open when disabled", () => {
    render(
      <Popover disabled dropdown={<div>Disabled content</div>}>
        <button type="button">Disabled trigger</button>
      </Popover>,
    );

    const target = screen.getByRole("button", { name: "Disabled trigger" });
    const reference = target.parentElement as HTMLElement;

    fireEvent.click(reference);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("respects closeOnClickOutside=false", () => {
    render(
      <Popover
        closeOnClickOutside={false}
        dropdown={<div>Persistent content</div>}
      >
        <button type="button">Persistent trigger</button>
      </Popover>,
    );

    const target = screen.getByRole("button", { name: "Persistent trigger" });
    const reference = target.parentElement as HTMLElement;

    fireEvent.click(reference);
    expect(screen.getByRole("dialog")).toHaveTextContent("Persistent content");

    fireEvent.click(document.body);
    expect(screen.getByRole("dialog")).toHaveTextContent("Persistent content");
  });

  it("renders dropdown in custom portal target", async () => {
    const targetNode = document.createElement("div");
    targetNode.id = "popover-portal-target";
    document.body.appendChild(targetNode);

    try {
      render(
        <Popover
          portalTarget="#popover-portal-target"
          dropdown={<div>Targeted popover</div>}
        >
          <button type="button">Targeted trigger</button>
        </Popover>,
      );

      const target = screen.getByRole("button", { name: "Targeted trigger" });
      const reference = target.parentElement as HTMLElement;

      fireEvent.click(reference);

      await waitFor(() => {
        expect(targetNode).toHaveTextContent("Targeted popover");
      });
    } finally {
      targetNode.remove();
    }
  });
});
