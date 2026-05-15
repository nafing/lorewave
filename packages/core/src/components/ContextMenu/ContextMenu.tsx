import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  offset,
  useDismiss,
  useFloating,
  useInteractions,
  type Placement,
} from "@floating-ui/react";
import React from "react";
import type { Token } from "../../types/core";
import { getFontSize, getRadius } from "../../utils/get-size";
import classes from "./ContextMenu.module.css";

type ContextMenuContextValue = {
  closeMenu: () => void;
  closeOnItemClick: boolean;
  getRadioValue: (name: string) => string | undefined;
  setRadioValue: (name: string, value: string) => void;
  registerRadio: (name: string, value: string, checked: boolean) => void;
};

type Point = {
  x: number;
  y: number;
};

const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(
  null,
);

const useContextMenuContext = () => {
  const context = React.useContext(ContextMenuContext);
  if (!context) {
    throw new Error(
      "ContextMenu compound components must be used inside <ContextMenu>",
    );
  }

  return context;
};

const cx = (...value: Array<string | undefined | false>) => {
  return value.filter(Boolean).join(" ");
};

const toPx = (value: string | number | undefined): string | undefined => {
  if (typeof value === "number") {
    return `${value}px`;
  }

  return value;
};

const createVirtualReference = ({ x, y }: Point) => {
  return {
    getBoundingClientRect: () => ({
      x,
      y,
      left: x,
      top: y,
      right: x,
      bottom: y,
      width: 0,
      height: 0,
      toJSON: () => ({}),
    }),
  };
};

interface ContextMenuProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "color"
> {
  children: React.ReactNode;
  size?: Token;
  position?: Placement;
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenChange?: (opened: boolean) => void;
  disabled?: boolean;
  closeOnItemClick?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  withinPortal?: boolean;
  width?: number | string;
  offset?: number;
  radius?: Token | number | string;
}

interface ContextMenuItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  description?: React.ReactNode;
  closeMenuOnClick?: boolean;
}

interface ContextMenuSubProps extends Omit<ContextMenuItemProps, "children"> {
  label: React.ReactNode;
  children: React.ReactNode;
}

interface ContextMenuCheckboxProps extends Omit<
  ContextMenuItemProps,
  "onChange"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (
    checked: boolean,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

interface ContextMenuRadioProps extends Omit<ContextMenuItemProps, "onChange"> {
  name: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (
    value: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

interface ContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ContextMenuDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

interface ContextMenuTargetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ContextMenuDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ContextMenuItem = (props: ContextMenuItemProps) => {
  const {
    leftSection,
    rightSection,
    description,
    closeMenuOnClick,
    className,
    onClick,
    disabled,
    children,
    ...rest
  } = props;

  const context = useContextMenuContext();
  const shouldClose = closeMenuOnClick ?? context.closeOnItemClick;

  return (
    <button
      {...rest}
      type={rest.type ?? "button"}
      role="menuitem"
      className={cx(classes.item, className)}
      data-disabled={disabled || undefined}
      data-with-description={!!description || undefined}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        if (shouldClose) {
          context.closeMenu();
        }
      }}
    >
      {leftSection && (
        <span className={classes.itemSection}>{leftSection}</span>
      )}
      <span className={classes.itemContent}>
        <span className={classes.itemLabel}>{children}</span>
        {description && (
          <span className={classes.itemDescription}>{description}</span>
        )}
      </span>
      {rightSection && (
        <span className={classes.itemSection}>{rightSection}</span>
      )}
    </button>
  );
};

const ContextMenuSub = (props: ContextMenuSubProps) => {
  const {
    label,
    children,
    leftSection,
    rightSection,
    className,
    disabled,
    ...rest
  } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={classes.subRoot}
      onMouseEnter={() => {
        if (!disabled) {
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <button
        {...rest}
        type={rest.type ?? "button"}
        role="menuitem"
        className={cx(classes.item, className)}
        data-disabled={disabled || undefined}
        data-open={open || undefined}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(event) => {
          if (disabled) {
            return;
          }

          event.preventDefault();
          setOpen((current) => !current);
        }}
      >
        {leftSection && (
          <span className={classes.itemSection}>{leftSection}</span>
        )}
        <span className={classes.itemLabel}>{label}</span>
        <span className={classes.itemSection}>{rightSection ?? ">"}</span>
      </button>

      {open && !disabled && (
        <div className={classes.subDropdown} role="menu">
          {children}
        </div>
      )}
    </div>
  );
};

const ContextMenuCheckbox = (props: ContextMenuCheckboxProps) => {
  const {
    checked,
    defaultChecked,
    onChange,
    closeMenuOnClick,
    leftSection,
    rightSection,
    description,
    className,
    onClick,
    disabled,
    children,
    ...rest
  } = props;

  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] =
    React.useState<boolean>(!!defaultChecked);
  const isChecked = isControlled ? !!checked : uncontrolledChecked;

  const context = useContextMenuContext();
  const shouldClose = closeMenuOnClick ?? false;

  return (
    <button
      {...rest}
      type={rest.type ?? "button"}
      role="menuitemcheckbox"
      aria-checked={isChecked}
      className={cx(classes.item, className)}
      data-disabled={disabled || undefined}
      data-checked={isChecked || undefined}
      data-with-description={!!description || undefined}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        const nextChecked = !isChecked;
        if (!isControlled) {
          setUncontrolledChecked(nextChecked);
        }

        onChange?.(nextChecked, event);

        if (shouldClose) {
          context.closeMenu();
        }
      }}
    >
      <span className={classes.itemIndicator} aria-hidden="true">
        {isChecked ? "check" : ""}
      </span>
      {leftSection && (
        <span className={classes.itemSection}>{leftSection}</span>
      )}
      <span className={classes.itemContent}>
        <span className={classes.itemLabel}>{children}</span>
        {description && (
          <span className={classes.itemDescription}>{description}</span>
        )}
      </span>
      {rightSection && (
        <span className={classes.itemSection}>{rightSection}</span>
      )}
    </button>
  );
};

