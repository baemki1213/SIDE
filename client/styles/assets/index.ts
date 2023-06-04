import { DefaultTheme } from "styled-components";

export const colors = {
  mainColor: "aliceblue",
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
};

export const fontSize: {
  [key: string]: {
    size: string;
    height: string;
  };
} = {
  xxs: { size: "10px", height: "14px" },
  xs: { size: "12px", height: "16px" },
  sm: { size: "14px", height: "18px" },
  base: { size: "16px", height: "22px" },
  lg: { size: "18px", height: "26px" },
  xl: { size: "20px", height: "28px" },
  xl2: { size: "24px", height: "32px" },
  xl3: { size: "30px", height: "36px" },
  xl4: { size: "36px", height: "normal" },
};

export const fontWeight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
};

export type FontWeightTypes = typeof fontWeight;
export type FontWeightKeyTypes = keyof typeof fontWeight;
export type FontSizeTypes = typeof fontSize;
export type FontSizeKeyTypes = keyof typeof fontSize;
export type ColorTypes = typeof colors;
export type ColorKeyTypes = keyof typeof colors;

const lightTheme: DefaultTheme = { fontWeight, fontSize, colors };
const darkTheme: DefaultTheme = { fontWeight, fontSize, colors };

export { lightTheme, darkTheme };
