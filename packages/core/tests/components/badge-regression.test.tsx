import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Badge } from "../../src/components/Badge/Badge";

describe("badge regression", () => {
  it("renders content and forwards native HTML attributes", () => {
    render(
      <Badge role="status" aria-label="badge-status" title="hello">
        Draft
      </Badge>,
    );

    const badge = screen.getByRole("status", { name: "badge-status" });
    expect(badge).toHaveTextContent("Draft");
    expect(badge).toHaveAttribute("title", "hello");
  });

  it("forwards click handlers", () => {
    const handleClick = vi.fn();

    render(<Badge onClick={handleClick}>Clickable</Badge>);

    fireEvent.click(screen.getByText("Clickable"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders left and right sections", () => {
    render(
      <Badge leftSection={<span>l</span>} rightSection={<span>r</span>}>
        Label
      </Badge>,
    );

    expect(screen.getByText("l")).toBeInTheDocument();
    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByText("r")).toBeInTheDocument();
  });
});
