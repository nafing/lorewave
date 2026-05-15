import LoaderIcon from "../../icons/LoaderIcon";
import type { Token, Variant } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getColorVariant } from "../../utils/get-color-variant";
import { getRadius, getSize } from "../../utils/get-size";
import { ActionIconGroup } from "./ActionIconGroup";
import classes from "./ActionIcon.module.css";

interface CProps {
  children: React.ReactNode;
  size?: Token;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
}

type CSlots = "root" | "loader" | "inner";

const ActionIconRoot = coreCompute<CProps, CSlots, HTMLButtonElement>(
  {
    classes: {
      root: classes.root,
      loader: classes.loader,
      inner: classes.inner,
    },
    nativeSlot: "root",
    styleSlot: "root",
    omitProps: ["color", "radius"],
    defaultProps: {
      size: "sm",
      variant: "filled",
    },
    vars({ size, color, variant, radius }) {
      const colors = getColorVariant(color || "primary", variant || "filled");

      return {
        root: {
          "--action-icon-size": getSize(size, "button-height"),
          "--action-icon-radius":
            radius === undefined ? undefined : getRadius(radius),
          "--action-icon-color": colors.color,
          "--action-icon-hover-color": colors.hoverColor,
          "--action-icon-bg": colors.background,
          "--action-icon-hover-bg": colors.hoverBackground,
          "--action-icon-border": colors.border,
          "--action-icon-hover-border": colors.hoverBorder,
        },
      };
    },
    mods: ({ disabled, loading }) => {
      return {
        root: {
          "data-disabled": disabled || loading,
          "data-loading": loading,
        },
      };
    },
  },
  (props, slot) => {
    const rootProps =
      slot.root as React.ButtonHTMLAttributes<HTMLButtonElement>;
    const { type = "button", ...restRootProps } = rootProps;

    return (
      <button
        {...restRootProps}
        type={type}
        aria-busy={props.loading}
        disabled={props.disabled || props.loading}
      >
        <span {...slot.loader}>
          <LoaderIcon width={18} height={18} strokeWidth={2} />
        </span>

        <span {...slot.inner}>{props.children}</span>
      </button>
    );
  },
);

export const ActionIcon = Object.assign(ActionIconRoot, {
  Group: ActionIconGroup,
});
