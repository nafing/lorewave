import type { FullToken } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getRadius } from "../../utils/get-size";
import classes from "./ActionIcon.module.css";

interface CProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
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
    const GroupRoot = (props.component ?? "div") as React.ElementType;
    return <GroupRoot {...slot.group}>{props.children}</GroupRoot>;
  },
);
