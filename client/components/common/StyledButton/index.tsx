import { ReactNode } from "react";
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
  size = "regular",
  width = "100%",
  onClick = () => console.log(),
  borderRadius = "4px",
  icon,
}: IProps) {
  return (
    <S.Container
      width={width}
      buttonType={buttonType}
      size={size}
      onClick={onClick}
      disabled={buttonType === "disabled"}
      borderRadius={borderRadius}
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
