import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "../../src/components/Checkbox/Checkbox";

describe("checkbox regression", () => {
  it("returns checked value in onChange callback", () => {
    const handleChange = vi.fn();

    render(<Checkbox label="Accept terms" onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it("supports controlled checked state", () => {
    render(<Checkbox label="Controlled" checked readOnly />);

    const checkbox = screen.getByRole("checkbox", { name: "Controlled" });
    expect(checkbox).toBeChecked();
  });

  it("supports readonly alias and prevents toggling", () => {
    const handleChange = vi.fn();

    render(
      <Checkbox
        label="Read only"
        defaultChecked
        readonly
        onChange={handleChange}
      />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Read only" });
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute("readonly");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders description and error text", () => {
    render(
      <Checkbox
        label="Receive updates"
        description="Weekly changelog"
        error="This consent is required"
      />,
    );

    expect(screen.getByText("Receive updates")).toBeInTheDocument();
    expect(screen.getByText("Weekly changelog")).toBeInTheDocument();
    expect(screen.getByText("This consent is required")).toBeInTheDocument();
  });

  it("supports indeterminate state", () => {
    render(<Checkbox label="Parent" indeterminate />);

    const checkbox = screen.getByRole("checkbox", { name: "Parent" });
    expect(checkbox).toHaveAttribute("data-indeterminate", "true");
  });
});
