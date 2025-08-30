import { style } from "@vanilla-extract/css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";

import { colors } from "@/styles/assets";

// 기본 버튼 스타일
const baseButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease",
  fontFamily: "inherit",

  ":hover": {
    opacity: 0.9,
  },

  ":active": {
    boxShadow: `0 3px ${colors.grayEd}`,
    transform: "translateY(3px)",
  },

  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.6,
  },
});

// 로딩 컨테이너 스타일
export const loadingContainer = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// 버튼 recipe 정의
export const buttonRecipe = recipe({
  base: baseButton,
  variants: {
    variant: {
      primary: {
        backgroundColor: colors.pointColor,
        color: colors.mainWhite,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
      },
      secondary: {
        backgroundColor: colors.mainWhite,
        color: colors.pointColor,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: colors.pointColor,
      },
      ghost: {
        backgroundColor: colors.grayDisabledBack,
        color: colors.grayDisabledColor,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: colors.grayDisabledBorder,
      },
      disabled: {
        backgroundColor: colors.grayDisabledBack,
        color: colors.grayDisabledColor,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: colors.grayDisabledBorder,
      },
    },
    size: {
      xLarge: {
        fontSize: "18px",
        fontWeight: 700,
        height: "63px",
      },
      large: {
        fontSize: "16px",
        fontWeight: 700,
        height: "54px",
      },
      regular: {
        fontSize: "16px",
        fontWeight: 700,
        height: "50px",
      },
      medium: {
        fontSize: "14px",
        fontWeight: 600,
        height: "48px",
      },
      small: {
        fontSize: "12px",
        fontWeight: 600,
        height: "40px",
      },
      xSmall: {
        fontSize: "12px",
        fontWeight: 600,
        height: "30px",
      },
    },
    width: {
      full: {
        width: "100%",
      },
      auto: {
        width: "auto",
      },
      fit: {
        width: "fit-content",
      },
    },
    iconPosition: {
      left: {
        flexDirection: "row",
        gap: "8px",
      },
      right: {
        flexDirection: "row-reverse",
        gap: "8px",
      },
      none: {},
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "regular",
    width: "full",
    iconPosition: "none",
  },
});

// 타입을 더 명확하게 정의
export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;
export type ButtonVariant = NonNullable<ButtonVariants>["variant"];
export type ButtonSize = NonNullable<ButtonVariants>["size"];
export type ButtonWidth = NonNullable<ButtonVariants>["width"];
export type ButtonIconPosition = NonNullable<ButtonVariants>["iconPosition"];
