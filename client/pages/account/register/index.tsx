import { ChangeEvent, useState } from "react";

import * as S from "./styles";

import StyledText from "@/components/common/StyledText";
import TextInput from "@/components/common/TextInput";
import SocialButtons from "@/components/account/SocialButtons";
import StyledButton from "@/components/common/StyledButton";

export default function RegisterPage() {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(e.target.value);
  };
  const handleEmailVerifyClick = () => {
    console.log("click verify");
  };
  return (
    <S.Container>
      <S.Wrapper>
        <StyledText
          text="회원가입"
          fontColor="black47"
          fontWeight="bold"
          fontSize="xl"
        />
        <SocialButtons />
        <TextInput
          labelText="이메일"
          name="email"
          value={registerInfo.email}
          onChange={handleOnChange}
          type="email"
          placeholder="이메일"
        />
        <StyledButton
          text="이메일 인증하기"
          onClick={handleEmailVerifyClick}
          buttonType="disabled"
        />
        <TextInput
          name="password1"
          value={registerInfo.password}
          onChange={handleOnChange}
          type="password"
          placeholder="비밀번호"
        />
        <TextInput
          name="password2"
          value={registerInfo.password}
          onChange={handleOnChange}
          type="password"
          placeholder="비밀번호"
        />
      </S.Wrapper>
    </S.Container>
  );
}
