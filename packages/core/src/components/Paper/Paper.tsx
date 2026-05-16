import type { Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getShadow } from "../../utils/get-size";
import classes from "./Paper.module.css";

interface CProps {
  children: React.ReactNode;
  shadow?: Token;
  withBorder?: boolean;
}

type CSlots = "root";

export const Paper = coreCompute<CProps, CSlots, HTMLDivElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    defaultProps: {
      withBorder: false,
      radius: "sm",
    },
    vars: ({ shadow }) => {
      return {
        root: {
          "--paper-shadow": getShadow(shadow),
        },
      };
    },
    mods: (props) => {
      return {
        root: {
          "data-with-border": props.withBorder,
        },
      };
    },
  },
  (props, slot) => {
    const Root = (props.component ?? "div") as React.ElementType;
    return <Root {...slot.root}>{props.children}</Root>;
  },
);
