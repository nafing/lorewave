import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "../../src/components/Select/Select";

const OPTIONS = [
  {
    value: "react",
    label: "React",
    description: "UI library",
    icon: <span aria-hidden="true">r</span>,
  },
  { value: "vue", label: "Vue", description: "Progressive" },
  { value: "svelte", label: "Svelte", hidden: true },
];

describe("select regression", () => {
  it("returns selected value in onChange callback", () => {
    const handleChange = vi.fn();

    render(
      <Select
        placeholder="Pick framework"
        data={OPTIONS}
        onChange={handleChange}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.click(select);
    fireEvent.click(screen.getByRole("option", { name: /Vue/ }));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("vue", expect.any(Object));
  });

  it("clicking selected option deselects it", () => {
    const handleChange = vi.fn();

    render(
      <Select
        placeholder="Pick framework"
        data={OPTIONS}
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole("combobox") as HTMLInputElement;

    fireEvent.click(input);
    fireEvent.click(screen.getByRole("option", { name: /Vue/ }));

    fireEvent.click(input);
    fireEvent.click(screen.getByRole("option", { name: /Vue/ }));

    expect(handleChange).toHaveBeenNthCalledWith(1, "vue", expect.any(Object));
    expect(handleChange).toHaveBeenNthCalledWith(2, "", expect.any(Object));
    expect(input.value).toBe("");
  });

  it("renders placeholder label before selection", () => {
    render(<Select placeholder="Pick framework" data={OPTIONS} />);

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "placeholder",
      "Pick framework",
    );
  });

  it("forwards native select attrs and events", () => {
    const handleBlur = vi.fn();

    const { container } = render(
      <Select
        data={OPTIONS}
        name="framework"
        required
        onBlur={handleBlur}
      />,
    );

    const select = screen.getByRole("combobox");
    const nativeSelect = container.querySelector('select[name="framework"]');

    expect(nativeSelect).toBeInTheDocument();
    expect(nativeSelect).toBeRequired();

    fireEvent.blur(select);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("supports debounced searchable filtering and hides hidden options", () => {
    vi.useFakeTimers();

    try {
      render(<Select searchable searchDebounce={200} data={OPTIONS} />);

      const input = screen.getByRole("combobox");
      fireEvent.click(input);
      fireEvent.change(input, { target: { value: "vue" } });

      expect(screen.getByRole("option", { name: /React/ })).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(screen.getByRole("option", { name: /Vue/ })).toBeInTheDocument();
      expect(screen.queryByRole("option", { name: /React/ })).not.toBeInTheDocument();
      expect(screen.queryByRole("option", { name: "Svelte" })).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("renders icon and description inside options", () => {
    render(<Select data={OPTIONS} />);

    fireEvent.click(screen.getByRole("combobox"));

    expect(screen.getByText("UI library")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "React UI library" })).toBeInTheDocument();
  });

  it("highlights matched fragment in option label and description", () => {
    vi.useFakeTimers();

    try {
      render(
        <Select
          searchable
          searchDebounce={200}
          data={[
            {
              value: "framework",
              label: "Framework Kit",
              description: "framework starter",
            },
          ]}
        />,
      );

      const input = screen.getByRole("combobox");
      fireEvent.click(input);
      fireEvent.change(input, { target: { value: "frame" } });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(screen.getAllByText(/frame/i, { selector: "mark" })).toHaveLength(2);
    } finally {
      vi.useRealTimers();
    }
  });
});
