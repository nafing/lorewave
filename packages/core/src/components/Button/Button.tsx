import LoaderIcon from "../../icons/LoaderIcon";
import type { Token, Variant } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getColorVariant } from "../../utils/get-color-variant";
import { getFontSize, getRadius, getSize } from "../../utils/get-size";
import classes from "./Button.module.css";

interface CProps {
  children: React.ReactNode;
  size?: Token;
  variant?: Variant;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

type CSlots = "root" | "loader" | "inner" | "section" | "label";

export const Button = coreCompute<CProps, CSlots, HTMLButtonElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    defaultProps: {
      size: "md",
      variant: "filled",
    },
    vars({ size, color, variant, radius }) {
      const colors = getColorVariant(color || "primary", variant || "filled");

      return {
        root: {
          "--button-height": getSize(size, "button-height"),
          "--button-padding-x": getSize(size, "button-padding-x"),
          "--button-fz": getFontSize(size),
          "--button-radius":
            radius === undefined ? undefined : getRadius(radius),
        },
      };
    },
    mods: ({ disabled, loading, fullWidth, leftSection, rightSection }) => {
      return {
        root: {
          "data-disabled": disabled || disabled,
          "data-loading": loading,
          "data-full-width": fullWidth,
          "data-with-left-section": leftSection,
          "data-with-right-section": rightSection,
        },
      };
    },
  },
  (props, slot) => {
    return (
      <button {...slot.root} disabled={props.disabled || props.loading}>
        <span {...slot.loader}>
          <LoaderIcon width={24} height={24} strokeWidth={2} />
        </span>

        <span {...slot.inner}>
          {props.leftSection && (
            <span {...slot.section}>{props.leftSection}</span>
          )}
          <span {...slot.label}>{props.children}</span>
          {props.rightSection && (
            <span {...slot.section}>{props.rightSection}</span>
          )}
        </span>
      </button>
    );
  },
);
