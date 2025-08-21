import { ChangeEvent } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import { useLogin } from "@/hooks/user/login/useLogin";
import useEmailValidation from "@/hooks/user/register/formValidation/useEmailValidation";

import TextButton from "@/components/client/common/TextButton";
import Gap from "@/components/common/Gap";
import Button from "@/components/common/StyledButton";
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

  const { mutate: login, isPending: loginIsLoading } = useLogin();
  const loginIsValid = EmailIsValid;

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
        value={password}
        type="password"
      />
      <ButtonWrapper>
        <Button
          text="로그인"
          variant="primary"
          onClick={handleLoginClick}
          disabled={!loginIsValid}
          isLoading={loginIsLoading}
        />
      </ButtonWrapper>
      <TextButtonWrapper data-testid="form-footer">
        <TextButton
          text="비밀번호 재설정"
          onClick={handleResetClick}
          className="text-sm font-normal text-gray-8c hover:text-primary transition-colors"
        />
        <Gap side={20} />
        <TextButton
          text="회원가입"
          onClick={handleSignUpClick}
          className="text-sm font-normal text-gray-8c hover:text-primary transition-colors"
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
