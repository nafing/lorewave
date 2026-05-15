import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import React from "react";
import type { Token } from "../../types/core";
import { getFontSize, getRadius } from "../../utils/get-size";
import classes from "./Menu.module.css";

type MenuPosition = "top" | "right" | "bottom" | "left";

type MenuContextValue = {
  closeMenu: () => void;
  closeOnItemClick: boolean;
  getRadioValue: (name: string) => string | undefined;
  setRadioValue: (name: string, value: string) => void;
  registerRadio: (name: string, value: string, checked: boolean) => void;
};

const MenuContext = React.createContext<MenuContextValue | null>(null);

const useMenuContext = () => {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error("Menu compound components must be used inside <Menu>");
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

interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  children: React.ReactNode;
  size?: Token;
  position?: MenuPosition;
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenChange?: (opened: boolean) => void;
  trigger?: "click" | "hover";
  disabled?: boolean;
  closeOnItemClick?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  withinPortal?: boolean;
  width?: number | string;
  offset?: number;
  radius?: Token | number | string;
}

interface MenuItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  description?: React.ReactNode;
  closeMenuOnClick?: boolean;
}

interface MenuSubProps extends Omit<MenuItemProps, "children"> {
  label: React.ReactNode;
  children: React.ReactNode;
}

interface MenuCheckboxProps extends Omit<MenuItemProps, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface MenuRadioProps extends Omit<MenuItemProps, "onChange"> {
  name: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface MenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface MenuDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

interface MenuTargetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface MenuDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MenuItem = (props: MenuItemProps) => {
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

  const context = useMenuContext();
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
      {leftSection && <span className={classes.itemSection}>{leftSection}</span>}
      <span className={classes.itemContent}>
        <span className={classes.itemLabel}>{children}</span>
        {description && (
          <span className={classes.itemDescription}>{description}</span>
        )}
      </span>
      {rightSection && <span className={classes.itemSection}>{rightSection}</span>}
    </button>
  );
};

const MenuSub = (props: MenuSubProps) => {
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
        {leftSection && <span className={classes.itemSection}>{leftSection}</span>}
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

const MenuCheckbox = (props: MenuCheckboxProps) => {
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
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean>(
    !!defaultChecked,
  );
  const isChecked = isControlled ? !!checked : uncontrolledChecked;

  const context = useMenuContext();
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
      {leftSection && <span className={classes.itemSection}>{leftSection}</span>}
      <span className={classes.itemContent}>
        <span className={classes.itemLabel}>{children}</span>
        {description && (
          <span className={classes.itemDescription}>{description}</span>
        )}
      </span>
      {rightSection && <span className={classes.itemSection}>{rightSection}</span>}
    </button>
  );
};

const MenuRadio = (props: MenuRadioProps) => {
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

  const context = useMenuContext();
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
      {leftSection && <span className={classes.itemSection}>{leftSection}</span>}
      <span className={classes.itemContent}>
        <span className={classes.itemLabel}>{children}</span>
        {description && (
          <span className={classes.itemDescription}>{description}</span>
        )}
      </span>
      {rightSection && <span className={classes.itemSection}>{rightSection}</span>}
    </button>
  );
};

const MenuLabel = (props: MenuLabelProps) => {
  const { className, children, ...rest } = props;

  return (
    <div {...rest} className={cx(classes.label, className)} role="presentation">
      {children}
    </div>
  );
};

const MenuDivider = (props: MenuDividerProps) => {
  const { className, ...rest } = props;

  return <div {...rest} className={cx(classes.divider, className)} role="separator" />;
};

const MenuTarget = (props: MenuTargetProps) => {
  return <>{props.children}</>;
};

const MenuDropdown = (props: MenuDropdownProps) => {
  return <>{props.children}</>;
};

const MenuRoot = (props: MenuProps) => {
  const {
    children,
    size = "sm",
    position = "bottom",
    opened,
    defaultOpened,
    onOpenChange,
    trigger = "click",
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
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>(
    !!defaultOpened,
  );

  const rawOpen = isControlled ? !!opened : uncontrolledOpen;
  const open = !disabled && rawOpen;

  const [radioValues, setRadioValues] = React.useState<Record<string, string>>({});

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
    (child): child is React.ReactElement<MenuTargetProps> => {
      return React.isValidElement(child) && child.type === MenuTarget;
    },
  );

  const dropdownPart = childArray.find(
    (child): child is React.ReactElement<MenuDropdownProps> => {
      return React.isValidElement(child) && child.type === MenuDropdown;
    },
  );

  if (!targetPart || !dropdownPart) {
    throw new Error("Menu requires both <Menu.Target> and <Menu.Dropdown>");
  }

  const {
    className: targetClassName,
    style: targetStyle,
    children: targetChildren,
    ...targetElementProps
  } = targetPart.props;

  const {
    className: dropdownClassName,
    style: dropdownStyle,
    children: dropdownChildren,
    ...dropdownElementProps
  } = dropdownPart.props;

  const contextValue = React.useMemo<MenuContextValue>(() => {
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
    whileElementsMounted: autoUpdate,
    placement: position,
    middleware: [offset(offsetValue), flip(), shift({ padding: 8 })],
  });

  const click = useClick(context, {
    enabled: !disabled && trigger === "click",
    event: "click",
    toggle: true,
    keyboardHandlers: true,
  });

  const hover = useHover(context, {
    enabled: !disabled && trigger === "hover",
    move: false,
    delay: {
      open: 70,
      close: 90,
    },
  });

  const dismiss = useDismiss(context, {
    enabled: !disabled,
    outsidePress: closeOnClickOutside,
    escapeKey: closeOnEscape,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    dismiss,
  ]);

  const floatingDropdown = open ? (
    <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
      <div
        {...getFloatingProps(dropdownElementProps)}
        ref={refs.setFloating}
        role="menu"
        className={cx(classes.dropdown, dropdownClassName)}
        style={{
          ...(dropdownStyle ?? {}),
          ...floatingStyles,
          "--menu-fz": getFontSize(size),
          "--menu-radius": getRadius(radius),
          "--menu-width": toPx(width),
        } as React.CSSProperties}
      >
        <MenuContext.Provider value={contextValue}>{dropdownChildren}</MenuContext.Provider>
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
        {...getReferenceProps(targetElementProps)}
        ref={refs.setReference}
        className={cx(classes.target, targetClassName)}
        style={targetStyle}
        aria-haspopup="menu"
        aria-expanded={open}
        data-open={open || undefined}
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

export const Menu = Object.assign(MenuRoot, {
  Target: MenuTarget,
  Dropdown: MenuDropdown,
  Item: MenuItem,
  Sub: MenuSub,
  Checkbox: MenuCheckbox,
  Radio: MenuRadio,
  Label: MenuLabel,
  Divider: MenuDivider,
});
