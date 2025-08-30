import { keyframes, style } from "@vanilla-extract/css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";

const slideUp = keyframes({
  from: { bottom: "-100%" },
  to: { bottom: "0" },
});

export const backdropRecipe = recipe({
  base: {
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    isShowing: {
      true: {
        display: "flex",
      },
      false: {
        display: "none",
      },
    },
  },
  defaultVariants: {
    isShowing: false,
  },
});

export const bottomSheet = style({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "white",
  height: "50%",
  overflow: "auto",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  animation: `${slideUp} 0.3s ease-out`,
  zIndex: 100,
  padding: "30px 10px",
});

// 닫기 버튼 스타일
export const closeButton = style({
  position: "absolute",
  top: "10px",
  left: "10px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "24px",
  padding: "5px",
  borderRadius: "4px",
  transition: "background-color 0.2s ease",

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});

export const contentWrapper = style({
  overflowX: "hidden",
  overflowY: "auto",
});

export type BackdropVariants = RecipeVariants<typeof backdropRecipe>;