const ContextMenuRadio = (props: ContextMenuRadioProps) => {
  const {
    name,
    value,
    checked,
    defaultChecked,
    onChange,
    closeMenuOnClick,
    leftSection,
    rightSection,
    description,
    className,
    onClick,
    disabled,
    children,
    ...rest
  } = props;

  const context = useContextMenuContext();
  const isControlled = checked !== undefined;

  React.useEffect(() => {
    if (!isControlled) {
      context.registerRadio(name, value, !!defaultChecked);
    }
  }, [context, defaultChecked, isControlled, name, value]);

  const selectedValue = context.getRadioValue(name);
  const isChecked = isControlled ? !!checked : selectedValue === value;
  const shouldClose = closeMenuOnClick ?? false;

  return (
    <button
      {...rest}
      type={rest.type ?? "button"}
      role="menuitemradio"
      aria-checked={isChecked}
      className={cx(classes.item, className)}
      data-disabled={disabled || undefined}
      data-checked={isChecked || undefined}
      data-with-description={!!description || undefined}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        if (!isControlled) {
          context.setRadioValue(name, value);
        }

        onChange?.(value, event);

        if (shouldClose) {
          context.closeMenu();
        }
      }}
    >
      <span className={classes.itemIndicator} aria-hidden="true">
        {isChecked ? "dot" : ""}
      </span>
      {leftSection && (
        <span className={classes.itemSection}>{leftSection}</span>
      )}
      <span className={classes.itemContent}>
        <span className={classes.itemLabel}>{children}</span>
        {description && (
          <span className={classes.itemDescription}>{description}</span>
        )}
      </span>
      {rightSection && (
        <span className={classes.itemSection}>{rightSection}</span>
      )}
    </button>
  );
};

const ContextMenuLabel = (props: ContextMenuLabelProps) => {
  const { className, children, ...rest } = props;

  return (
    <div {...rest} className={cx(classes.label, className)} role="presentation">
      {children}
    </div>
  );
};

const ContextMenuDivider = (props: ContextMenuDividerProps) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cx(classes.divider, className)}
      role="separator"
    />
  );
};

const ContextMenuTarget = (props: ContextMenuTargetProps) => {
  return <>{props.children}</>;
};

const ContextMenuDropdown = (props: ContextMenuDropdownProps) => {
  return <>{props.children}</>;
};

