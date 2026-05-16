import type { Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import {
  getFontSize,
  getLineHeight,
  getRadius,
  getSize,
} from "../../utils/get-size";
import classes from "./Code.module.css";

interface CProps extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  children?: React.ReactNode;
  block?: boolean;
  size?: Token;
}

type CSlots = "pre" | "code";

export const Code = coreCompute<CProps, CSlots, HTMLElement>(
  {
    classes,
    nativeSlot: "pre",
    styleSlot: "pre",
    omitProps: ["radius", "fz"],
    defaultProps: {
      size: "sm",
      block: false,
    },
    vars: ({ size, radius }) => {
      return {
        pre: {
          "--code-fz": getFontSize(size),
          "--code-lh": getLineHeight(size),
          "--code-radius": radius === undefined ? undefined : getRadius(radius),
          "--code-padding-x": getSize(size, "button-padding-x"),
        },
      };
    },
    mods: ({ block }) => {
      return {
        pre: {
          "data-block": block,
        },
      };
    },
  },
  (props, slot) => {
    return (
      <pre {...slot.pre}>
        <code {...slot.code}>{props.children}</code>
      </pre>
    );
  },
);
