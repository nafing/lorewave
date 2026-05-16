import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import React from "react";
import { Portal } from "../Portal/Portal";
import type { Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getFontSize, getRadius } from "../../utils/get-size";
import classes from "./Popover.module.css";

type PopoverPosition = "top" | "right" | "bottom" | "left";

interface CProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  children: React.ReactNode;
  dropdown: React.ReactNode;
  size?: Token;
  position?: PopoverPosition;
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenChange?: (opened: boolean) => void;
  offset?: number;
  width?: number | string;
  disabled?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  withinPortal?: boolean;
  portalTarget?: HTMLElement | string;
  portalReuseTargetNode?: boolean;
  portalId?: string;
}

type CSlots = "root" | "dropdown";

export const Popover = coreCompute<CProps, CSlots, HTMLDivElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    omitProps: ["radius", "fz"],
    defaultProps: {
      size: "sm",
      position: "bottom",
      offset: 8,
      closeOnClickOutside: true,
      closeOnEscape: true,
      trapFocus: false,
      withinPortal: true,
      width: 260,
    },
    vars: ({ size, radius, width }) => {
      return {
        dropdown: {
          "--popover-fz": getFontSize(size),
          "--popover-radius": radius === undefined ? undefined : getRadius(radius),
          "--popover-width": typeof width === "number" ? `${width}px` : width,
        },
      };
    },
    mods: ({ disabled }) => {
      return {
        root: {
          "data-disabled": disabled,
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

    const click = useClick(context, {
      enabled: !props.disabled,
      event: "click",
      toggle: true,
      keyboardHandlers: true,
    });

    const dismiss = useDismiss(context, {
      enabled: !props.disabled,
      outsidePress: props.closeOnClickOutside,
      escapeKey: props.closeOnEscape,
    });

    const role = useRole(context, { role: "dialog" });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
      role,
    ]);

    const rootProps = slot.root as React.HTMLAttributes<HTMLDivElement>;
    const dropdownProps = slot.dropdown as React.HTMLAttributes<HTMLDivElement>;
    const Root = (props.component ?? "div") as React.ElementType;

    const dropdownNode = open ? (
      <FloatingFocusManager
        context={context}
        modal={!!props.trapFocus}
        initialFocus={props.trapFocus ? 0 : -1}
      >
        <div
          {...dropdownProps}
          {...getFloatingProps()}
          ref={refs.setFloating}
          style={{
            ...(dropdownProps.style ?? {}),
            ...floatingStyles,
          }}
        >
          {props.dropdown}
        </div>
      </FloatingFocusManager>
    ) : null;

    return (
      <>
        <Root
          {...rootProps}
          {...getReferenceProps()}
          ref={refs.setReference}
          aria-haspopup="dialog"
          aria-expanded={open}
          data-open={open || undefined}
        >
          {props.children}
        </Root>

        {props.withinPortal ? (
          <Portal
            withinPortal={!!props.withinPortal && open}
            target={props.portalTarget}
            reuseTargetNode={props.portalReuseTargetNode}
            id={props.portalId}
          >
            {dropdownNode}
          </Portal>
        ) : (
          dropdownNode
        )}
      </>
    );
  },
);
