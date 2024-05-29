import { ChangeEvent, useState } from "react";

import LoginForm from "@/components/account/login/LoginForm";
import LoginTitle from "@/components/account/login/LoginTitle";

import * as S from "../../../styles/account/login";

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    switch (e.target.name) {
      default:
        setLoginInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  return (
    <S.Container>
      <S.Wrapper>
        <LoginTitle />
        <LoginForm
          handleChange={handleChange}
          email={loginInfo.email}
          password={loginInfo.password}
        />
      </S.Wrapper>
    </S.Container>
  );
}
