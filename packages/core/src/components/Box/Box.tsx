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
    return <div {...slot.root}>{props.children}</div>;
  },
);
