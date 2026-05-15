import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  offset,
  shift,
  size as floatingSize,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import React from "react";
import type { Token } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getFontSize, getRadius, getSize } from "../../utils/get-size";
import classes from "./Select.module.css";

export interface SelectOption {
  label: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}

type SelectOnChange = (
  value: string,
  event: React.ChangeEvent<HTMLSelectElement>,
) => void;

interface CProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size" | "onChange" | "value" | "defaultValue" | "multiple"
> {
  placeholder?: string;
  size?: Token;
  value?: string;
  defaultValue?: string;
  onChange?: SelectOnChange;
  data?: SelectOption[];
  searchable?: boolean;
  searchPlaceholder?: string;
  searchDebounce?: number;
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
  | "trigger"
  | "native"
  | "dropdown"
  | "option"
  | "optionIcon"
  | "optionMain"
  | "optionLabel"
  | "optionHighlight"
  | "optionDescription"
  | "leftSection"
  | "rightSection"
  | "chevron"
  | "description"
  | "error"
  | "empty";

const getOptionText = (value: React.ReactNode): string => {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return "";
};

const DEFAULT_SEARCH_DEBOUNCE = 150;

const escapeRegExp = (value: string): string => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const renderHighlightedText = (
  value: React.ReactNode,
  query: string,
  markProps: React.HTMLAttributes<HTMLElement>,
): React.ReactNode => {
  if (typeof value !== "string" && typeof value !== "number") {
    return value;
  }

  const text = String(value);
  const normalizedQuery = query.trim();
  if (normalizedQuery === "") {
    return text;
  }

  const matcher = new RegExp(`(${escapeRegExp(normalizedQuery)})`, "ig");
  const parts = text.split(matcher);
  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => {
    if (part.toLowerCase() === normalizedQuery.toLowerCase()) {
      return (
        <mark {...markProps} key={`${part}-${index}`}>
          {part}
        </mark>
      );
    }

    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
};

export const Select = coreCompute<CProps, CSlots, HTMLInputElement>(
  {
    classes,
    nativeSlot: "trigger",
    styleSlot: "root",
    omitProps: ["radius", "fz"],
    omitHTMLProps: [
      "onChange",
      "value",
      "defaultValue",
      "name",
      "required",
      "form",
      "placeholder",
    ],
    defaultProps: {
      size: "sm",
    },
    vars({ size, radius }) {
      return {
        root: {
          "--select-height": getSize(size, "button-height"),
          "--select-padding-x": getSize(size, "button-padding-x"),
          "--select-fz": getFontSize(size),
          "--select-radius":
            radius === undefined ? undefined : getRadius(radius),
        },
      };
    },
    mods: ({ disabled, error, leftSection, rightSection, searchable }) => {
      return {
        root: {
          "data-disabled": disabled,
          "data-error": !!error,
          "data-searchable": searchable,
        },
        wrapper: {
          "data-with-left-section": !!leftSection,
          "data-with-right-section": !!rightSection,
        },
      };
    },
  },
  (props, slot) => {
    const listboxId = React.useId();
    const childOptions = React.useMemo<SelectOption[]>(() => {
      return React.Children.toArray(props.children).flatMap((child) => {
        if (!React.isValidElement(child) || child.type !== "option") {
          return [];
        }

        const optionNode =
          child as React.ReactElement<
            React.OptionHTMLAttributes<HTMLOptionElement>
          >;

        const optionValue = optionNode.props.value;
        if (optionValue === undefined || optionValue === null) {
          return [];
        }

        return [
          {
            value: String(optionValue),
            label: optionNode.props.children,
            disabled: !!optionNode.props.disabled,
            hidden: !!optionNode.props.hidden,
          },
        ];
      });
    }, [props.children]);

    const options = React.useMemo<SelectOption[]>(() => {
      return [...(props.data ?? []), ...childOptions];
    }, [props.data, childOptions]);

    const controlled = props.value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(
      props.defaultValue ?? "",
    );
    const selectedValue = controlled ? props.value ?? "" : uncontrolledValue;

    const [searchValue, setSearchValue] = React.useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = React.useState("");
    const searchDebounce = Math.max(
      0,
      props.searchDebounce ?? DEFAULT_SEARCH_DEBOUNCE,
    );
    const normalizedSearch = debouncedSearchValue.trim().toLowerCase();
    const highlightQuery = props.searchable ? debouncedSearchValue.trim() : "";

    React.useEffect(() => {
      if (!props.searchable) {
        setDebouncedSearchValue("");
        return;
      }

      const timeoutId = setTimeout(() => {
        setDebouncedSearchValue(searchValue);
      }, searchDebounce);

      return () => {
        clearTimeout(timeoutId);
      };
    }, [props.searchable, searchDebounce, searchValue]);

    const visibleOptions = React.useMemo<SelectOption[]>(() => {
      return options.filter((option) => {
        if (option.hidden) {
          return false;
        }

        if (!props.searchable || normalizedSearch === "") {
          return true;
        }

        const haystack = [
          getOptionText(option.label),
          getOptionText(option.description),
          option.value,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedSearch);
      });
    }, [normalizedSearch, options, props.searchable]);

    const selectedOption =
      options.find((option) => option.value === selectedValue) ?? null;
    const selectedVisibleIndex = visibleOptions.findIndex(
      (option) => option.value === selectedValue,
    );

    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const optionRefs = React.useRef<Array<HTMLDivElement | null>>([]);

    const { refs, floatingStyles, context } = useFloating({
      open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      placement: "bottom-start",
      middleware: [
        offset(6),
        flip(),
        shift({ padding: 8 }),
        floatingSize({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              minWidth: `${rects.reference.width}px`,
            });
          },
        }),
      ],
    });

    const click = useClick(context, { keyboardHandlers: false });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "listbox" });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
      role,
    ]);

    const getFirstEnabledIndex = React.useCallback(() => {
      const index = visibleOptions.findIndex((option) => !option.disabled);
      return index >= 0 ? index : null;
    }, [visibleOptions]);

    const getLastEnabledIndex = React.useCallback(() => {
      for (let index = visibleOptions.length - 1; index >= 0; index -= 1) {
        if (!visibleOptions[index].disabled) {
          return index;
        }
      }

      return null;
    }, [visibleOptions]);

    const getNextEnabledIndex = React.useCallback(
      (startIndex: number, direction: 1 | -1) => {
        if (visibleOptions.length === 0) {
          return null;
        }

        let cursor = startIndex;
        for (let step = 0; step < visibleOptions.length; step += 1) {
          cursor =
            (cursor + direction + visibleOptions.length) % visibleOptions.length;

          if (!visibleOptions[cursor].disabled) {
            return cursor;
          }
        }

        return null;
      },
      [visibleOptions],
    );

    React.useEffect(() => {
      if (!open) {
        setActiveIndex(null);
        setSearchValue("");
        setDebouncedSearchValue("");
        return;
      }

      const initialIndex =
        selectedVisibleIndex >= 0 && !visibleOptions[selectedVisibleIndex]?.disabled
          ? selectedVisibleIndex
          : getFirstEnabledIndex();

      setActiveIndex(initialIndex);
    }, [
      getFirstEnabledIndex,
      open,
      selectedVisibleIndex,
      visibleOptions,
    ]);

    React.useEffect(() => {
      if (!open || activeIndex === null) {
        return;
      }

      const activeNode = optionRefs.current[activeIndex];
      if (activeNode && typeof activeNode.scrollIntoView === "function") {
        activeNode.scrollIntoView({
          block: "nearest",
        });
      }
    }, [activeIndex, open]);

    const handleSelect = (
      value: string,
      event: React.SyntheticEvent,
      options?: { allowDeselect?: boolean },
    ) => {
      const nextValue =
        options?.allowDeselect && !props.required && value === selectedValue
          ? ""
          : value;

      if (!controlled) {
        setUncontrolledValue(nextValue);
      }

      props.onChange?.(
        nextValue,
        event as unknown as React.ChangeEvent<HTMLSelectElement>,
      );
      setOpen(false);
    };

    const selectActiveOption = (event: React.SyntheticEvent) => {
      if (activeIndex === null) {
        return;
      }

      const option = visibleOptions[activeIndex];
      if (!option || option.disabled) {
        return;
      }

      handleSelect(option.value, event);
    };

    const handleListKeyDown = (event: React.KeyboardEvent<Element>) => {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();

          if (!open) {
            setOpen(true);
            setActiveIndex(getFirstEnabledIndex());
            return;
          }

          const nextIndex = getNextEnabledIndex(activeIndex ?? -1, 1);
          setActiveIndex(nextIndex);
          return;
        }

        case "ArrowUp": {
          event.preventDefault();

          if (!open) {
            setOpen(true);
            setActiveIndex(getLastEnabledIndex());
            return;
          }

          const previousIndex = getNextEnabledIndex(
            activeIndex ?? visibleOptions.length,
            -1,
          );
          setActiveIndex(previousIndex);
          return;
        }

        case "Home": {
          if (!open) {
            return;
          }

          event.preventDefault();
          setActiveIndex(getFirstEnabledIndex());
          return;
        }

        case "End": {
          if (!open) {
            return;
          }

          event.preventDefault();
          setActiveIndex(getLastEnabledIndex());
          return;
        }

        case "Enter":
        case " ": {
          if (props.searchable && event.key === " ") {
            return;
          }

          if (!open) {
            event.preventDefault();
            setOpen(true);
            return;
          }

          event.preventDefault();
          selectActiveOption(event);
          return;
        }

        case "Escape": {
          if (!open) {
            return;
          }

          event.preventDefault();
          setOpen(false);
          (refs.reference.current as HTMLElement | null)?.focus();
          return;
        }

        default:
          return;
      }
    };

    const triggerProps =
      slot.trigger as React.InputHTMLAttributes<HTMLInputElement>;

    const triggerValue =
      open && props.searchable
        ? searchValue
        : selectedOption
          ? getOptionText(selectedOption.label)
          : "";

    const triggerPlaceholder =
      open && props.searchable
        ? props.searchPlaceholder ?? "Search..."
        : props.placeholder;

    return (
      <div {...slot.root} data-open={open || undefined}>
        {props.label && <label {...slot.label}>{props.label}</label>}
        {props.description && (
          <div {...slot.description}>{props.description}</div>
        )}

        <div {...slot.wrapper}>
          {props.leftSection && (
            <div {...slot.leftSection}>{props.leftSection}</div>
          )}

          <input
            {...triggerProps}
            {...getReferenceProps({
              onKeyDown: (event) => {
                handleListKeyDown(event);
              },
              onChange: (event) => {
                if (!props.searchable) {
                  return;
                }

                if (!open) {
                  setOpen(true);
                }

                setSearchValue(
                  (event.currentTarget as HTMLInputElement).value,
                );
              },
              onBlur: (event) => {
                props.onBlur?.(
                  event as unknown as React.FocusEvent<HTMLSelectElement>,
                );
              },
              onFocus: (event) => {
                props.onFocus?.(
                  event as unknown as React.FocusEvent<HTMLSelectElement>,
                );
              },
            })}
            ref={refs.setReference}
            type="text"
            value={triggerValue}
            placeholder={triggerPlaceholder}
            readOnly={!props.searchable}
            disabled={props.disabled}
            aria-invalid={props["aria-invalid"] ?? !!props.error}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-activedescendant={
              open && activeIndex !== null
                ? `${listboxId}-option-${activeIndex}`
                : undefined
            }
            role="combobox"
          />

          <select
            {...slot.native}
            value={selectedValue}
            name={props.name}
            required={props.required}
            form={props.form}
            disabled={props.disabled}
            tabIndex={-1}
            aria-hidden="true"
            onChange={() => {
              // Controlled by custom dropdown UI.
            }}
          >
            {props.placeholder && (
              <option value="" disabled={props.required}>
                {props.placeholder}
              </option>
            )}

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                hidden={option.hidden}
                disabled={option.disabled}
              >
                {getOptionText(option.label)}
              </option>
            ))}
          </select>

          {props.rightSection ? (
            <div {...slot.rightSection}>{props.rightSection}</div>
          ) : (
            <div {...slot.chevron} aria-hidden="true">
              <svg
                viewBox="0 0 16 16"
                width="14"
                height="14"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  d="M4.5 6.5 8 10 11.5 6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        {open && !props.disabled && (
          <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
            <div
              {...slot.dropdown}
              {...getFloatingProps({
                onKeyDown: handleListKeyDown,
              })}
              ref={refs.setFloating}
              id={listboxId}
              style={{
                ...(slot.dropdown.style ?? {}),
                ...floatingStyles,
              }}
            >
              {visibleOptions.length === 0 && (
                <div {...slot.empty}>No options found</div>
              )}

              {visibleOptions.map((option, index) => {
                const selected = option.value === selectedValue;
                const active = index === activeIndex;

                return (
                  <div
                    {...slot.option}
                    ref={(node) => {
                      optionRefs.current[index] = node;
                    }}
                    key={option.value}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    tabIndex={active ? 0 : -1}
                    aria-selected={selected}
                    data-active={active || undefined}
                    data-selected={selected || undefined}
                    data-disabled={option.disabled || undefined}
                    onMouseEnter={() => {
                      setActiveIndex(index);
                    }}
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={(event) => {
                      if (option.disabled) {
                        return;
                      }

                      handleSelect(option.value, event, {
                        allowDeselect: true,
                      });
                    }}
                  >
                    {option.icon && <span {...slot.optionIcon}>{option.icon}</span>}
                    <span {...slot.optionMain}>
                      <span {...slot.optionLabel}>
                        {renderHighlightedText(
                          option.label,
                          highlightQuery,
                          slot.optionHighlight,
                        )}
                      </span>
                      {option.description && (
                        <span {...slot.optionDescription}>
                          {renderHighlightedText(
                            option.description,
                            highlightQuery,
                            slot.optionHighlight,
                          )}
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </FloatingFocusManager>
        )}

        {props.error && typeof props.error === "string" && (
          <div {...slot.error}>{props.error}</div>
        )}
      </div>
    );
  },
);
