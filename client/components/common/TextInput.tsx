import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import StyledText from "./StyledText";
import { colors } from "@/styles/assets";

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
      {infoText && <StyledText text={infoText} fontColor="gray130" />}
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
