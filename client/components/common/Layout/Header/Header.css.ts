import { style } from "@vanilla-extract/css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";

import { colors } from "@/styles/assets";

// 헤더 컨테이너
export const headerContainer = style({
  backgroundColor: colors.mainWhite,
  maxWidth: "100vw",
  zIndex: 100,
  userSelect: "none",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 12px",
  minHeight: "60px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

// 헤더 왼쪽
export const headerLeft = style({
  display: "flex",
  alignItems: "center",
});

// 헤더 오른쪽
export const headerRight = style({
  display: "flex",
  alignItems: "center",
  height: "30px",
});

// 구분선
export const headerColumn = style({
  width: "2px",
  height: "22px",
  marginRight: "5px",
  marginLeft: "5px",
  backgroundColor: colors.black47,
});

// 기본 아바타
export const headerDefaultAvatar = style({
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.pointColor,
  marginRight: "10px",
});

// 프로필 이미지 아바타
export const headerAvatar = style({
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  backgroundColor: colors.pointColor,
  marginRight: "10px",
  objectFit: "cover",
});

// 헤더 아이콘 recipe
export const headerIconRecipe = recipe({
  base: {
    marginRight: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "45px",
    borderRadius: "4px",
    transition: "background-color 0.2s ease",

    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },
  variants: {
    width: {
      default: { width: "45px" },
      small: { width: "30px" },
      medium: { width: "40px" },
      large: { width: "50px" },
    },
  },
  defaultVariants: {
    width: "default",
  },
});

export type HeaderIconVariants = RecipeVariants<typeof headerIconRecipe>;
export type HeaderIconWidth = NonNullable<HeaderIconVariants>["width"];
