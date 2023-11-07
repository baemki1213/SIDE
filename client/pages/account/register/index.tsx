import { ChangeEvent, useState } from "react";
import Link from "next/link";

import useEmailValidation from "@/hooks/account/register/formValidation/useEmailValidation";
import usePasswordValidation from "@/hooks/account/register/formValidation/usePasswordValidation";
import useNicknameValidation from "@/hooks/account/register/formValidation/useNicknameValidation";

import * as S from "./styles";
import StyledText from "@/components/common/StyledText";
import TextInput from "@/components/common/TextInput";
import SocialButtons from "@/components/account/SocialButtons";
import StyledButton from "@/components/common/StyledButton";
import Gap from "@/components/common/Gap";
import EmailVerifyContainer from "@/components/account/Register/EmailVerifyContainer";

import { createUser } from "@/api";
import { checkNickname, sendVerificationEmail } from "@/api/user";

export default function RegisterPage() {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    password2: "",
    nickname: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
    password2: "",
    nickname: "",
  });
  const { email, password, password2, nickname } = registerInfo;
  const [isLoading, setIsLoading] = useState(false);
  const { isValid: emailIsValid, setIsValid: setEmailIsValid } =
    useEmailValidation(email);
  const { isPassword1Valid, isPassword2Valid } = usePasswordValidation(
    password,
    password2
  );
  const { isValid: isNicknameValid, setIsValid: setIsNicknameValid } =
    useNicknameValidation(nickname);
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);
  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);
  const [isVerifiedEmailCode, setIsVerifiedEmailCode] = useState(false);

  const verifyButtonIsDisabled = !emailIsValid || isVerificationEmailSent;

  const signUpButtonIsValid =
    isVerifiedEmailCode &&
    isPassword1Valid &&
    isPassword2Valid &&
    isCheckedNickname;

  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    switch (e.target.name) {
      case "nickname":
        setRegisterInfo({
          ...registerInfo,
          [e.target.name]: e.target.value.slice(0, 10),
        });
      default:
        setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
    }
    setErrorMessage({ ...errorMessage, [e.target.name]: "" });
  };

  const handleEmailVerifyClick = async () => {
    if (email) {
      setIsLoading(true);
      try {
        const result = await sendVerificationEmail({ email });
        switch (result.status) {
          case 200:
            return setIsVerificationEmailSent(true);
        }
      } catch (error: any) {
        switch (error.response.status) {
          case 400:
            setErrorMessage({
              ...errorMessage,
              email: error.response.data.message,
            });
            setEmailIsValid(false);
            return;
          case 500:
            return setErrorMessage({
              ...errorMessage,
              email: error.response.data.message,
            });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSignUpClick = async () => {
    try {
      setIsLoading(true);
      const result = await createUser({ email, password, nickname });
      switch (result.status) {
        case 200:
        // alert success modal 띄우기
        // 확인 누르면 로그인 페이지로 이동.
      }
    } catch (error) {
      // server error로 회원가입이 불가능하다고 alert
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleNickNameCheck = async () => {
    setIsLoading(true);
    if (nickname) {
      try {
        const result = await checkNickname({ nickname });
        switch (result.status) {
          case 200:
            return setIsCheckedNickname(true);
        }
      } catch (error: any) {
        switch (error.response.status) {
          case 409:
            setIsNicknameValid(false);
            setIsCheckedNickname(false);
            setErrorMessage({
              ...errorMessage,
              nickname: error.response.data.message,
            });
          case 500:
            setIsNicknameValid(false);
            setIsCheckedNickname(false);
            setErrorMessage({
              ...errorMessage,
              nickname: error.response.data.message,
            });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <>...loading</>;
  return (
    <S.Container>
      <S.Wrapper>
        <StyledText
          text="회원가입"
          fontColor="black47"
          fontWeight="bold"
          fontSize="xl"
        />

        {/* <SocialButtons /> */}
        <Gap side={30} />

        <S.Form>
          <TextInput
            disabled={isVerificationEmailSent}
            labelText="이메일"
            name="email"
            value={email}
            onChange={handleOnChange}
            type="email"
            placeholder="example@email.com"
            errorMessage={errorMessage.email}
            isValid={email ? emailIsValid : true}
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
            isValid={nickname ? isNicknameValid : true}
            errorMessage={errorMessage.nickname}
            placeholder="닉네임 (2~10자)"
            buttonComponent={
              <StyledButton
                width="80px"
                buttonType={isCheckedNickname ? "disabled" : "primary"}
                disabled={isCheckedNickname}
                onClick={handleNickNameCheck}
                text={isCheckedNickname ? "OK!" : "중복확인"}
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
