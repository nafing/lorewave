import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import React from "react";
import { Portal } from "../Portal/Portal";
import type { Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getFontSize, getRadius } from "../../utils/get-size";
import classes from "./Tooltip.module.css";

type TooltipPosition = "top" | "right" | "bottom" | "left";

interface CProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  children: React.ReactNode;
  label: React.ReactNode;
  size?: Token;
  position?: TooltipPosition;
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenChange?: (opened: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  offset?: number;
  disabled?: boolean;
  multiline?: boolean;
  maxWidth?: number | string;
  withinPortal?: boolean;
  portalTarget?: HTMLElement | string;
  portalReuseTargetNode?: boolean;
  portalId?: string;
}

type CSlots = "root" | "tooltip";

export const Tooltip = coreCompute<CProps, CSlots, HTMLSpanElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    omitProps: ["radius", "fz"],
    defaultProps: {
      size: "sm",
      position: "top",
      openDelay: 120,
      closeDelay: 0,
      offset: 8,
      withinPortal: true,
      multiline: false,
      maxWidth: 240,
    },
    vars: ({ size, radius, maxWidth }) => {
      return {
        tooltip: {
          "--tooltip-fz": getFontSize(size),
          "--tooltip-radius": radius === undefined ? undefined : getRadius(radius),
          "--tooltip-max-width":
            typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        },
      };
    },
    mods: ({ disabled, multiline }) => {
      return {
        root: {
          "data-disabled": disabled,
        },
        tooltip: {
          "data-multiline": multiline,
        },
      };
    },
  },
  (props, slot) => {
    const isControlled = props.opened !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>(
      !!props.defaultOpened,
    );

    const rawOpen = isControlled ? !!props.opened : uncontrolledOpen;
    const open = !props.disabled && rawOpen;

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(nextOpen);
        }

        props.onOpenChange?.(nextOpen);
      },
      [isControlled, props],
    );

    React.useEffect(() => {
      if (props.disabled && rawOpen) {
        handleOpenChange(false);
      }
    }, [handleOpenChange, props.disabled, rawOpen]);

    const { refs, floatingStyles, context } = useFloating({
      open,
      onOpenChange: handleOpenChange,
      whileElementsMounted: autoUpdate,
      placement: props.position,
      middleware: [offset(props.offset), flip(), shift({ padding: 8 })],
    });

    const hover = useHover(context, {
      enabled: !props.disabled,
      move: false,
      delay: {
        open: props.openDelay,
        close: props.closeDelay,
      },
    });
    const focus = useFocus(context, { enabled: !props.disabled });
    const dismiss = useDismiss(context, { enabled: !props.disabled });
    const role = useRole(context, { role: "tooltip" });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      focus,
      dismiss,
      role,
    ]);

    const rootProps = slot.root as React.HTMLAttributes<HTMLSpanElement>;
    const tooltipProps = slot.tooltip as React.HTMLAttributes<HTMLDivElement>;

    const tooltipNode = open ? (
      <div
        {...tooltipProps}
        {...getFloatingProps()}
        ref={refs.setFloating}
        style={{
          ...(tooltipProps.style ?? {}),
          ...floatingStyles,
        }}
      >
        {props.label}
      </div>
    ) : null;

    return (
      <>
        <span
          {...rootProps}
          {...getReferenceProps()}
          ref={refs.setReference}
        >
          {props.children}
        </span>

        {props.withinPortal ? (
          <Portal
            withinPortal={!!props.withinPortal && open}
            target={props.portalTarget}
            reuseTargetNode={props.portalReuseTargetNode}
            id={props.portalId}
          >
            {tooltipNode}
          </Portal>
        ) : (
          tooltipNode
        )}
      </>
    );
  },
);
