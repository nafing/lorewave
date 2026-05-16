import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NumberInput } from "../../src/components/NumberInput/NumberInput";
import { TextArea } from "../../src/components/TextArea/TextArea";
import { TextInput } from "../../src/components/TextInput/TextInput";

describe("input components regression", () => {
  it("TextInput onChange returns string value and event", () => {
    const handleChange = vi.fn();

    render(<TextInput placeholder="email" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("email");
    fireEvent.change(input, { target: { value: "dev@lorewave.dev" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      "dev@lorewave.dev",
      expect.any(Object),
    );
  });

  it("TextInput supports readonly alias", () => {
    render(<TextInput placeholder="readonly-text" readonly />);

    const input = screen.getByPlaceholderText("readonly-text");
    expect(input).toHaveAttribute("readonly");
  });

  it("TextArea onChange returns string value and event", () => {
    const handleChange = vi.fn();

    render(<TextArea placeholder="bio" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("bio");
    fireEvent.change(input, { target: { value: "Building with Lorewave." } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      "Building with Lorewave.",
      expect.any(Object),
    );
  });

  it("TextArea supports readonly alias", () => {
    render(<TextArea placeholder="readonly-bio" readonly />);

    const input = screen.getByPlaceholderText("readonly-bio");
    expect(input).toHaveAttribute("readonly");
  });

  it("NumberInput onChange returns number value and event", () => {
    const handleChange = vi.fn();

    render(<NumberInput placeholder="amount" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("amount");
    fireEvent.change(input, { target: { value: "42" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(42, expect.any(Object));
  });

  it("NumberInput forwards native blur handlers", () => {
    const handleBlur = vi.fn();

    render(<NumberInput placeholder="blur-check" onBlur={handleBlur} />);

    const input = screen.getByPlaceholderText("blur-check");
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("NumberInput supports readonly alias", () => {
    render(<NumberInput placeholder="readonly-number" readonly />);

    const input = screen.getByPlaceholderText("readonly-number");
    expect(input).toHaveAttribute("readonly");
  });
});
