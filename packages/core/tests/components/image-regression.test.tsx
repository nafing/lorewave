import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Image } from "../../src/components/Image/Image";

describe("image regression", () => {
  it("forwards native image attributes", () => {
    render(
      <Image
        src="/cover.png"
        alt="Story cover"
        loading="lazy"
        decoding="async"
      />,
    );

    const image = screen.getByRole("img", { name: "Story cover" });
    expect(image).toHaveAttribute("src", "/cover.png");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
  });

  it("switches to fallback source after load error", () => {
    render(
      <Image src="/broken.png" fallbackSrc="/fallback.png" alt="Fallback" />,
    );

    const image = screen.getByRole("img", { name: "Fallback" });
    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "/fallback.png");
  });

  it("calls onError handler", () => {
    const handleError = vi.fn();

    render(
      <Image
        src="/broken.png"
        fallbackSrc="/fallback.png"
        alt="With handler"
        onError={handleError}
      />,
    );

    const image = screen.getByRole("img", { name: "With handler" });
    fireEvent.error(image);

    expect(handleError).toHaveBeenCalledTimes(1);
  });
});