const ContextMenuRoot = (props: ContextMenuProps) => {
  const {
    children,
    size = "sm",
    position = "right-start",
    opened,
    defaultOpened,
    onOpenChange,
    disabled,
    closeOnItemClick = true,
    closeOnClickOutside = true,
    closeOnEscape = true,
    withinPortal = true,
    width = 220,
    offset: offsetValue = 6,
    radius,
    className,
    style,
    ...rest
  } = props;

  const isControlled = opened !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] =
    React.useState<boolean>(!!defaultOpened);

  const rawOpen = isControlled ? !!opened : uncontrolledOpen;
  const open = !disabled && rawOpen;
  const [anchorPoint, setAnchorPoint] = React.useState<Point | null>(null);

  const [radioValues, setRadioValues] = React.useState<Record<string, string>>(
    {},
  );

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const childArray = React.Children.toArray(children);

  const targetPart = childArray.find(
    (child): child is React.ReactElement<ContextMenuTargetProps> => {
      return React.isValidElement(child) && child.type === ContextMenuTarget;
    },
  );

  const dropdownPart = childArray.find(
    (child): child is React.ReactElement<ContextMenuDropdownProps> => {
      return React.isValidElement(child) && child.type === ContextMenuDropdown;
    },
  );

  if (!targetPart || !dropdownPart) {
    throw new Error(
      "ContextMenu requires both <ContextMenu.Target> and <ContextMenu.Dropdown>",
    );
  }

  const {
    className: targetClassName,
    style: targetStyle,
    children: targetChildren,
    onContextMenu: onTargetContextMenu,
    ...targetElementProps
  } = targetPart.props;

  const {
    className: dropdownClassName,
    style: dropdownStyle,
    children: dropdownChildren,
    ...dropdownElementProps
  } = dropdownPart.props;

  const contextValue = React.useMemo<ContextMenuContextValue>(() => {
    return {
      closeMenu: () => {
        handleOpenChange(false);
      },
      closeOnItemClick,
      getRadioValue: (name) => radioValues[name],
      setRadioValue: (name, value) => {
        setRadioValues((current) => {
          if (current[name] === value) {
            return current;
          }

          return {
            ...current,
            [name]: value,
          };
        });
      },
      registerRadio: (name, value, checked) => {
        if (!checked) {
          return;
        }

        setRadioValues((current) => {
          if (current[name] !== undefined) {
            return current;
          }

          return {
            ...current,
            [name]: value,
          };
        });
      },
    };
  }, [closeOnItemClick, handleOpenChange, radioValues]);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    whileElementsMounted: (...args) => {
      return autoUpdate(...args, {
        ancestorScroll: false,
        ancestorResize: false,
        elementResize: false,
        layoutShift: false,
        animationFrame: false,
      });
    },
    strategy: "fixed",
    placement: position,
    middleware: [offset(offsetValue)],
  });

  React.useEffect(() => {
    if (!anchorPoint) {
      return;
    }

    refs.setPositionReference(createVirtualReference(anchorPoint));
  }, [anchorPoint, refs]);

  const dismiss = useDismiss(context, {
    enabled: !disabled,
    outsidePress: closeOnClickOutside,
    escapeKey: closeOnEscape,
  });

  const { getFloatingProps } = useInteractions([dismiss]);

  const setTargetRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      refs.setReference(node);
    },
    [refs],
  );

  const handleTargetContextMenu = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onTargetContextMenu?.(event);

      if (event.defaultPrevented || disabled) {
        return;
      }

      event.preventDefault();
      setAnchorPoint({
        x: event.clientX,
        y: event.clientY,
      });
      handleOpenChange(true);
    },
    [disabled, handleOpenChange, onTargetContextMenu],
  );

  const floatingDropdown = open ? (
    <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
      <div
        {...getFloatingProps(dropdownElementProps)}
        ref={refs.setFloating}
        role="menu"
        className={cx(classes.dropdown, dropdownClassName)}
        style={
          {
            ...(dropdownStyle ?? {}),
            ...floatingStyles,
            "--menu-fz": getFontSize(size),
            "--menu-radius": getRadius(radius),
            "--menu-width": toPx(width),
          } as React.CSSProperties
        }
      >
        <ContextMenuContext.Provider value={contextValue}>
          {dropdownChildren}
        </ContextMenuContext.Provider>
      </div>
    </FloatingFocusManager>
  ) : null;

  return (
    <div
      {...rest}
      className={cx(classes.root, className)}
      style={style}
      data-disabled={disabled || undefined}
    >
      <div
        {...targetElementProps}
        ref={setTargetRef}
        className={cx(classes.target, targetClassName)}
        style={targetStyle}
        aria-haspopup="menu"
        aria-expanded={open}
        data-open={open || undefined}
        onContextMenu={handleTargetContextMenu}
      >
        {targetChildren}
      </div>

      {withinPortal ? (
        <FloatingPortal>{floatingDropdown}</FloatingPortal>
      ) : (
        floatingDropdown
      )}
    </div>
  );
};

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Target: ContextMenuTarget,
  Dropdown: ContextMenuDropdown,
  Item: ContextMenuItem,
  Sub: ContextMenuSub,
  Checkbox: ContextMenuCheckbox,
  Radio: ContextMenuRadio,
  Label: ContextMenuLabel,
  Divider: ContextMenuDivider,
});
