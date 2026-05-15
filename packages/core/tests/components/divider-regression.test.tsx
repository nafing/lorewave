import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "../../src/components/Divider/Divider";

describe("divider regression", () => {
  it("renders with separator role and forwards native attributes", () => {
    render(<Divider title="section-divider" aria-label="section split" />);

    const divider = screen.getByRole("separator", { name: "section split" });
    expect(divider).toHaveAttribute("title", "section-divider");
    expect(divider).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("renders horizontal label and supports label positioning", () => {
    render(<Divider label="General" labelPosition="left" />);

    const divider = screen.getByRole("separator");
    expect(screen.getByText("General")).toBeInTheDocument();
    expect(divider).toHaveAttribute("data-with-label");
    expect(divider).toHaveAttribute("data-label-position", "left");
  });

  it("supports solid, dashed and dotted variants", () => {
    const { rerender } = render(<Divider variant="solid" aria-label="variant split" />);

    let divider = screen.getByRole("separator", { name: "variant split" });
    expect(divider).toHaveAttribute("data-variant", "solid");

    rerender(<Divider variant="dashed" aria-label="variant split" />);
    divider = screen.getByRole("separator", { name: "variant split" });
    expect(divider).toHaveAttribute("data-variant", "dashed");

    rerender(<Divider variant="dotted" aria-label="variant split" />);
    divider = screen.getByRole("separator", { name: "variant split" });
    expect(divider).toHaveAttribute("data-variant", "dotted");
  });

  it("supports vertical orientation", () => {
    render(<Divider orientation="vertical" h={40} aria-label="vertical split" />);

    const divider = screen.getByRole("separator", { name: "vertical split" });
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
    expect(divider).toHaveAttribute("data-orientation", "vertical");
  });
});
