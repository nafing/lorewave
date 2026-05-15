import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Radio } from "../../src/components/Radio/Radio";

describe("radio regression", () => {
  it("returns checked value in onChange callback", () => {
    const handleChange = vi.fn();

    render(<Radio label="Email" onChange={handleChange} />);

    const radio = screen.getByRole("radio", { name: "Email" });
    fireEvent.click(radio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it("supports controlled checked state", () => {
    render(<Radio label="Controlled" checked readOnly />);

    const radio = screen.getByRole("radio", { name: "Controlled" });
    expect(radio).toBeChecked();
  });

  it("supports readonly alias and prevents toggling", () => {
    const handleChange = vi.fn();

    render(
      <>
        <Radio label="Primary" name="read-only-group" defaultChecked readonly />
        <Radio
          label="Secondary"
          name="read-only-group"
          readonly
          onChange={handleChange}
        />
      </>,
    );

    const primary = screen.getByRole("radio", { name: "Primary" });
    const secondary = screen.getByRole("radio", { name: "Secondary" });

    fireEvent.click(secondary);

    expect(primary).toBeInTheDocument();
    expect(secondary).toHaveAttribute("readonly");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders description and error text", () => {
    render(
      <Radio
        label="Receive updates"
        description="Weekly changelog"
        error="Selection is required"
      />,
    );

    expect(screen.getByText("Receive updates")).toBeInTheDocument();
    expect(screen.getByText("Weekly changelog")).toBeInTheDocument();
    expect(screen.getByText("Selection is required")).toBeInTheDocument();
  });

  it("supports native radio grouping", () => {
    render(
      <>
        <Radio label="List" name="layout" value="list" defaultChecked />
        <Radio label="Grid" name="layout" value="grid" />
      </>,
    );

    const list = screen.getByRole("radio", { name: "List" });
    const grid = screen.getByRole("radio", { name: "Grid" });

    expect(list).toBeChecked();
    expect(grid).not.toBeChecked();

    fireEvent.click(grid);

    expect(list).not.toBeChecked();
    expect(grid).toBeChecked();
  });
});
