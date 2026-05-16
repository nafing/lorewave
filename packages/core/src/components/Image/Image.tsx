import React from "react";
import { coreCompute } from "../../utils/compute/core";
import classes from "./Image.module.css";

interface CProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "color"> {
  fit?: React.CSSProperties["objectFit"];
  fallbackSrc?: string;
}

type CSlots = "root";

export const Image = coreCompute<CProps, CSlots, HTMLImageElement>(
  {
    classes,
    nativeSlot: "root",
    styleSlot: "root",
    defaultProps: {
      fit: "cover",
    },
    vars: ({ fit }) => {
      return {
        root: {
          "--image-fit": fit,
        },
      };
    },
  },
  (props, slot) => {
    const [resolvedSrc, setResolvedSrc] = React.useState(props.src);
    const fallbackAttemptedRef = React.useRef(false);

    React.useEffect(() => {
      setResolvedSrc(props.src);
      fallbackAttemptedRef.current = false;
    }, [props.src, props.fallbackSrc]);

    const rootProps = slot.root as React.ImgHTMLAttributes<HTMLImageElement>;
    const Root = (props.component ?? "img") as React.ElementType;

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

      props.onError?.(event);
    };

    return (
      <Root
        {...rootProps}
        src={resolvedSrc}
        alt={props.alt}
        srcSet={props.srcSet}
        sizes={props.sizes}
        width={props.width}
        height={props.height}
        loading={props.loading}
        decoding={props.decoding}
        fetchPriority={props.fetchPriority}
        referrerPolicy={props.referrerPolicy}
        crossOrigin={props.crossOrigin}
        useMap={props.useMap}
        onError={handleError}
      />
    );
  },
);
