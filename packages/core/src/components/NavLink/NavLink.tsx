import React from "react";
import { coreCompute } from "../../utils/compute/core";
import { getFontSize, getRadius } from "../../utils/get-size";
import classes from "./NavLink.module.css";

interface CProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "color"
> {
  active?: boolean;
  disabled?: boolean;
  description?: React.ReactNode;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

type CSlots =
  | "root"
  | "leftSection"
  | "rightSection"
  | "body"
  | "label"
  | "description";

export const NavLink = coreCompute<CProps, CSlots, HTMLAnchorElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    omitProps: ["radius", "fz", "color"],
    omitHTMLProps: ["disabled"],
    vars({ radius }) {
      return {
        root: {
          "--nav-link-fz": getFontSize("sm"),
          "--nav-link-radius":
            radius === undefined ? undefined : getRadius(radius),
        },
      };
    },
    mods: ({ active, disabled, leftSection, rightSection, description }) => {
      return {
        root: {
          "data-active": active,
          "data-disabled": disabled,
          "data-with-description": !!description,
          "data-with-left-section": !!leftSection,
          "data-with-right-section": !!rightSection,
        },
      };
    },
  },
  (props, slot) => {
    const rootProps = slot.root as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    const { onClick, tabIndex, ...restRootProps } = rootProps;

    return (
      <a
        {...restRootProps}
        href={props.href}
        target={props.target}
        rel={props.rel}
        download={props.download}
        hrefLang={props.hrefLang}
        ping={props.ping}
        referrerPolicy={props.referrerPolicy}
        aria-current={props.active ? "page" : restRootProps["aria-current"]}
        aria-disabled={props.disabled || undefined}
        tabIndex={props.disabled ? -1 : tabIndex}
        onClick={(event) => {
          if (props.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }

          onClick?.(event);
        }}
      >
        {props.leftSection && (
          <span {...slot.leftSection}>{props.leftSection}</span>
        )}

        <span {...slot.body}>
          <span {...slot.label}>{props.children}</span>
          {props.description && (
            <span {...slot.description}>{props.description}</span>
          )}
        </span>

        {props.rightSection && (
          <span {...slot.rightSection}>{props.rightSection}</span>
        )}
      </a>
    );
  },
);