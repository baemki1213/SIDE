import Gap from "../Gap";
import StyledText from "../StyledText";
import * as S from "./styles";
import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

interface IProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  infoText?: string;
  labelText?: string;
  regex?: RegExp; // 정규식 추가
  errorMessage?: string; // 에러 메시지 추가
  buttonComponent?: React.ReactNode; // 버튼 컴포넌트 추가
}

export default function TextInput({
  value,
  onChange,
  name,
  type = "text",
  placeholder,
  infoText,
  labelText,
  regex,
  errorMessage,
  buttonComponent,
}: IProps) {
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChange(e);

    if (regex) {
      setIsValid(regex.test(e.target.value));
    }
  };

  return (
    <S.TextInputContainer>
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
        <S.TextInfoWRapper>
          <StyledText text={infoText} fontColor="gray130" />
        </S.TextInfoWRapper>
      )}
      <S.InputWrapper>
        <S.TextInputTextBox
          value={value}
          onChange={handleInputChange}
          name={name}
          aria-label={name}
          type={type}
          placeholder={placeholder}
          isValid={isValid}
        />
        {buttonComponent && (
          <S.ButtonWrapper>{buttonComponent}</S.ButtonWrapper>
        )}
      </S.InputWrapper>
      {!isValid && errorMessage && (
        <StyledText text={errorMessage} fontColor="redFF" />
      )}
    </S.TextInputContainer>
  );
}
