import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Avatar } from "../../src/components/Avatar/Avatar";

describe("avatar regression", () => {
  it("renders initials from name when image is missing", () => {
    render(<Avatar name="Lore Wave" />);

    expect(screen.getByText("LW")).toBeInTheDocument();
  });

  it("renders image when source is provided", () => {
    render(
      <Avatar
        src="/avatar.png"
        alt="Lorewave user"
        imageProps={{ loading: "lazy" }}
      />,
    );

    const image = screen.getByRole("img", { name: "Lorewave user" });
    expect(image).toHaveAttribute("src", "/avatar.png");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("uses fallbackSrc when main source fails", () => {
    render(
      <Avatar
        src="/broken.png"
        fallbackSrc="/fallback.png"
        alt="Fallback avatar"
      />,
    );

    const image = screen.getByRole("img", { name: "Fallback avatar" });
    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "/fallback.png");
  });

  it("shows placeholder after source and fallback fail", () => {
    const handleError = vi.fn();

    render(
      <Avatar
        src="/broken.png"
        fallbackSrc="/fallback.png"
        name="Nexa Quinn"
        imageProps={{ onError: handleError }}
      />,
    );

    const image = screen.getByRole("img", { name: "Nexa Quinn" });
    fireEvent.error(image);
    fireEvent.error(image);

    expect(screen.getByText("NQ")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Nexa Quinn" })).toBeNull();
    expect(handleError).toHaveBeenCalledTimes(2);
  });
});
