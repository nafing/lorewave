import type { FullToken } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getRadius } from "../../utils/get-size";
import classes from "./ActionIcon.module.css";

interface CProps {
  children?: React.ReactNode;
  radius?: FullToken;
}

type CSlots = "group";

export const ActionIconGroup = coreCompute<CProps, CSlots, HTMLDivElement>(
  {
    classes: {
      group: classes.group,
    },
    nativeSlot: "group",
    styleSlot: "group",
    vars: ({ radius }) => {
      return {
        group: {
          "--action-icon-group-radius": getRadius(radius),
        },
      };
    },
  },
  (props, slot) => {
    return <div {...slot.group}>{props.children}</div>;
  },
);
