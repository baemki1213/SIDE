import { ChangeEvent, HTMLInputTypeAttribute } from "react";

import Gap from "../Gap";
import Text from "../Text";
import * as S from "./styles";

interface IProps {
  disabled?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  infoText?: string;
  labelText?: string;
  regex?: RegExp; // 정규식 추가
  isValid?: boolean;
  errorMessage?: string; // 에러 메시지 추가
  buttonComponent?: React.ReactNode; // 버튼 컴포넌트 추가
  maxLength?: number;
  height?: number;
}

export default function TextInput({
  disabled = false,
  value,
  onChange,
  name,
  type = "text",
  placeholder,
  infoText,
  labelText,
  isValid = true,
  errorMessage,
  buttonComponent,
  maxLength,
  height,
}: IProps) {
  return (
    <S.TextInputContainer>
      {labelText && (
        <Text className="text-black-47 text-xl font-bold">{labelText}</Text>
      )}
      <Gap side={12} />
      {infoText && (
        <S.TextInfoWRapper>
          <Text className="text-gray-130 text-base font-normal">
            {infoText}
          </Text>
        </S.TextInfoWRapper>
      )}
      <S.InputWrapper>
        <S.TextInputTextBox
          disabled={disabled}
          value={value}
          onChange={onChange}
          name={name}
          aria-label={name}
          type={type}
          placeholder={placeholder}
          isValid={isValid}
          maxLength={maxLength}
          height={height}
        />
        {buttonComponent && (
          <S.ButtonWrapper>{buttonComponent}</S.ButtonWrapper>
        )}
      </S.InputWrapper>
      {!isValid && errorMessage && (
        <>
          <Gap side={10} />
          <Text className="text-red-ff text-sm font-normal">
            {errorMessage}
          </Text>
        </>
      )}
    </S.TextInputContainer>
  );
}
