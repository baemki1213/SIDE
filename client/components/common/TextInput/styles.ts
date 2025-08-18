import styled from "styled-components";

import { colors } from "@/styles/assets";

export const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TextInputTextBox = styled.input<{
  isValid: boolean;
  height?: number;
}>`
  width: 100%;
  height: ${(props) => (props.height ? props.height : 38)}px;
  padding: 0 15px;
  border: 1px solid ${(props) => (props.isValid ? colors.grayDb : colors.redFF)};
  border-radius: 4px;
`;

export const TextInfoWRapper = styled.div`
  margin-bottom: 10px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  margin-left: 8px;
`;
