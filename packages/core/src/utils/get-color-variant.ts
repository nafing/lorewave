import type { Variant } from "../types/core";
import { getColor } from "./get-color";

type VariantColorsResolved = {
  color: string;
  hoverColor: string;
  background: string;
  hoverBackground: string;
  border: string;
  hoverBorder: string;
};

const rgba = (color: unknown, alpha: number): string => {
  const percentage = Math.min(100, Math.max(0, alpha * 100));
  return `color-mix(in srgb, ${color} ${percentage}%, transparent)`;
};

export const getColorVariant = (
  color: string,
  variant: Variant,
): VariantColorsResolved => {
  const resolvedColor = getColor(color);

  switch (variant) {
    case "filled":
      return {
        color: `var(--lorewave-color-white)`,
        hoverColor: `var(--lorewave-color-white)`,
        background: rgba(resolvedColor, 0.85),
        hoverBackground: rgba(resolvedColor, 0.95),
        border: rgba(resolvedColor, 0.85),
        hoverBorder: rgba(resolvedColor, 0.95),
      };
    case "light":
      return {
        color: resolvedColor,
        hoverColor: resolvedColor,
        background: rgba(resolvedColor, 0.15),
        hoverBackground: rgba(resolvedColor, 0.25),
        border: rgba(resolvedColor, 0.15),
        hoverBorder: rgba(resolvedColor, 0.25),
      };
    case "outline":
      return {
        color: resolvedColor,
        hoverColor: resolvedColor,
        background: "transparent",
        hoverBackground: rgba(resolvedColor, 0.1),
        border: resolvedColor,
        hoverBorder: resolvedColor,
      };
    case "subtle":
      return {
        color: `var(--lorewave-color-white)`,
        hoverColor: `var(--lorewave-color-white)`,
        background: "transparent",
        hoverBackground: rgba(resolvedColor, 0.5),
        border: "transparent",
        hoverBorder: "transparent",
      };
    case "transparent":
      return {
        color: resolvedColor,
        hoverColor: resolvedColor,
        background: "transparent",
        hoverBackground: "transparent",
        border: "transparent",
        hoverBorder: "transparent",
      };
    case "white":
      return {
        color: resolvedColor,
        hoverColor: resolvedColor,
        background: `var(--lorewave-color-white)`,
        hoverBackground: rgba(`var(--lorewave-color-white)`, 0.8),
        border: "transparent",
        hoverBorder: "transparent",
      };

    default:
      return {
        color: resolvedColor,
        hoverColor: resolvedColor,
        background: "transparent",
        hoverBackground: rgba(resolvedColor, 0.05),
        border: resolvedColor,
        hoverBorder: rgba(resolvedColor, 0.15),
      };
  }
};
