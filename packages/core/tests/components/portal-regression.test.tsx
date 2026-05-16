import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Portal } from "../../src/components/Portal/Portal";

describe("portal regression", () => {
  it("renders children in document.body by default", async () => {
    const { container } = render(
      <div>
        <Portal>
          <span>Portal content</span>
        </Portal>
      </div>,
    );

    expect(await screen.findByText("Portal content")).toBeInTheDocument();
    expect(container).not.toHaveTextContent("Portal content");
  });

  it("renders inline when withinPortal=false", () => {
    const { container } = render(
      <div>
        <Portal withinPortal={false}>
          <span>Inline content</span>
        </Portal>
      </div>,
    );

    expect(container).toHaveTextContent("Inline content");
  });

  it("renders inside custom target selector", async () => {
    const customTarget = document.createElement("div");
    customTarget.id = "custom-portal-target";
    document.body.appendChild(customTarget);

    try {
      render(
        <Portal target="#custom-portal-target">
          <span>Custom target content</span>
        </Portal>,
      );

      expect(await screen.findByText("Custom target content")).toBeInTheDocument();
      expect(customTarget).toHaveTextContent("Custom target content");
    } finally {
      customTarget.remove();
    }
  });

  it("reuses single target node when reuseTargetNode=true", async () => {
    const { unmount } = render(
      <>
        <Portal id="shared-portal" reuseTargetNode>
          <span>First portal node</span>
        </Portal>
        <Portal id="shared-portal" reuseTargetNode>
          <span>Second portal node</span>
        </Portal>
      </>,
    );

    expect(await screen.findByText("First portal node")).toBeInTheDocument();
    expect(screen.getByText("Second portal node")).toBeInTheDocument();

    const sharedNodes = document.querySelectorAll("#shared-portal");
    expect(sharedNodes).toHaveLength(1);
    expect(sharedNodes[0]).toHaveTextContent("First portal node");
    expect(sharedNodes[0]).toHaveTextContent("Second portal node");

    unmount();

    expect(document.getElementById("shared-portal")).not.toBeInTheDocument();
  });
});