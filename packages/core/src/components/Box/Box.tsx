import { coreCompute } from "../../utils/compute/core";

interface CProps {
  children?: React.ReactNode;
}

type CSlots = "root";

export const Box = coreCompute<CProps, CSlots, HTMLDivElement>(
  {
    nativeSlot: "root",
    styleSlot: "root",
  },
  (props, slot) => {
    const Root = (props.component ?? "div") as React.ElementType;
    return <Root {...slot.root}>{props.children}</Root>;
  },
);
