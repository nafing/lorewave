import { FloatingFocusManager, useFloating } from "@floating-ui/react";
import React from "react";
import { Portal } from "../Portal/Portal";
import type { Token } from "../../types/core";
import { getRadius } from "../../utils/get-size";
import classes from "./Modal.module.css";
import IconX from "../../icons/IconX";

const SCROLL_LOCK_COUNT_ATTR = "data-lorewave-scroll-lock-count";
const SCROLL_LOCK_HTML_OVERFLOW_ATTR =
  "data-lorewave-scroll-lock-overflow-html";
const SCROLL_LOCK_BODY_OVERFLOW_ATTR =
  "data-lorewave-scroll-lock-overflow-body";

interface CProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "color" | "title"
> {
  children: React.ReactNode;
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenChange?: (opened: boolean) => void;
  onClose?: () => void;
  title?: React.ReactNode;
  withCloseButton?: boolean;
  closeButtonLabel?: string;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  trapFocus?: boolean;
  centered?: boolean;
  width?: number | string;
  radius?: Token | number | string;
  withinPortal?: boolean;
  portalTarget?: HTMLElement | string;
  portalReuseTargetNode?: boolean;
  portalId?: string;
}

const toPx = (value: string | number | undefined): string | undefined => {
  if (typeof value === "number") {
    return `${value}px`;
  }

  return value;
};

export const Modal = (props: CProps) => {
  const {
    children,
    opened,
    defaultOpened,
    onOpenChange,
    onClose,
    title,
    withCloseButton = true,
    closeButtonLabel = "Close modal",
    closeOnEscape = true,
    closeOnClickOutside = true,
    trapFocus = true,
    centered = true,
    width = 460,
    radius,
    withinPortal = true,
    portalTarget,
    portalReuseTargetNode = false,
    portalId,
    className,
    style,
    id,
    ...rest
  } = props;

  const isControlled = opened !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] =
    React.useState<boolean>(!!defaultOpened);

  const open = isControlled ? !!opened : uncontrolledOpen;
  const titleId = React.useId();

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
      if (!nextOpen) {
        onClose?.();
      }
    },
    [isControlled, onClose, onOpenChange],
  );

  React.useEffect(() => {
    if (!open || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeOnEscape, handleOpenChange, open]);

  React.useEffect(() => {
    if (!open || typeof document === "undefined") {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const currentCount = Number(
      body.getAttribute(SCROLL_LOCK_COUNT_ATTR) ?? "0",
    );

    if (currentCount === 0) {
      html.setAttribute(SCROLL_LOCK_HTML_OVERFLOW_ATTR, html.style.overflow);
      body.setAttribute(SCROLL_LOCK_BODY_OVERFLOW_ATTR, body.style.overflow);
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    }

    body.setAttribute(SCROLL_LOCK_COUNT_ATTR, String(currentCount + 1));

    return () => {
      const activeCount = Number(
        body.getAttribute(SCROLL_LOCK_COUNT_ATTR) ?? "0",
      );
      const nextCount = Math.max(0, activeCount - 1);

      if (nextCount > 0) {
        body.setAttribute(SCROLL_LOCK_COUNT_ATTR, String(nextCount));
        return;
      }

      const previousHtmlOverflow = html.getAttribute(
        SCROLL_LOCK_HTML_OVERFLOW_ATTR,
      );
      const previousBodyOverflow = body.getAttribute(
        SCROLL_LOCK_BODY_OVERFLOW_ATTR,
      );

      if (previousHtmlOverflow !== null) {
        html.style.overflow = previousHtmlOverflow;
      } else {
        html.style.removeProperty("overflow");
      }

      if (previousBodyOverflow !== null) {
        body.style.overflow = previousBodyOverflow;
      } else {
        body.style.removeProperty("overflow");
      }

      body.removeAttribute(SCROLL_LOCK_COUNT_ATTR);
      html.removeAttribute(SCROLL_LOCK_HTML_OVERFLOW_ATTR);
      body.removeAttribute(SCROLL_LOCK_BODY_OVERFLOW_ATTR);
    };
  }, [open]);

  const { refs, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
  });

  if (!open) {
    return null;
  }

  return (
    <Portal
      withinPortal={withinPortal && open}
      target={portalTarget}
      reuseTargetNode={portalReuseTargetNode}
      id={portalId}
    >
      <div
        className={classes.overlay}
        onClick={(event) => {
          if (closeOnClickOutside && event.target === event.currentTarget) {
            handleOpenChange(false);
          }
        }}
      >
        <FloatingFocusManager
          context={context}
          modal={trapFocus}
          initialFocus={trapFocus ? 0 : -1}
        >
          <div
            {...rest}
            id={id}
            ref={refs.setFloating}
            role="dialog"
            aria-modal={true}
            aria-labelledby={title ? titleId : undefined}
            className={[
              classes.content,
              centered ? classes.centered : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            style={
              {
                ...(style ?? {}),
                "--modal-width": toPx(width),
                "--modal-radius": getRadius(radius),
              } as React.CSSProperties
            }
          >
            {(title || withCloseButton) && (
              <div className={classes.header}>
                {title && (
                  <div id={titleId} className={classes.title}>
                    {title}
                  </div>
                )}

                {withCloseButton && (
                  <button
                    type="button"
                    className={classes.closeButton}
                    aria-label={closeButtonLabel}
                    onClick={() => {
                      handleOpenChange(false);
                    }}
                  >
                    <IconX />
                  </button>
                )}
              </div>
            )}

            <div className={classes.body}>{children}</div>
          </div>
        </FloatingFocusManager>
      </div>
    </Portal>
  );
};
