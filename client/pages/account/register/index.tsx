import { ChangeEvent, useState } from "react";
import Link from "next/link";

import { useEmailValidation } from "@/hooks/account/register/useEmailValidation";

import * as S from "./styles";
import StyledText from "@/components/common/StyledText";
import TextInput from "@/components/common/TextInput";
import SocialButtons from "@/components/account/SocialButtons";
import StyledButton from "@/components/common/StyledButton";
import Gap from "@/components/common/Gap";
import EmailVerifyContainer from "@/components/account/Register/EmailVerifyContainer";

import { createUser } from "@/api";
import { sendVerificationEmail } from "@/api/user";
import usePasswordValidation from "@/hooks/account/register/usePasswordValidation";

export default function RegisterPage() {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    password2: "",
    nickname: "",
  });
  const { email, password, password2, nickname } = registerInfo;
  const { isValid: emailIsValid } = useEmailValidation(email);
  const { isPassword1Valid, isPassword2Valid } = usePasswordValidation(
    password,
    password2
  );
  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);
  const [isVerifiedEmailCode, setIsVerifiedEmailCode] = useState(false);

  const verifyButtonIsDisabled = !emailIsValid || isVerificationEmailSent;

  const signUpButtonIsValid =
    isVerifiedEmailCode || isPassword1Valid || isPassword2Valid;

  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  const handleEmailVerifyClick = () => {
    sendVerificationEmail({ email });
    setIsVerificationEmailSent(true);
  };

  const handleSignUpClick = () => {
    createUser({ email, password, nickname });
  };

  const handleNickNameCheck = () => {
    console.log(nickname);
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
            disabled={isVerificationEmailSent}
            labelText="이메일"
            name="email"
            value={email}
            onChange={handleOnChange}
            type="email"
            placeholder="example@email.com"
          />
          <Gap side={12} />
          <StyledButton
            text={isVerifiedEmailCode ? "이메일 인증 완료" : "이메일 인증하기"}
            onClick={handleEmailVerifyClick}
            buttonType={verifyButtonIsDisabled ? "disabled" : "primary"}
            disabled={verifyButtonIsDisabled}
          />
          <Gap side={30} />
          {isVerificationEmailSent && !isVerifiedEmailCode && (
            <EmailVerifyContainer
              email={email}
              setIsVerifiedEmailCode={setIsVerifiedEmailCode}
            />
          )}
          <TextInput
            labelText="비밀번호"
            infoText="대문자, 소문자, 숫자, 특수문자 포함 8자 이상"
            name="password"
            value={password}
            onChange={handleOnChange}
            type="password"
            placeholder="비밀번호"
            isValid={password ? isPassword1Valid : true}
          />
          <Gap side={30} />
          <TextInput
            labelText="비밀번호 확인"
            name="password2"
            value={password2}
            onChange={handleOnChange}
            type="password"
            placeholder="비밀번호 확인"
            isValid={password2 ? isPassword2Valid : true}
          />
          <Gap side={30} />
          <TextInput
            labelText="닉네임"
            infoText="다른 유저와 겹치지 않도록 입력해주세요. (2~10자)"
            name="nickname"
            value={nickname}
            onChange={handleOnChange}
            type="text"
            placeholder="닉네임 (2~10자)"
            buttonComponent={
              <StyledButton
                width="48px"
                buttonType={"primary"}
                onClick={handleNickNameCheck}
                text="확인"
                size="small"
              />
            }
          />
          <Gap side={30} />
          <StyledButton
            type="button"
            text="회원가입하기"
            onClick={handleSignUpClick}
            buttonType={!signUpButtonIsValid ? "disabled" : "primary"}
            disabled={!signUpButtonIsValid}
          />
          <Gap side={30} />
          <S.SignInWrapper>
            <StyledText text="이미 아이디가 있다면?" />
            <Gap side={10} />
            <Link href={"/account/login/"}>
              <StyledText text="로그인" textDecoration="underline" />
            </Link>
          </S.SignInWrapper>
        </S.Form>
      </S.Wrapper>
    </S.Container>
  );
}
