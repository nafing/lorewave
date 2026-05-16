import type { Colors } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getColor } from "../../utils/get-color";
import { rem } from "../../utils/rem";
import classes from "./Divider.module.css";

type DividerOrientation = "horizontal" | "vertical";
type DividerLabelPosition = "left" | "center" | "right";
type DividerVariant = "solid" | "dashed" | "dotted";

interface CProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  label?: React.ReactNode;
  orientation?: DividerOrientation;
  labelPosition?: DividerLabelPosition;
  variant?: DividerVariant;
  color?: Colors | React.CSSProperties["color"];
  size?: number | string;
}

type CSlots = "root" | "line" | "label";

export const Divider = coreCompute<CProps, CSlots, HTMLDivElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    omitProps: ["color"],
    defaultProps: {
      orientation: "horizontal",
      labelPosition: "center",
      variant: "solid",
      color: "border",
      size: 1,
    },
    vars: ({ color, size }) => {
      return {
        root: {
          "--divider-color": getColor(color || "border"),
          "--divider-size": typeof size === "number" ? rem(size) : size,
        },
      };
    },
    mods: ({ orientation, label, labelPosition, variant }) => {
      const hasLabel =
        label !== undefined && label !== null && !(typeof label === "string" && label === "");

      return {
        root: {
          "data-orientation": orientation,
          "data-with-label": orientation === "horizontal" && hasLabel,
          "data-label-position": labelPosition,
          "data-variant": variant,
        },
      };
    },
  },
  (props, slot) => {
    const Root = (props.component ?? "div") as React.ElementType;
    const root = slot.root as React.HTMLAttributes<HTMLDivElement>;
    const line = slot.line as React.HTMLAttributes<HTMLDivElement>;
    const label = slot.label as React.HTMLAttributes<HTMLSpanElement>;
    const orientation = props.orientation || "horizontal";
    const hasLabel =
      orientation === "horizontal" &&
      props.label !== undefined &&
      props.label !== null &&
      !(typeof props.label === "string" && props.label === "");

    return (
      <Root
        {...root}
        role={root.role ?? "separator"}
        aria-orientation={orientation}
      >
        {hasLabel ? (
          <>
            <div {...line} data-side="start" />
            <span {...label}>{props.label}</span>
            <div {...line} data-side="end" />
          </>
        ) : (
          <div {...line} data-side="single" />
        )}
      </Root>
    );
  },
);
