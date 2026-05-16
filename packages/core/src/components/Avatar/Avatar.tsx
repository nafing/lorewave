import React from "react";
import type { FullToken } from "../../types/core";
import { coreCompute } from "../../utils/compute/core";
import { getFontSize, getRadius, getSize } from "../../utils/get-size";
import classes from "./Avatar.module.css";

interface CProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  src?: string;
  alt?: string;
  name?: string;
  size?: FullToken;
  fit?: React.CSSProperties["objectFit"];
  fallbackSrc?: string;
  imageProps?: Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "alt" | "children" | "className" | "style" | "color"
  >;
}

type CSlots = "root" | "image" | "placeholder";

const getInitials = (value?: string) => {
  if (!value) {
    return null;
  }

  const chunks = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (chunks.length === 0) {
    return null;
  }

  return chunks
    .map((chunk) => chunk[0])
    .join("")
    .toUpperCase();
};

export const Avatar = coreCompute<CProps, CSlots, HTMLDivElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    omitProps: ["fz", "radius"],
    defaultProps: {
      size: "md",
      fit: "cover",
    },
    vars: ({ size, radius, fit }) => {
      return {
        root: {
          "--avatar-size": getSize(size, "button-height"),
          "--avatar-fz": getFontSize(size),
          "--avatar-radius":
            radius === undefined ? undefined : getRadius(radius),
          "--avatar-fit": fit,
        },
      };
    },
    mods: ({ src }) => {
      return {
        root: {
          "data-has-image": !!src,
        },
      };
    },
  },
  (props, slot) => {
    const [resolvedSrc, setResolvedSrc] = React.useState(props.src);
    const fallbackAttemptedRef = React.useRef(false);
    const Root = (props.component ?? "div") as React.ElementType;

    React.useEffect(() => {
      setResolvedSrc(props.src);
      fallbackAttemptedRef.current = false;
    }, [props.src, props.fallbackSrc]);

    const fallbackContent = props.children ?? getInitials(props.name) ?? "?";

    const handleError = (
      event: React.SyntheticEvent<HTMLImageElement, Event>,
    ) => {
      if (
        !fallbackAttemptedRef.current &&
        props.fallbackSrc &&
        resolvedSrc !== props.fallbackSrc
      ) {
        fallbackAttemptedRef.current = true;
        setResolvedSrc(props.fallbackSrc);
      } else {
        setResolvedSrc(undefined);
      }

      props.imageProps?.onError?.(event);
    };

    const imageProps = slot.image as React.ImgHTMLAttributes<HTMLImageElement>;

    return (
      <Root {...slot.root}>
        {resolvedSrc ? (
          <img
            {...imageProps}
            {...props.imageProps}
            src={resolvedSrc}
            alt={props.alt ?? props.name ?? "Avatar"}
            onError={handleError}
          />
        ) : (
          <span {...slot.placeholder}>{fallbackContent}</span>
        )}
      </Root>
    );
  },
);
