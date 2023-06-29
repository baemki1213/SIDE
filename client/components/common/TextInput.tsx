import styled from "styled-components";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";

import { colors } from "@/styles/assets";

import StyledText from "./StyledText";
import Gap from "./Gap";

interface IProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  infoText?: string;
  labelText?: string;
}

export default function TextInput({
  value,
  onChange,
  name,
  type = "text",
  placeholder,
  infoText,
  labelText,
}: IProps) {
  return (
    <TextInputContainer>
      {labelText && (
        <StyledText
          text={labelText}
          fontColor="black47"
          fontWeight="bold"
          fontSize="xl"
        />
      )}
      <Gap side={6} />
      {infoText && (
        <TextInfoWRapper>
          <StyledText text={infoText} fontColor="gray130" />
        </TextInfoWRapper>
      )}
      <TextInputTextBox
        value={value}
        onChange={onChange}
        name={name}
        aria-label={name}
        type={type}
        placeholder={placeholder}
      />
    </TextInputContainer>
  );
}

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextInputTextBox = styled.input`
  padding: 8px 15px 9px;
  border: 1px solid ${colors.grayDb};
  border-radius: 4px;
`;
const TextInfoWRapper = styled.div`
  margin-bottom: 10px;
`;
