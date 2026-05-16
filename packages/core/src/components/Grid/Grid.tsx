import type { FullToken } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getSpacing } from "../../utils/get-size";
import classes from "./Grid.module.css";

type GridBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";

interface GridColBreakpointConfig {
  span?: number;
  offset?: number;
  order?: React.CSSProperties["order"];
}

type GridColBreakpoints = Partial<
  Record<GridBreakpoint, number | GridColBreakpointConfig>
>;

interface GridProps {
  children?: React.ReactNode;
  cols?: number;
  gutter?: FullToken;
  gutterX?: FullToken;
  gutterY?: FullToken;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
}

interface GridColProps {
  children?: React.ReactNode;
  span?: number;
  offset?: number;
  order?: React.CSSProperties["order"];
  breakpoints?: GridColBreakpoints;
}

type GridSlots = "root";
type GridColSlots = "col";

const GridRoot = coreCompute<GridProps, GridSlots, HTMLDivElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    defaultProps: {
      cols: 12,
      gutter: "md",
      align: "stretch",
      justify: "flex-start",
    },
    vars: ({ cols, gutter, gutterX, gutterY, align, justify }) => {
      return {
        root: {
          "--grid-columns": cols,
          "--grid-gutter-x": getSpacing(gutterX ?? gutter),
          "--grid-gutter-y": getSpacing(gutterY ?? gutter),
          "--grid-align": align,
          "--grid-justify": justify,
        },
      };
    },
  },
  (props, slot) => {
    const Root = (props.component ?? "div") as React.ElementType;
    return <Root {...slot.root}>{props.children}</Root>;
  },
);

const BREAKPOINT_KEYS: GridBreakpoint[] = ["xs", "sm", "md", "lg", "xl"];

const GridCol = coreCompute<GridColProps, GridColSlots, HTMLDivElement>(
  {
    classes,
    nativeSlot: "col",
    styleSlot: "col",
    vars: ({ span, offset, order, breakpoints }) => {
      const colVars: Record<string, unknown> = {
        "--grid-col-span-base": span,
        "--grid-col-offset-base": offset,
        "--grid-col-order-base": order,
      };

      for (const key of BREAKPOINT_KEYS) {
        const value = breakpoints?.[key];

        if (value === undefined) {
          continue;
        }

        if (typeof value === "number") {
          colVars[`--grid-col-span-${key}`] = value;
          continue;
        }

        if (value.span !== undefined) {
          colVars[`--grid-col-span-${key}`] = value.span;
        }

        if (value.offset !== undefined) {
          colVars[`--grid-col-offset-${key}`] = value.offset;
        }

        if (value.order !== undefined) {
          colVars[`--grid-col-order-${key}`] = value.order;
        }
      }

      return {
        col: colVars,
      };
    },
  },
  (props, slot) => {
    const Col = (props.component ?? "div") as React.ElementType;
    return <Col {...slot.col}>{props.children}</Col>;
  },
);

export const Grid = Object.assign(GridRoot, {
  Col: GridCol,
});
