import type { Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getSpacing } from "../../utils/get-size";
import classes from "./Group.module.css";

interface CProps {
  children?: React.ReactNode;
  gap?: Token;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  wrap?: React.CSSProperties["flexWrap"];
  grow?: boolean;
}

type CSlots = "root";

export const Group = coreCompute<CProps, CSlots, HTMLDivElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    defaultProps: {
      gap: "sm",
      align: "center",
      justify: "flex-start",
      wrap: "wrap",
      grow: false,
    },
    vars: ({ gap, align, justify, wrap }) => {
      return {
        root: {
          "--group-gap": getSpacing(gap),
          "--group-align": align,
          "--group-justify": justify,
          "--group-wrap": wrap,
        },
      };
    },
    mods: ({ grow }) => {
      return {
        root: {
          "data-grow": grow,
        },
      };
    },
  },
  (props, slot) => {
    return <div {...slot.root}>{props.children}</div>;
  },
);
