import type { CSSProperties } from "react";
import type { CoreStyleProps } from "../../types/core";
import { getCoreStyle } from "./core-style";
import { HTML_ATTR_KEYS } from "./html_attr_keys";

type FULL_HTML<H extends HTMLElement> = Omit<
  React.DetailedHTMLProps<
    H extends HTMLButtonElement
      ? React.ButtonHTMLAttributes<H>
      : H extends HTMLInputElement
        ? React.InputHTMLAttributes<H>
        : H extends HTMLTextAreaElement
          ? React.TextareaHTMLAttributes<H>
          : H extends HTMLSelectElement
            ? React.SelectHTMLAttributes<H>
            : React.HTMLAttributes<H>,
    H
  >,
  "className" | "style"
>;

type CoreSlotProps<CSlots extends string> = {
  classNames?: Partial<Record<CSlots, string>>;
  styles?: Partial<Record<CSlots, CSSProperties>>;
};

type CorePolymorphicProps = {
  component?: React.ElementType;
};

interface CoreComputeOptions<CProps, CSlots extends string> {
  classes?: CSSModuleClasses;
  nativeSlot: CSlots;
  styleSlot: CSlots;
  defaultProps?: Partial<CProps> & CoreStyleProps & CorePolymorphicProps;
  omitProps?: (keyof CoreStyleProps)[];
  omitHTMLProps?: string[];
  vars?: (
    props: CProps & CoreStyleProps & CorePolymorphicProps,
  ) => Partial<Record<CSlots, Record<string, unknown>>>;
  mods?: (
    props: CProps & CoreStyleProps & CorePolymorphicProps,
  ) => Partial<Record<CSlots, Record<string, unknown>>>;
}

const getHTMLAttributes = (
  props: Record<string, unknown>,
): React.HTMLAttributes<HTMLElement> => {
  return Object.fromEntries(
    Object.entries(props).filter(
      ([key]) =>
        HTML_ATTR_KEYS.has(key as keyof React.HTMLAttributes<HTMLElement>) ||
        key === "style" ||
        key === "className" ||
        key.startsWith("data-"),
    ),
  ) as React.HTMLAttributes<HTMLElement>;
};

export const coreCompute = <CProps, CSlots extends string, CHtml>(
  options: CoreComputeOptions<CProps, CSlots>,
  render: (
    props: CProps & CorePolymorphicProps,
    slot: Record<CSlots, React.HTMLAttributes<HTMLElement>>,
  ) => React.ReactNode,
) => {
  if (!options.nativeSlot) {
    throw new Error("nativeSlot is required in coreCompute options");
  }

  if (!options.styleSlot) {
    throw new Error("styleSlot is required in coreCompute options");
  }

  return (
    props: CProps &
      CoreStyleProps &
      Omit<
        FULL_HTML<CHtml extends HTMLElement ? CHtml : HTMLElement>,
        keyof CProps
      > &
      CoreSlotProps<CSlots> &
      CorePolymorphicProps &
      Record<string, unknown>,
  ) => {
    const mergedProps = { ...options.defaultProps, ...props };

    const vars = (options.vars?.(mergedProps) ?? {}) as Partial<
      Record<string, Record<string, unknown>>
    >;

    const mods = (options.mods?.(mergedProps) ?? {}) as Partial<
      Record<string, Record<string, unknown>>
    >;

    const allSlots = new Set<string>([
      ...Object.keys(options.classes ?? {}),
      options.nativeSlot,
      options.styleSlot,
      ...Object.keys(vars),
      ...Object.keys(mods),
    ]);

    const slotMap: Record<string, unknown> = {};

    for (const slot of allSlots) {
      const s = slot as CSlots;
      const slotObj: Record<string, unknown> = {};

      if (slot === options.nativeSlot) {
        const nativeProps = mergedProps as Record<string, unknown>;
        const filteredNativeProps =
          options.omitHTMLProps && options.omitHTMLProps.length > 0
            ? Object.fromEntries(
                Object.entries(nativeProps).filter(
                  ([key]) => !options.omitHTMLProps!.includes(key),
                ),
              )
            : nativeProps;

        Object.assign(
          slotObj,
          getHTMLAttributes(filteredNativeProps),
        );
      }

      const className = [options.classes?.[slot], mergedProps.classNames?.[s]]
        .filter(Boolean)
        .join(" ");
      if (className) slotObj.className = className;

      const stylePropsForSlot: CoreStyleProps =
        slot === options.styleSlot && options.omitProps?.length
          ? (Object.fromEntries(
              Object.entries(mergedProps).filter(
                ([key]) =>
                  !options.omitProps!.includes(key as keyof CoreStyleProps),
              ),
            ) as CoreStyleProps)
          : mergedProps;

      const style: CSSProperties = {
        ...(slot === options.styleSlot ? getCoreStyle(stylePropsForSlot) : {}),
        ...(vars[slot] ?? {}),
        ...(mergedProps.styles?.[s] ?? {}),
      };
      if (Object.keys(style).length > 0) slotObj.style = style;

      const slotMods = mods[slot];
      if (slotMods) {
        for (const [k, v] of Object.entries(slotMods)) {
          slotObj[k] = v !== false && v !== undefined ? v : undefined;
        }
      }

      slotMap[slot] = slotObj as React.HTMLAttributes<HTMLElement>;
    }

    return render(
      mergedProps,
      slotMap as Record<
        typeof options.nativeSlot,
        React.HTMLAttributes<HTMLElement>
      >,
    );
  };
};
