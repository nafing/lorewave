import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NavLink } from "../../src/components/NavLink/NavLink";

describe("navlink regression", () => {
  it("forwards native anchor attributes", () => {
    render(
      <NavLink href="/settings" target="_blank" rel="noreferrer">
        Settings
      </NavLink>,
    );

    const link = screen.getByRole("link", { name: "Settings" });

    expect(link).toHaveAttribute("href", "/settings");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("supports active state with aria-current", () => {
    render(
      <NavLink href="/overview" active>
        Overview
      </NavLink>,
    );

    const link = screen.getByRole("link", { name: "Overview" });
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("calls click handler when enabled", () => {
    const handleClick = vi.fn((event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
    });

    render(
      <NavLink href="#billing" onClick={handleClick}>
        Billing
      </NavLink>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Billing" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("prevents interaction when disabled", () => {
    const handleClick = vi.fn();

    render(
      <NavLink href="#security" disabled onClick={handleClick}>
        Security
      </NavLink>,
    );

    const link = screen.getByRole("link", { name: "Security" });
    fireEvent.click(link);

    expect(handleClick).not.toHaveBeenCalled();
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
  });

  it("renders description and sections", () => {
    render(
      <NavLink
        href="#activity"
        description="Track recent changes"
        leftSection={<span aria-hidden="true">L</span>}
        rightSection={<span aria-hidden="true">R</span>}
      >
        Activity
      </NavLink>,
    );

    expect(
      screen.getByRole("link", { name: /Activity\s*Track recent changes/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("Track recent changes")).toBeInTheDocument();
    expect(screen.getByText("L")).toBeInTheDocument();
    expect(screen.getByText("R")).toBeInTheDocument();
  });
});