export type Token = "xs" | "sm" | "md" | "lg" | "xl";
export type HeadingToken = `h${1 | 2 | 3 | 4 | 5 | 6}`;
export type FullToken = Token | number | (string & {});
export type Colors =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";

export type Variant =
  | "filled"
  | "light"
  | "outline"
  | "subtle"
  | "transparent"
  | "white";

export type FamilyToken =
  | "text"
  | "mono"
  | "monospace"
  | "heading"
  | "headings";

export type CoreStyleProps = {
  m?: FullToken;
  mt?: FullToken;
  mr?: FullToken;
  mb?: FullToken;
  ml?: FullToken;
  ms?: FullToken;
  me?: FullToken;
  mis?: FullToken;
  mie?: FullToken;
  mx?: FullToken;
  my?: FullToken;

  p?: FullToken;
  pt?: FullToken;
  pr?: FullToken;
  pb?: FullToken;
  pl?: FullToken;
  ps?: FullToken;
  pe?: FullToken;
  pis?: FullToken;
  pie?: FullToken;
  px?: FullToken;
  py?: FullToken;

  radius?: FullToken;
  bd?: React.CSSProperties["border"];
  bg?: React.CSSProperties["background"] | Colors;
  bc?: React.CSSProperties["borderColor"] | Colors;
  color?: React.CSSProperties["color"] | Colors;

  ff?: FamilyToken | (string & {});
  fz?: FullToken;
  fw?: React.CSSProperties["fontWeight"];
  lts?: React.CSSProperties["letterSpacing"];
  ta?: React.CSSProperties["textAlign"];
  lh?: FullToken | HeadingToken;
  fs?: React.CSSProperties["fontStyle"];
  tt?: React.CSSProperties["textTransform"];
  td?: React.CSSProperties["textDecoration"];

  w?: React.CSSProperties["width"];
  miw?: React.CSSProperties["minWidth"];
  maw?: React.CSSProperties["maxWidth"];
  h?: React.CSSProperties["height"];
  mih?: React.CSSProperties["minHeight"];
  mah?: React.CSSProperties["maxHeight"];

  pos?: React.CSSProperties["position"];
  top?: React.CSSProperties["top"];
  right?: React.CSSProperties["right"];
  bottom?: React.CSSProperties["bottom"];
  left?: React.CSSProperties["left"];
  inset?: React.CSSProperties["inset"];

  display?: React.CSSProperties["display"];
  flex?: React.CSSProperties["flex"];

  opacity?: React.CSSProperties["opacity"];

  cursor?: React.CSSProperties["cursor"];
  overflow?: React.CSSProperties["overflow"];
};
