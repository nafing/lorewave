import React from "react";
import type { Colors, Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getColor } from "../../utils/get-color";
import { getFontSize, getRadius, getSize } from "../../utils/get-size";
import classes from "./Slider.module.css";

type SliderOnChange = (
  value: number,
  event: React.ChangeEvent<HTMLInputElement>,
) => void;

interface CProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "onChange" | "value" | "defaultValue" | "color"
  > {
  readonly?: boolean;
  size?: Token;
  color?: Colors | React.CSSProperties["color"];
  value?: number;
  defaultValue?: number;
  onChange?: SliderOnChange;
  error?: boolean | string;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

type CSlots =
  | "root"
  | "label"
  | "description"
  | "wrapper"
  | "input"
  | "error";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const toFiniteNumber = (value: unknown, fallback: number) => {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const Slider = coreCompute<CProps, CSlots, HTMLInputElement>(
  {
    classes,
    nativeSlot: "input",
    styleSlot: "root",
    omitProps: ["radius", "fz", "color"],
    omitHTMLProps: ["onChange"],
    defaultProps: {
      size: "sm",
      color: "primary",
      min: 0,
      max: 100,
      step: 1,
    },
    vars: ({ size, radius, color }) => {
      return {
        root: {
          "--slider-size": getSize(size, "button-height"),
          "--slider-fz": getFontSize(size),
          "--slider-radius": radius === undefined ? undefined : getRadius(radius),
          "--slider-color": getColor(color || "primary"),
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
        wrapper: {
          "data-disabled": disabled,
          "data-error": !!error,
          "data-readonly": readonly || readOnly,
        },
      };
    },
  },
  (props, slot) => {
    const isReadOnly = props.readonly || props.readOnly;
    const inputId = React.useId();
    const labelId = React.useId();
    const descriptionId = React.useId();
    const min = toFiniteNumber(props.min, 0);
    const maxCandidate = toFiniteNumber(props.max, 100);
    const max = maxCandidate >= min ? maxCandidate : min;

    const initialUncontrolledValue = clamp(
      toFiniteNumber(props.defaultValue, min),
      min,
      max,
    );

    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      initialUncontrolledValue,
    );

    const isControlled = props.value !== undefined;
    const currentValue = isControlled
      ? clamp(toFiniteNumber(props.value, min), min, max)
      : uncontrolledValue;
    const percent = max === min ? 0 : ((currentValue - min) / (max - min)) * 100;

    return (
      <div
        {...slot.root}
        style={{
          ...slot.root.style,
          ["--slider-progress" as string]: `${percent}%`,
        }}
      >
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
          <input
            {...slot.input}
            id={inputId}
            type="range"
            name={props.name}
            min={min}
            max={max}
            step={props.step}
            value={currentValue}
            defaultValue={undefined}
            disabled={props.disabled}
            readOnly={isReadOnly}
            aria-labelledby={props.label ? labelId : props["aria-labelledby"]}
            aria-describedby={
              props.description ? descriptionId : props["aria-describedby"]
            }
            aria-invalid={props["aria-invalid"] ?? !!props.error}
            onMouseDown={(event) => {
              if (isReadOnly) {
                event.preventDefault();
              }

              props.onMouseDown?.(event);
            }}
            onKeyDown={(event) => {
              if (
                isReadOnly &&
                [
                  "ArrowLeft",
                  "ArrowRight",
                  "ArrowUp",
                  "ArrowDown",
                  "Home",
                  "End",
                  "PageUp",
                  "PageDown",
                ].includes(event.key)
              ) {
                event.preventDefault();
              }

              props.onKeyDown?.(event);
            }}
            onChange={(event) => {
              if (isReadOnly) {
                return;
              }

              const nextValue = clamp(event.currentTarget.valueAsNumber, min, max);
              if (!isControlled) {
                setUncontrolledValue(nextValue);
              }

              props.onChange?.(nextValue, event);
            }}
          />
        </div>

        {props.error && typeof props.error === "string" && (
          <div {...slot.error}>{props.error}</div>
        )}
      </div>
    );
  },
);
