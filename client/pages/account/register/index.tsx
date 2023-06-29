import { ChangeEvent, useState } from "react";

import * as S from "./styles";

import StyledText from "@/components/common/StyledText";
import TextInput from "@/components/common/TextInput";
import SocialButtons from "@/components/account/SocialButtons";
import StyledButton from "@/components/common/StyledButton";
import Gap from "@/components/common/Gap";

export default function RegisterPage() {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    password2: "",
    nickname: "",
  });
  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(e.target.value);
  };
  const handleEmailVerifyClick = () => {
    console.log("click verify");
  };
  const handleSignUpClick = () => {
    console.log("click sign up");
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

        <S.Form>
          <TextInput
            labelText="이메일"
            name="email"
            value={registerInfo.email}
            onChange={handleOnChange}
            type="email"
            placeholder="이메일"
          />
          <Gap side={12} />
          <StyledButton
            text="이메일 인증하기"
            onClick={handleEmailVerifyClick}
            buttonType="disabled"
          />
          <Gap side={30} />
          <TextInput
            labelText="비밀번호"
            infoText="영문, 숫자를 포함한 8자리 이상의 비밀번호를 입력해주세요."
            name="password1"
            value={registerInfo.password}
            onChange={handleOnChange}
            type="password"
            placeholder="비밀번호"
          />
          <Gap side={30} />
          <TextInput
            labelText="비밀번호 확인"
            name="password2"
            value={registerInfo.password}
            onChange={handleOnChange}
            type="password"
            placeholder="비밀번호 확인"
          />
          <Gap side={30} />
          <TextInput
            labelText="닉네임"
            infoText="다른 유저와 겹치지 않도록 입력해주세요."
            name="nickname"
            value={registerInfo.nickname}
            onChange={handleOnChange}
            type="text"
            placeholder="별명 (2~15자)"
          />
          <Gap side={30} />
          <StyledButton
            type="button"
            text="회원가입하기"
            onClick={handleSignUpClick}
            buttonType="primary"
          />
          <Gap side={30} />
          <S.SignInWrapper>
            <StyledText text="이미 아이디가 있으신가요?" />
            <Gap side={10} />
            <S.SignInTextButton>
              <StyledText text="로그인" textDecoration="underline" />
            </S.SignInTextButton>
          </S.SignInWrapper>
        </S.Form>
      </S.Wrapper>
    </S.Container>
  );
}
