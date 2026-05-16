import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Code } from "../../src/components/Code/Code";

describe("code regression", () => {
  it("renders inline code by default", () => {
    render(<Code>const answer = 42;</Code>);

    const code = screen.getByText("const answer = 42;");
    expect(code.tagName.toLowerCase()).toBe("code");
    expect(code).not.toHaveAttribute("data-block");
  });

  it("supports block mode", () => {
    render(<Code block>{"npm run dev"}</Code>);

    const code = screen.getByText("npm run dev");
    expect(code).toHaveAttribute("data-block", "true");
  });

  it("forwards native attributes and handlers", () => {
    const handleClick = vi.fn();

    render(
      <Code role="note" aria-label="snippet" title="Copy me" onClick={handleClick}>
        pnpm test
      </Code>,
    );

    const code = screen.getByRole("note", { name: "snippet" });
    expect(code).toHaveAttribute("title", "Copy me");

    fireEvent.click(code);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
