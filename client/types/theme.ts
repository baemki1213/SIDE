// 🎨 Tailwind Theme Variables 타입 정의
export type ThemeColor =
  | "point"
  | "main"
  | "main-white"
  | "gray-26"
  | "gray-59"
  | "gray-8c"
  | "gray-75"
  | "gray-130"
  | "gray-db"
  | "gray-ed"
  | "white"
  | "black"
  | "black-47"
  | "transparent"
  | "red-ff"
  | "gray-disabled-back"
  | "gray-disabled-color"
  | "gray-disabled-border";

export type ThemeSize =
  | "xxs"
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

export type ThemeWeight =
  | "regular"
  | "medium"
  | "semi-bold"
  | "bold"
  | "extra-bold";

export type ThemeSpacing = "marker" | "control" | "map-padding";

export type ThemeShadow = "map-control" | "info-window" | "floating";

// 🎯 CVA에서 사용할 수 있는 통합 타입
export interface ThemeVariants {
  color?: ThemeColor;
  size?: ThemeSize;
  weight?: ThemeWeight;
}

// 🔄 기존 시스템과 호환성을 위한 매핑 타입
export interface LegacyThemeMapping {
  // 기존 ColorKeyTypes → 새 ThemeColor 매핑
  pointColor: "point";
  mainColor: "main";
  mainWhite: "main-white";
  gray26: "gray-26";
  gray59: "gray-59";
  gray8c: "gray-8c";
  gray75: "gray-75";
  gray130: "gray-130";
  grayDb: "gray-db";
  grayEd: "gray-ed";
  white: "white";
  redFF: "red-ff";
  black: "black";
  black47: "black-47";
  transparent: "transparent";
}
