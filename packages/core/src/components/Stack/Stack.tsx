import type { FullToken } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getSpacing } from "../../utils/get-size";
import classes from "./Stack.module.css";

interface CProps {
  children?: React.ReactNode;
  gap?: FullToken;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
}

type CSlots = "root";

export const Stack = coreCompute<CProps, CSlots, HTMLDivElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    defaultProps: {
      gap: "sm",
      align: "stretch",
      justify: "flex-start",
    },
    vars: ({ gap, align, justify }) => {
      return {
        root: {
          "--stack-gap": getSpacing(gap),
          "--stack-align": align,
          "--stack-justify": justify,
        },
      };
    },
  },
  (props, slot) => {
    return <div {...slot.root}>{props.children}</div>;
  },
);
