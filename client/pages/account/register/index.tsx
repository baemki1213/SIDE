import { ChangeEvent, useState } from "react";
import Link from "next/link";

import * as S from "./styles";

import StyledText from "@/components/common/StyledText";
import TextInput from "@/components/common/TextInput";
import SocialButtons from "@/components/account/SocialButtons";
import StyledButton from "@/components/common/StyledButton";
import Gap from "@/components/common/Gap";

import { createUser } from "@/api";

export default function RegisterPage() {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    password2: "",
    nickname: "",
  });
  const { email, password, nickname } = registerInfo;

  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };
  const handleEmailVerifyClick = () => {
    console.log("click verify");
  };
  const handleSignUpClick = () => {
    createUser({ email, password, nickname });
  };

  return (
    <S.Container>
      <S.Wrapper>
        <StyledText
          text="Sign up"
          fontColor="black47"
          fontWeight="bold"
          fontSize="xl"
        />

        <SocialButtons />

        <S.Form>
          <TextInput
            labelText="Email"
            name="email"
            value={registerInfo.email}
            onChange={handleOnChange}
            type="email"
            placeholder="Email"
          />
          <Gap side={12} />
          <StyledButton
            text="Verify Email"
            onClick={handleEmailVerifyClick}
            buttonType="disabled"
          />
          <Gap side={30} />
          <TextInput
            labelText="Password"
            infoText="Please enter a password of at least 8 characters, including letters and numbers"
            name="password"
            value={registerInfo.password}
            onChange={handleOnChange}
            type="password"
            placeholder="Password"
          />
          <Gap side={30} />
          <TextInput
            labelText="Confirm password"
            name="password2"
            value={registerInfo.password2}
            onChange={handleOnChange}
            type="password"
            placeholder="Confirm password"
          />
          <Gap side={30} />
          <TextInput
            labelText="Nickname"
            infoText="Please enter a password that does not overlap with other users"
            name="nickname"
            value={registerInfo.nickname}
            onChange={handleOnChange}
            type="text"
            placeholder="Nickname (2~15 character)"
          />
          <Gap side={30} />
          <StyledButton
            type="button"
            text="Sign up"
            onClick={handleSignUpClick}
            buttonType="primary"
          />
          <Gap side={30} />
          <S.SignInWrapper>
            <StyledText text="Do you already have an account?" />
            <Gap side={10} />
            <Link href={"/account/login/"}>
              <StyledText text="Login" textDecoration="underline" />
            </Link>
          </S.SignInWrapper>
        </S.Form>
      </S.Wrapper>
    </S.Container>
  );
}
