import React from "react";
import { coreCompute } from "../../utils/compute/core";
import { getFontSize, getRadius, getSize } from "../../utils/get-size";
import classes from "./TextArea.module.css";

type TextAreaOnChange = (
  value: string,
  event: React.ChangeEvent<HTMLTextAreaElement>,
) => void;

interface CProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange" | "value" | "defaultValue"
> {
  readonly?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: TextAreaOnChange;
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

export const TextArea = coreCompute<CProps, CSlots, HTMLTextAreaElement>(
  {
    classes,
    nativeSlot: "input",
    styleSlot: "root",
    omitProps: ["radius", "fz"],
    omitHTMLProps: ["onChange"],
    vars({ radius }) {
      return {
        root: {
          "--text-area-min-height": getSize("sm", "button-height"),
          "--text-area-padding-x": getSize("sm", "button-padding-x"),
          "--text-area-fz": getFontSize("sm"),
          "--text-area-radius":
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

          <textarea
            {...slot.input}
            id={inputId}
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
      </div>
    );
  },
);