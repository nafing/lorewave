const CSS_COLOR_FUNCTION_REGEX =
  /^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|color-mix)\(/i;

const CSS_GRADIENT_FUNCTION_REGEX =
  /^(?:linear-gradient|radial-gradient|conic-gradient|repeating-linear-gradient|repeating-radial-gradient|repeating-conic-gradient)\(/i;

const CSS_COLOR_KEYWORDS = new Set([
  "transparent",
  "currentcolor",
  "inherit",
  "initial",
  "unset",
  "revert",
  "revert-layer",
]);

export function getColor(value: string): string;
export function getColor<T>(value: T): T;
export function getColor(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  const normalizedValue = value.trim();

  if (normalizedValue === "") {
    return value;
  }

  if (normalizedValue.startsWith("var(")) {
    return normalizedValue;
  }

  if (normalizedValue.startsWith("--")) {
    return `var(${normalizedValue})`;
  }

  const lowerCaseValue = normalizedValue.toLowerCase();

  if (
    normalizedValue.startsWith("#") ||
    CSS_COLOR_FUNCTION_REGEX.test(normalizedValue) ||
    CSS_GRADIENT_FUNCTION_REGEX.test(normalizedValue) ||
    CSS_COLOR_KEYWORDS.has(lowerCaseValue)
  ) {
    return normalizedValue;
  }

  return `var(--lorewave-color-${normalizedValue})`;
}
