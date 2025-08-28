import { style } from "@vanilla-extract/css";

import { colors, fontSize, fontWeight } from "@/styles/assets";

export const container = style({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
});

export const logoBox = style({
  width: "70px",
  height: "70px",
  position: "relative",
});

export const title = style({
  color: colors.pointColor,
  fontSize: fontSize.xl4.size,
  fontWeight: fontWeight.bold,
});
