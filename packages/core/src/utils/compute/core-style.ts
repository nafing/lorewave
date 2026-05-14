import type { CSSProperties } from "react";
import type { CoreStyleProps } from "../../types/core";
import { getFontSize, getLineHeight, getRadius, getSpacing } from "../get-size";
import { getColor } from "../get-color";

type StylePropConverter = (value: unknown) => unknown;

const spacing: StylePropConverter = (v) => getSpacing(v);
const color: StylePropConverter = (v) => getColor(v);
const identity: StylePropConverter = (v) => v;

const STYLE_PROPS_CONFIG: [
  keyof CoreStyleProps,
  string | string[],
  StylePropConverter,
][] = [
  // Margin
  ["m", "margin", spacing],
  ["mt", "marginTop", spacing],
  ["mr", "marginRight", spacing],
  ["mb", "marginBottom", spacing],
  ["ml", "marginLeft", spacing],
  ["ms", "marginInlineStart", spacing],
  ["me", "marginInlineEnd", spacing],
  ["mis", "marginInlineStart", spacing],
  ["mie", "marginInlineEnd", spacing],
  ["mx", ["marginLeft", "marginRight"], spacing],
  ["my", ["marginTop", "marginBottom"], spacing],
  // Padding
  ["p", "padding", spacing],
  ["pt", "paddingTop", spacing],
  ["pr", "paddingRight", spacing],
  ["pb", "paddingBottom", spacing],
  ["pl", "paddingLeft", spacing],
  ["ps", "paddingInlineStart", spacing],
  ["pe", "paddingInlineEnd", spacing],
  ["pis", "paddingInlineStart", spacing],
  ["pie", "paddingInlineEnd", spacing],
  ["px", ["paddingLeft", "paddingRight"], spacing],
  ["py", ["paddingTop", "paddingBottom"], spacing],
  // Visual
  ["radius", "borderRadius", (v) => getRadius(v)],
  ["bd", "border", identity],
  ["bg", "background", identity],
  ["bc", "borderColor", color],
  ["color", "color", color],
  // Typography
  ["ff", "fontFamily", identity],
  ["fz", "fontSize", (v) => getFontSize(v)],
  ["fw", "fontWeight", identity],
  ["lts", "letterSpacing", identity],
  ["ta", "textAlign", identity],
  ["lh", "lineHeight", (v) => getLineHeight(v)],
  ["fs", "fontStyle", identity],
  ["tt", "textTransform", identity],
  ["td", "textDecoration", identity],
  // Dimensions
  ["w", "width", identity],
  ["miw", "minWidth", identity],
  ["maw", "maxWidth", identity],
  ["h", "height", identity],
  ["mih", "minHeight", identity],
  ["mah", "maxHeight", identity],
  // Position
  ["pos", "position", identity],
  ["top", "top", identity],
  ["right", "right", identity],
  ["bottom", "bottom", identity],
  ["left", "left", identity],
  ["inset", "inset", identity],
  // Layout
  ["display", "display", identity],
  ["flex", "flex", identity],
  ["opacity", "opacity", identity],
  ["cursor", "cursor", identity],
  ["overflow", "overflow", identity],
];

export function getCoreStyle(props: CoreStyleProps): CSSProperties {
  const style: Record<string, unknown> = {};

  for (const [prop, cssProp, converter] of STYLE_PROPS_CONFIG) {
    const value = props[prop];
    if (value === undefined) continue;
    const converted = converter(value);
    if (converted === undefined) continue;
    if (Array.isArray(cssProp)) {
      for (const cp of cssProp) style[cp] = converted;
    } else {
      style[cssProp] = converted;
    }
  }

  return style as CSSProperties;
}
