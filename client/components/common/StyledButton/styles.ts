import styled from "styled-components";

import {
  ButtonSizeKey,
  ButtonStyleKey,
  buttonSizeTheme,
  buttonStyle,
} from "@/styles/assets/button";
import { colors } from "@/styles/assets";

export const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.button<{
  width: string;
  size: ButtonSizeKey;
  buttonType: ButtonStyleKey;
  borderRadius: string;
  disabled: boolean;
  opacity: number;
}>`
  opacity: ${({ opacity }) => opacity};
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

  &:hover {
    opacity: 1;
  }

  &:active {
    box-shadow: 0 4px ${({ theme }) => theme.colors.grayEd};
    transform: translateY(4px);
  }
`;
