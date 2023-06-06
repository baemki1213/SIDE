import styled from "styled-components";

import {
  ButtonSizeKey,
  ButtonStyleKey,
  buttonSizeTheme,
  buttonStyle,
} from "@/styles/assets/button";
import { colors } from "@/styles/assets";

export const Container = styled.button<{
  width: string;
  size: ButtonSizeKey;
  buttonType: ButtonStyleKey;
  borderRadius: string;
  disabled: boolean;
}>`
  width: ${({ width }) => width};
  height: ${({ size }) => buttonSizeTheme[size]?.buttonHeight};
  background-color: ${({ buttonType }) =>
    colors[buttonStyle[buttonType]?.backgroundColor]};
  border-width: ${({ buttonType }) =>
    buttonStyle[buttonType]?.border.borderWidth};
  border-style: ${({ buttonType }) =>
    buttonStyle[buttonType]?.border.borderStyle};
  border-color: ${({ buttonType }) =>
    colors[buttonStyle[buttonType]?.border.borderColor]};
  border-radius: ${({ borderRadius }) => borderRadius};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
