import type { Token, Variant } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getColorVariant } from "../../utils/get-color-variant";
import { getFontSize, getRadius, getSize } from "../../utils/get-size";
import classes from "./Badge.module.css";

interface CProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  children?: React.ReactNode;
  size?: Token;
  variant?: Variant;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  fullWidth?: boolean;
}

type CSlots = "root" | "section" | "label";

export const Badge = coreCompute<CProps, CSlots, HTMLSpanElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    omitProps: ["color", "radius", "fz"],
    defaultProps: {
      size: "sm",
      variant: "light",
    },
    vars({ size, color, variant, radius }) {
      const colors = getColorVariant(color || "primary", variant || "light");

      return {
        root: {
          "--badge-height": getSize(size, "button-height"),
          "--badge-padding-x": getSize(size, "button-padding-x"),
          "--badge-fz": getFontSize(size),
          "--badge-radius":
            radius === undefined ? undefined : getRadius(radius),
          "--badge-color": colors.color,
          "--badge-hover-color": colors.hoverColor,
          "--badge-bg": colors.background,
          "--badge-hover-bg": colors.hoverBackground,
          "--badge-border": colors.border,
          "--badge-hover-border": colors.hoverBorder,
        },
      };
    },
    mods: ({ leftSection, rightSection, fullWidth }) => {
      return {
        root: {
          "data-full-width": fullWidth,
          "data-with-left-section": !!leftSection,
          "data-with-right-section": !!rightSection,
        },
      };
    },
  },
  (props, slot) => {
    return (
      <span {...slot.root}>
        {props.leftSection && <span {...slot.section}>{props.leftSection}</span>}
        <span {...slot.label}>{props.children}</span>
        {props.rightSection && <span {...slot.section}>{props.rightSection}</span>}
      </span>
    );
  },
);
