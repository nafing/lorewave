import { describe, expect, it } from "vitest";
import {
  getBorder,
  getRadius,
  getShadow,
  getSize,
  getSpacing,
} from "../../src/utils/get-size";

describe("get-size utils", () => {
  it("converts number sizes to scaled rem", () => {
    expect(getSize(16)).toBe("calc(1rem * var(--lorewave-scale))");
  });

  it("returns spacing token variables", () => {
    expect(getSpacing("md")).toBe("var(--lorewave-spacing-md)");
  });

  it("returns default radius for undefined values", () => {
    expect(getRadius(undefined)).toBe("var(--lorewave-radius-md)");
  });

  it("returns undefined shadow for falsy values", () => {
    expect(getShadow(undefined)).toBeUndefined();
  });

  it("builds border shorthand with converted color token", () => {
    expect(getBorder("16 solid primary")).toBe(
      "calc(1rem * var(--lorewave-scale)) solid var(--lorewave-color-primary)",
    );
  });
});
