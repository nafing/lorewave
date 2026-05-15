import type { Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getFontSize, getRadius, getSize } from "../../utils/get-size";
import classes from "./TextInput.module.css";

interface CProps {
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  size?: Token;
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
    nativeSlot: "root",
    styleSlot: "wrapper",
    omitProps: ["radius", "fz"],
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
    mods: ({ disabled, error, readonly, leftSection, rightSection }) => {
      return {
        root: {
          "data-disabled": disabled,
          "data-error": !!error,
          "data-readonly": readonly,
        },
        wrapper: {
          "data-with-left-section": !!leftSection,
          "data-with-right-section": !!rightSection,
        },
      };
    },
  },
  (props, slot) => {
    return (
      <div {...slot.root}>
        {props.label && <label {...slot.label}>{props.label}</label>}
        {props.description && (
          <div {...slot.description}>{props.description}</div>
        )}
        <div {...slot.wrapper}>
          {props.leftSection && (
            <div {...slot.leftSection}>{props.leftSection}</div>
          )}
          <input
            {...slot.input}
            type="text"
            placeholder={props.placeholder}
            disabled={props.disabled}
            readOnly={props.readonly}
            aria-invalid={!!props.error}
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
