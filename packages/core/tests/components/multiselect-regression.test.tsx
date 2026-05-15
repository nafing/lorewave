import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MultiSelect } from "../../src/components/MultiSelect/MultiSelect";

const OPTIONS = [
  {
    value: "react",
    label: "React",
    description: "UI library",
  },
  {
    value: "vue",
    label: "Vue",
    description: "Progressive",
  },
  {
    value: "svelte",
    label: "Svelte",
    hidden: true,
  },
];

describe("multiselect regression", () => {
  it("returns selected values in onChange callback", () => {
    const handleChange = vi.fn();

    render(
      <MultiSelect
        placeholder="Pick frameworks"
        data={OPTIONS}
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole("combobox");

    fireEvent.click(input);
    fireEvent.click(screen.getByRole("option", { name: /Vue/ }));
    fireEvent.click(screen.getByRole("option", { name: /React/ }));

    expect(handleChange).toHaveBeenNthCalledWith(1, ["vue"], expect.any(Object));
    expect(handleChange).toHaveBeenNthCalledWith(
      2,
      ["vue", "react"],
      expect.any(Object),
    );
  });

  it("clicking selected option deselects it", () => {
    const handleChange = vi.fn();

    render(
      <MultiSelect
        placeholder="Pick frameworks"
        data={OPTIONS}
        value={["vue"]}
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole("combobox");
    fireEvent.click(input);
    fireEvent.click(screen.getByRole("option", { name: /Vue/ }));

    expect(handleChange).toHaveBeenCalledWith([], expect.any(Object));
  });

  it("supports searchable filtering and hides hidden options", () => {
    render(
      <MultiSelect searchable searchDebounce={0} data={OPTIONS} />,
    );

    const input = screen.getByRole("combobox");
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: "vue" } });

    expect(screen.getByRole("option", { name: /Vue/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /React/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Svelte/ })).not.toBeInTheDocument();
  });

  it("forwards native select attrs and uses multiple mode", () => {
    const { container } = render(
      <MultiSelect
        data={OPTIONS}
        name="frameworks"
        required
        form="settings-form"
      />,
    );

    const nativeSelect = container.querySelector('select[name="frameworks"]');

    expect(nativeSelect).toBeInTheDocument();
    expect(nativeSelect).toBeRequired();
    expect(nativeSelect).toHaveAttribute("form", "settings-form");
    expect(nativeSelect).toHaveAttribute("multiple");
  });

  it("renders selected values as chips in trigger", () => {
    render(
      <MultiSelect
        data={OPTIONS}
        value={["react", "vue"]}
      />,
    );

    const input = screen.getByRole("combobox") as HTMLInputElement;
    expect(input.value).toBe("");

    const trigger = input.parentElement;
    expect(trigger).toHaveTextContent("React");
    expect(trigger).toHaveTextContent("Vue");
  });
});
