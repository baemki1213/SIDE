import { ChangeEvent, useState } from "react";
import Link from "next/link";

import useEmailValidation from "@/hooks/account/register/formValidation/useEmailValidation";
import usePasswordValidation from "@/hooks/account/register/formValidation/usePasswordValidation";
import useNicknameValidation from "@/hooks/account/register/formValidation/useNicknameValidation";
import {
  useEmailVerification,
  useNicknameVerification,
} from "@/hooks/account/register/authentication";
import { useSignUp } from "@/hooks/account/register/authentication/useSignUp";

import * as S from "./styles";
import StyledText from "@/components/common/StyledText";
import TextInput from "@/components/common/TextInput";
// import SocialButtons from "@/components/account/SocialButtons";
import StyledButton from "@/components/common/StyledButton";
import Gap from "@/components/common/Gap";
import EmailVerifyContainer from "@/components/account/register/EmailVerifyContainer";
import Modal from "@/components/common/Modal";
import ModalContent from "@/components/account/register/ModalContent";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const { isValid: emailIsValid, setIsValid: setEmailIsValid } =
    useEmailValidation(email);
  const { isPassword1Valid, isPassword2Valid } = usePasswordValidation(
    password,
    password2
  );
  const { isValid: isNicknameValid, setIsValid: setIsNicknameValid } =
    useNicknameValidation(nickname);

  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);
  const [isVerifiedEmailCode, setIsVerifiedEmailCode] = useState(false);
  const verifyButtonIsDisabled = !emailIsValid || isVerificationEmailSent;

  const { verifyEmail, isLoading: isVerifyEmailLoading } = useEmailVerification(
    setIsVerificationEmailSent,
    setErrorMessage,
    setEmailIsValid
  );
  const {
    verifyName,
    isSuccess: nicknameIsSuccess,
    isLoading: nicknameIsLoading,
  } = useNicknameVerification(setIsNicknameValid, setErrorMessage);
  const {
    createUserMutate,
    isLoading: signUpIsLoading,
    isSuccess: signUpIsSuccess,
    isError: signUpIsError,
    error: signUpError,
  } = useSignUp(setIsModalOpen);

  const handleEmailVerifyClick = () => {
    if (email) {
      verifyEmail({ email });
    }
  };

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

  const handleSignUpClick = async () => {
    createUserMutate({ email, password, nickname });
  };

  const handleNickNameCheck = async () => {
    if (nickname) {
      verifyName({ nickname });
    }
  };
  const handleHide = () => {
    setIsModalOpen(false);
  };
  const modalConfirmHandler = () => {
    if (signUpIsLoading) {
      return undefined;
    }
    if (signUpIsError) {
      return handleHide;
    }
    if (signUpIsSuccess) {
      return router.push("/account/login");
    }
  };
  const modalText = () => {
    if (signUpIsSuccess) {
      return "회원가입이 완료되었습니다!";
    }
    if (signUpIsError) {
      return `오류 발생 : ${signUpError?.response.message}`;
    } else {
      return "";
    }
  };
  const signUpButtonIsValid =
    isVerifiedEmailCode &&
    isPassword1Valid &&
    isPassword2Valid &&
    nicknameIsSuccess;

  return (
    <S.Container>
      <Modal
        isShowing={isModalOpen}
        hide={handleHide}
        confirmHandler={modalConfirmHandler}
      >
        <ModalContent
          isError={signUpIsError}
          isLoading={signUpIsLoading}
          isSuccess={signUpIsSuccess}
          text={modalText()}
        />
      </Modal>
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
            isLoading={isVerifyEmailLoading}
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
            disabled={nicknameIsSuccess}
            isValid={nickname ? isNicknameValid || nicknameIsSuccess : true}
            errorMessage={errorMessage.nickname}
            placeholder="닉네임 (2~10자)"
            buttonComponent={
              <StyledButton
                width="80px"
                buttonType={nicknameIsSuccess ? "disabled" : "primary"}
                disabled={nicknameIsSuccess}
                onClick={handleNickNameCheck}
                text={nicknameIsSuccess ? "OK!" : "중복확인"}
                size="small"
                isLoading={nicknameIsLoading}
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
