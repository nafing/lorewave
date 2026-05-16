import React from "react";
import type { Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getFontSize, getRadius, getSize } from "../../utils/get-size";
import classes from "./TextInput.module.css";

type TextInputOnChange = (
  value: string,
  event: React.ChangeEvent<HTMLInputElement>,
) => void;

interface CProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "value" | "defaultValue"
> {
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  size?: Token;
  value?: string;
  defaultValue?: string;
  onChange?: TextInputOnChange;
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

export const TextInput = coreCompute<CProps, CSlots, HTMLInputElement>(
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
          "--text-input-height": getSize(size, "button-height"),
          "--text-input-padding-x": getSize(size, "button-padding-x"),
          "--text-input-fz": getFontSize(size),
          "--text-input-radius":
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
    const Root = (props.component ?? "div") as React.ElementType;
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
      <Root {...slot.root}>
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
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            defaultValue={props.defaultValue}
            disabled={props.disabled}
            readOnly={props.readonly || props.readOnly}
            aria-invalid={props["aria-invalid"] ?? !!props.error}
            aria-label={ariaLabel}
            aria-labelledby={props.label ? labelId : props["aria-labelledby"]}
            aria-describedby={
              props.description ? descriptionId : props["aria-describedby"]
            }
            onChange={(event) => {
              props.onChange?.(event.currentTarget.value, event);
            }}
          />

          {props.rightSection && (
            <div {...slot.rightSection}>{props.rightSection}</div>
          )}
        </div>

        {props.error && typeof props.error === "string" && (
          <div {...slot.error}>{props.error}</div>
        )}
      </Root>
    );
  },
);
