import { getColor } from "./get-color";
import { isNumberLike } from "./is-number-like";
import { rem } from "./rem";

export const getSize = (
  size: unknown,
  prefix = "size",
  convertToRem = true,
): string | undefined => {
  if (size === undefined) {
    return undefined;
  }

  return isNumberLike(size)
    ? convertToRem
      ? rem(size)
      : (size as string)
    : `var(--${prefix}-${size})`;
};

export const getSpacing = (size: unknown) => {
  return getSize(size, "lorewave-spacing");
};

export function getRadius(size: unknown) {
  if (size === undefined) {
    return "var(--lorewave-radius-md)";
  }

  return getSize(size, "lorewave-radius");
}

export const getFontSize = (size: unknown) => {
  return getSize(size, "lorewave-font-size");
};

export const getLineHeight = (size: unknown) => {
  return getSize(size, "lorewave-line-height", false);
};

export const getShadow = (size: unknown) => {
  if (!size) return undefined;

  return getSize(size, "lorewave-shadow", false);
};

export const getBorder = (value: unknown) => {
  if (typeof value === "number") {
    return rem(value);
  }

  if (typeof value === "string") {
    const [size, style, ...colorTuple] = value
      .split(" ")
      .filter((val) => val.trim() !== "");
    let result = `${rem(size)}`;
    if (style) {
      result += ` ${style}`;
    }

    if (colorTuple.length > 0) {
      result += ` ${getColor(colorTuple.join(" "))}`;
    }

    return result.trim();
  }

  return value;
};

const values = {
  text: "var(--lorewave-font-family)",
  mono: "var(--lorewave-font-family-monospace)",
  monospace: "var(--lorewave-font-family-monospace)",
  heading: "var(--lorewave-font-family-headings)",
  headings: "var(--lorewave-font-family-headings)",
};

export const getFontFamily = (fontFamily: unknown) => {
  if (typeof fontFamily === "string" && fontFamily in values) {
    return values[fontFamily as keyof typeof values];
  }

  return fontFamily;
};
