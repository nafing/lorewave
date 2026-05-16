import type { Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getFontSize, getLineHeight } from "../../utils/get-size";
import classes from "./Text.module.css";

interface CProps {
  children?: React.ReactNode;
  size?: Token;
  span?: boolean;
  inherit?: boolean;
  lineClamp?: number;
}

type CSlots = "root";

export const Text = coreCompute<CProps, CSlots, HTMLParagraphElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    defaultProps: {
      size: "md",
      span: false,
      inherit: false,
    },
    vars: ({ size, lineClamp }) => {
      return {
        root: {
          "--text-fz": getFontSize(size),
          "--text-lh": getLineHeight(size),
          "--text-line-clamp": lineClamp,
        },
      };
    },
    mods: ({ span, inherit, lineClamp }) => {
      return {
        root: {
          "data-inline": span,
          "data-inherit": inherit,
          "data-line-clamp":
            typeof lineClamp === "number" && Number.isFinite(lineClamp) && lineClamp > 0,
        },
      };
    },
  },
  (props, slot) => {
    const defaultTag = props.span ? "span" : "p";
    const Root = (props.component ?? defaultTag) as React.ElementType;
    return <Root {...slot.root}>{props.children}</Root>;
  },
);
