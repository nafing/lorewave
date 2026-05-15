import React from "react";
import type { Colors, Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getColor } from "../../utils/get-color";
import { getFontSize, getRadius, getSize } from "../../utils/get-size";
import classes from "./Checkbox.module.css";

type CheckboxOnChange = (
  checked: boolean,
  event: React.ChangeEvent<HTMLInputElement>,
) => void;

interface CProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "onChange" | "color"
> {
  size?: Token;
  color?: Colors | React.CSSProperties["color"];
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: boolean | string;
  readonly?: boolean;
  indeterminate?: boolean;
  onChange?: CheckboxOnChange;
}

type CSlots =
  | "root"
  | "body"
  | "input"
  | "indicator"
  | "icon"
  | "content"
  | "label"
  | "description"
  | "error";

export const Checkbox = coreCompute<CProps, CSlots, HTMLInputElement>(
  {
    classes,
    nativeSlot: "input",
    styleSlot: "root",
    omitProps: ["radius", "fz", "color"],
    omitHTMLProps: ["onChange"],
    defaultProps: {
      size: "sm",
      color: "primary",
    },
    vars: ({ size, radius, color }) => {
      return {
        root: {
          "--checkbox-size": getSize(size, "button-height"),
          "--checkbox-fz": getFontSize(size),
          "--checkbox-radius":
            radius === undefined ? undefined : getRadius(radius),
          "--checkbox-color": getColor(color || "primary"),
        },
      };
    },
    mods: ({ disabled, error, readonly, readOnly }) => {
      return {
        root: {
          "data-disabled": disabled,
          "data-error": !!error,
          "data-readonly": readonly || readOnly,
        },
      };
    },
  },
  (props, slot) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const isReadOnly = props.readonly || props.readOnly;
    const hasMeta =
      !!props.label ||
      !!props.description ||
      (typeof props.error === "string" && props.error.length > 0);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!props.indeterminate;
      }
    }, [props.indeterminate]);

    return (
      <div {...slot.root}>
        <label {...slot.body}>
          <input
            {...slot.input}
            ref={inputRef}
            type="checkbox"
            disabled={props.disabled}
            checked={props.checked}
            defaultChecked={props.defaultChecked}
            readOnly={isReadOnly}
            aria-invalid={props["aria-invalid"] ?? !!props.error}
            data-indeterminate={props.indeterminate || undefined}
            onClick={(event) => {
              if (isReadOnly) {
                event.preventDefault();
              }

              props.onClick?.(event);
            }}
            onChange={(event) => {
              if (isReadOnly) {
                return;
              }

              props.onChange?.(event.currentTarget.checked, event);
            }}
          />

          <span {...slot.indicator}>
            <span {...slot.icon} />
          </span>

          {hasMeta && (
            <span {...slot.content}>
              {props.label && <span {...slot.label}>{props.label}</span>}
              {props.description && (
                <span {...slot.description}>{props.description}</span>
              )}
              {typeof props.error === "string" && props.error.length > 0 && (
                <span {...slot.error}>{props.error}</span>
              )}
            </span>
          )}
        </label>
      </div>
    );
  },
);
