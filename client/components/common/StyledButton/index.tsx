import { ReactNode } from "react";
import {
  ButtonSizeKey,
  ButtonStyleKey,
  buttonSizeTheme,
  buttonStyle,
} from "@/styles/assets/button";
import * as S from "./styles";

import StyledText from "../StyledText";
import { DotSpinner } from "../LoadingIndicator";

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
  iconPosition?: "right" | "left";
  icon?: ReactNode;
  isLoading?: boolean;
  opacity?: number;
}
interface IIconButtonProps {
  iconPosition?: "left" | "right";
  icon?: ReactNode;
  children?: ReactNode;
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
  iconPosition,
  icon,
  isLoading = false,
  opacity = 1,
}: IProps) {
  const IconButton = ({ iconPosition, icon, children }: IIconButtonProps) => {
    if (iconPosition === "left") {
      return (
        <>
          {icon}
          {children}
        </>
      );
    }
    if (iconPosition === "right") {
      return (
        <>
          {children}
          {icon}
        </>
      );
    }
    return <>{children}</>;
  };
  return (
    <S.Container
      opacity={opacity}
      width={width}
      buttonType={buttonType}
      size={size}
      onClick={onClick}
      disabled={disabled}
      borderRadius={borderRadius}
      type={type}
    >
      {isLoading ? (
        <S.LoadingContainer>
          <DotSpinner buttonType={buttonType} width="40px" size="5px" />
        </S.LoadingContainer>
      ) : (
        <IconButton iconPosition={iconPosition} icon={icon}>
          {children}
          {text && (
            <StyledText
              text={text}
              fontColor={buttonStyle[buttonType].fontColor}
              fontWeight={buttonSizeTheme[size].fontWeight}
              fontSize={buttonSizeTheme[size].fontSize}
              textAlign="center"
            />
          )}
        </IconButton>
      )}
    </S.Container>
  );
}
