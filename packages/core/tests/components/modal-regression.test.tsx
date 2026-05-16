import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "../../src/components/Modal/Modal";

describe("modal regression", () => {
  it("renders dialog content when opened", () => {
    render(
      <Modal opened title="Settings">
        <div>Modal body content</div>
      </Modal>,
    );

    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByText("Modal body content")).toBeInTheDocument();
  });

  it("calls onOpenChange on escape", () => {
    const handleOpenChange = vi.fn();

    render(
      <Modal opened onOpenChange={handleOpenChange}>
        <div>Escape close</div>
      </Modal>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("respects closeOnClickOutside=false", () => {
    const handleOpenChange = vi.fn();

    render(
      <Modal opened onOpenChange={handleOpenChange} closeOnClickOutside={false}>
        <div>Persistent modal</div>
      </Modal>,
    );

    const overlay = screen.getByRole("dialog").parentElement as HTMLElement;
    fireEvent.click(overlay);

    expect(handleOpenChange).not.toHaveBeenCalled();
  });

  it("renders inline when withinPortal=false", () => {
    const { container } = render(
      <div>
        <Modal opened withinPortal={false}>
          <div>Inline modal</div>
        </Modal>
      </div>,
    );

    expect(container).toHaveTextContent("Inline modal");
  });

  it("renders in custom portal target", async () => {
    const target = document.createElement("div");
    target.id = "modal-target";
    document.body.appendChild(target);

    try {
      render(
        <Modal opened portalTarget="#modal-target">
          <div>Targeted modal</div>
        </Modal>,
      );

      await waitFor(() => {
        expect(target).toHaveTextContent("Targeted modal");
      });
    } finally {
      target.remove();
    }
  });

  it("locks document scroll while opened and restores it on close", () => {
    const { rerender } = render(
      <Modal opened>
        <div>Scroll lock modal</div>
      </Modal>,
    );

    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal opened={false}>
        <div>Scroll lock modal</div>
      </Modal>,
    );

    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");
  });
});