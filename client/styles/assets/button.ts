import { FontSizeKeyTypes, FontWeightKeyTypes, ColorKeyTypes } from ".";

interface IButtonStyle {
  [key: string]: IButtonStyleDetail;
  primary: IButtonStyleDetail;
  secondary: IButtonStyleDetail;
  ghost: IButtonStyleDetail;
  disabled: IButtonStyleDetail;
}

interface IButtonStyleDetail {
  backgroundColor: ColorKeyTypes;
  fontColor: ColorKeyTypes;
  border: {
    borderWidth: string;
    borderStyle: string;
    borderColor: ColorKeyTypes;
  };
}

interface IButtonSize {
  [key: string]: IButtonSizeDetail;
  xLarge: IButtonSizeDetail;
  large: IButtonSizeDetail;
  regular: IButtonSizeDetail;
  medium: IButtonSizeDetail;
  small: IButtonSizeDetail;
}
interface IButtonSizeDetail {
  fontSize: FontSizeKeyTypes;
  fontWeight: FontWeightKeyTypes;
  buttonHeight: string;
}
export const buttonSizeTheme: IButtonSize = {
  xLarge: {
    fontSize: "lg",
    fontWeight: "bold",
    buttonHeight: "63px",
  },
  large: {
    fontSize: "base",
    fontWeight: "bold",
    buttonHeight: "54px",
  },
  regular: {
    fontSize: "base",
    fontWeight: "bold",
    buttonHeight: "50px",
  },
  medium: {
    fontSize: "sm",
    fontWeight: "semiBold",
    buttonHeight: "48px",
  },
  small: {
    fontSize: "xs",
    fontWeight: "semiBold",
    buttonHeight: "40px",
  },
  xSmall: {
    fontSize: "xs",
    fontWeight: "semiBold",
    buttonHeight: "30px",
  },
};

export const buttonStyle: IButtonStyle = {
  primary: {
    backgroundColor: "pointColor",
    fontColor: "mainWhite",
    border: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "transparent",
    },
  },
  secondary: {
    backgroundColor: "mainWhite",
    fontColor: "pointColor",
    border: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "pointColor",
    },
  },
  ghost: {
    backgroundColor: "grayDisabledBack",
    fontColor: "grayDisabledColor",
    border: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "grayDisabledBorder",
    },
  },
  disabled: {
    backgroundColor: "grayDisabledBack",
    fontColor: "grayDisabledColor",
    border: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "grayDisabledBorder",
    },
  },
};

export type ButtonSizeKey = keyof IButtonSize;
export type ButtonStyleKey = keyof IButtonStyle;
