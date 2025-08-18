import { ChangeEvent } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import { useLogin } from "@/hooks/user/login/useLogin";
import useEmailValidation from "@/hooks/user/register/formValidation/useEmailValidation";
import usePasswordValidation from "@/hooks/user/register/formValidation/usePasswordValidation";

import Gap from "@/components/common/Gap";
import StyledButton from "@/components/common/StyledButton";
import StyledTextButton from "@/components/common/StyledTextButton";
import TextInput from "@/components/common/TextInput";

interface IProps {
  email: string;
  password: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function LoginForm({ email, password, handleChange }: IProps) {
  const router = useRouter();
  const { isValid: EmailIsValid } = useEmailValidation(email);
  const { isPassword1Valid: passwordIsValid } = usePasswordValidation(
    password,
    password,
  );
  const { mutate: login, isPending: loginIsLoading } = useLogin();
  const loginIsValid = EmailIsValid && passwordIsValid;

  const handleLoginClick = async () => {
    login({ email, password });
  };
  const handleResetClick = () => {
    router.push("/account/request-reset");
  };
  const handleSignUpClick = () => {
    router.push("/account/register");
  };

  return (
    <Form>
      <TextInput
        height={48}
        name="email"
        placeholder="이메일"
        onChange={handleChange}
        isValid={email ? EmailIsValid : true}
        value={email}
        errorMessage="이메일 형식이 올바르지 않습니다."
      />
      <TextInput
        height={48}
        name="password"
        placeholder="비밀번호"
        onChange={handleChange}
        isValid={password ? passwordIsValid : true}
        value={password}
        errorMessage="비밀번호 형식이 올바르지 않습니다."
        type="password"
      />
      <ButtonWrapper>
        <StyledButton
          text="로그인"
          buttonType={loginIsValid ? "primary" : "ghost"}
          onClick={handleLoginClick}
          disabled={!loginIsValid}
          isLoading={loginIsLoading}
        />
      </ButtonWrapper>
      <TextButtonWrapper data-testid="form-footer">
        <StyledTextButton
          buttonType="button"
          handleClick={handleResetClick}
          styleProps={{
            text: "비밀번호 재설정",
            fontWeight: "regular",
            fontColor: "gray8c",
          }}
        />
        <Gap side={20} />
        <StyledTextButton
          buttonType="button"
          handleClick={handleSignUpClick}
          styleProps={{
            text: "회원가입",
            fontWeight: "regular",
            fontColor: "gray8c",
          }}
        />
      </TextButtonWrapper>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  margin: 20px 0;
`;
const TextButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
