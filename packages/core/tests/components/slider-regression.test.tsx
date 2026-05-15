import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "../../src/components/Slider/Slider";

describe("slider regression", () => {
  it("returns numeric value in onChange callback", () => {
    const handleChange = vi.fn();

    render(<Slider label="Volume" min={0} max={100} onChange={handleChange} />);

    const slider = screen.getByRole("slider", { name: "Volume" });
    fireEvent.change(slider, { target: { value: "72" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(72, expect.any(Object));
  });

  it("supports controlled value", () => {
    render(<Slider label="Controlled" value={30} readOnly />);

    const slider = screen.getByRole("slider", { name: "Controlled" });
    expect(slider).toHaveValue("30");
  });

  it("supports readonly alias and blocks callback", () => {
    const handleChange = vi.fn();

    render(
      <Slider
        label="Read only"
        defaultValue={45}
        readonly
        onChange={handleChange}
      />,
    );

    const slider = screen.getByRole("slider", { name: "Read only" });
    fireEvent.change(slider, { target: { value: "70" } });

    expect(slider).toHaveAttribute("readonly");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders description and error text", () => {
    render(
      <Slider
        label="Brightness"
        description="Affects display light output"
        error="Brightness is too low"
      />,
    );

    expect(screen.getByText("Brightness")).toBeInTheDocument();
    expect(screen.getByText("Affects display light output")).toBeInTheDocument();
    expect(screen.getByText("Brightness is too low")).toBeInTheDocument();
  });

  it("forwards min, max and step attributes", () => {
    render(<Slider label="Range" min={10} max={90} step={5} />);

    const slider = screen.getByRole("slider", { name: "Range" });
    expect(slider).toHaveAttribute("min", "10");
    expect(slider).toHaveAttribute("max", "90");
    expect(slider).toHaveAttribute("step", "5");
  });
});
