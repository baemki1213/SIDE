import { ButtonHTMLAttributes, ReactNode } from "react";
import {
  ButtonSizeKey,
  ButtonStyleKey,
  buttonSizeTheme,
  buttonStyle,
} from "@/styles/assets/button";
import * as S from "./styles";

import StyledText from "../StyledText";

interface IProps {
  children?: ReactNode;
  text?: string;
  buttonType: ButtonStyleKey;
  type?: "button" | "submit" | "reset";
  size?: ButtonSizeKey;
  width?: string;
  onClick(): void;
  disabled?: boolean;
  borderRadius?: string;
  icon?: "right" | "left";
}

export default function StyledButton({
  children = null,
  text = "",
  buttonType = "primary",
  type = "button",
  size = "regular",
  width = "100%",
  onClick = () => console.log(),
  disabled = false,
  borderRadius = "4px",
  icon,
}: IProps) {
  return (
    <S.Container
      width={width}
      buttonType={buttonType}
      size={size}
      onClick={onClick}
      disabled={disabled}
      borderRadius={borderRadius}
      type={type}
    >
      {children}
      {icon === "left" && <>let</>}
      {text && (
        <StyledText
          text={text}
          fontColor={buttonStyle[buttonType].fontColor}
          fontWeight={buttonSizeTheme[size].fontWeight}
          fontSize={buttonSizeTheme[size].fontSize}
          textAlign="center"
        />
      )}
      {icon === "right" && <>right</>}
    </S.Container>
  );
}
