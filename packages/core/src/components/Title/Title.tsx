import { coreCompute } from "../../utils/compute/core";
import classes from "./Title.module.css";

type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface CProps {
  children?: React.ReactNode;
  order?: TitleOrder;
}

type CSlots = "root";

const ORDER_TO_TAG: Record<TitleOrder, HeadingTag> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

export const Title = coreCompute<CProps, CSlots, HTMLHeadingElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    defaultProps: {
      order: 1,
    },
    vars: ({ order = 1 }) => {
      return {
        root: {
          "--title-fz": `var(--lorewave-h${order}-font-size)`,
          "--title-lh": `var(--lorewave-h${order}-line-height)`,
          "--title-fw": `var(--lorewave-h${order}-font-weight)`,
        },
      };
    },
  },
  (props, slot) => {
    const order = props.order ?? 1;
    const Tag = ORDER_TO_TAG[order];

    return <Tag {...slot.root}>{props.children}</Tag>;
  },
);
