import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "../../src/components/Switch/Switch";

describe("switch regression", () => {
  it("returns checked value in onChange callback", () => {
    const handleChange = vi.fn();

    render(<Switch label="Auto save" onChange={handleChange} />);

    const input = screen.getByRole("checkbox", { name: "Auto save" });
    fireEvent.click(input);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it("supports controlled checked state", () => {
    render(<Switch label="Controlled" checked readOnly />);

    const input = screen.getByRole("checkbox", { name: "Controlled" });
    expect(input).toBeChecked();
  });

  it("supports readonly alias and prevents toggling", () => {
    const handleChange = vi.fn();

    render(
      <Switch
        label="Read only"
        defaultChecked
        readonly
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole("checkbox", { name: "Read only" });
    fireEvent.click(input);

    expect(input).toBeChecked();
    expect(input).toHaveAttribute("readonly");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders description and error text", () => {
    render(
      <Switch
        label="Usage analytics"
        description="Helps improve product quality"
        error="Selection is required"
      />,
    );

    expect(screen.getByText("Usage analytics")).toBeInTheDocument();
    expect(screen.getByText("Helps improve product quality")).toBeInTheDocument();
    expect(screen.getByText("Selection is required")).toBeInTheDocument();
  });

  it("renders disabled state", () => {
    render(<Switch label="Disabled" disabled />);

    const input = screen.getByRole("checkbox", { name: "Disabled" });
    expect(input).toBeDisabled();
  });
});
