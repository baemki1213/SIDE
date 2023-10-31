import { colors } from "@/styles/assets";
import styled from "styled-components";

export const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextInputTextBox = styled.input<{ isValid: boolean }>`
  width: 100%;
  height: 38px;
  padding: 0 15px;
  border: 1px solid ${props => (props.isValid ? colors.grayDb : colors.redFF)};
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
