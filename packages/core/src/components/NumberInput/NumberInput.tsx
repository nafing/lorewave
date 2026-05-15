import React from "react";
import type { Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getFontSize, getRadius, getSize } from "../../utils/get-size";
import classes from "./NumberInput.module.css";

type NumberInputOnChange = (
  value: number,
  event: React.ChangeEvent<HTMLInputElement>,
) => void;

interface CProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "onChange" | "value" | "defaultValue"
  > {
  readonly?: boolean;
  size?: Token;
  value?: number;
  defaultValue?: number;
  onChange?: NumberInputOnChange;
  error?: boolean | string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

type CSlots =
  | "root"
  | "label"
  | "wrapper"
  | "input"
  | "leftSection"
  | "rightSection"
  | "description"
  | "error";

export const NumberInput = coreCompute<CProps, CSlots, HTMLInputElement>(
  {
    classes,
    nativeSlot: "input",
    styleSlot: "root",
    omitProps: ["radius", "fz"],
    omitHTMLProps: ["onChange"],
    defaultProps: {
      size: "sm",
    },
    vars({ size, radius }) {
      return {
        root: {
          "--number-input-height": getSize(size, "button-height"),
          "--number-input-padding-x": getSize(size, "button-padding-x"),
          "--number-input-fz": getFontSize(size),
          "--number-input-radius":
            radius === undefined ? undefined : getRadius(radius),
        },
      };
    },
    mods: ({
      disabled,
      error,
      readonly,
      readOnly,
      leftSection,
      rightSection,
    }) => {
      return {
        root: {
          "data-disabled": disabled,
          "data-error": !!error,
          "data-readonly": readonly || readOnly,
        },
        wrapper: {
          "data-with-left-section": !!leftSection,
          "data-with-right-section": !!rightSection,
        },
      };
    },
  },
  (props, slot) => {
    const inputId = props.id ?? React.useId();
    const labelId = props.label ? `${inputId}-label` : undefined;
    const descriptionId = props.description
      ? `${inputId}-description`
      : undefined;
    const ariaLabel =
      props["aria-label"] ??
      (!props.label &&
      !props["aria-labelledby"] &&
      typeof props.placeholder === "string"
        ? props.placeholder
        : undefined);

    return (
      <div {...slot.root}>
        {props.label && (
          <label {...slot.label} id={labelId} htmlFor={inputId}>
            {props.label}
          </label>
        )}
        {props.description && (
          <div {...slot.description} id={descriptionId}>
            {props.description}
          </div>
        )}
        <div {...slot.wrapper}>
          {props.leftSection && (
            <div {...slot.leftSection}>{props.leftSection}</div>
          )}
          <input
            {...slot.input}
            id={inputId}
            type="number"
            name={props.name}
            min={props.min}
            max={props.max}
            step={props.step}
            placeholder={props.placeholder}
            value={props.value}
            defaultValue={props.defaultValue}
            disabled={props.disabled}
            readOnly={props.readOnly || props.readonly}
            aria-invalid={props["aria-invalid"] ?? !!props.error}
            aria-label={ariaLabel}
            aria-labelledby={props.label ? labelId : props["aria-labelledby"]}
            aria-describedby={
              props.description ? descriptionId : props["aria-describedby"]
            }
            onChange={(event) => {
              props.onChange?.(event.currentTarget.valueAsNumber, event);
            }}
          />

          {props.rightSection && (
            <div {...slot.rightSection}>{props.rightSection}</div>
          )}
        </div>

        {props.error && typeof props.error === "string" && (
          <div {...slot.error}>{props.error}</div>
        )}
      </div>
    );
  },
);
