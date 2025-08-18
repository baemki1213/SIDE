import styled from "styled-components";

import StyledText from "@/components/common/StyledText";

import { colors } from "@/styles/assets";

import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import NaverLoginButton from "./NaverLoginButton";

export default function SocialButtons() {
  return (
    <ButtonsContainer>
      <StyledText
        text="SNS계정으로 간편가입"
        fontColor="gray75"
        fontSize="xs"
        textAlign="center"
      />
      <ButtonsWrapper>
        <GoogleLoginButton />
        <KakaoLoginButton />
        <NaverLoginButton />
      </ButtonsWrapper>
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;
  border-bottom: 1px solid ${colors.grayEd};
  padding-bottom: 30px;
  margin: 30px 0;
`;

const ButtonsWrapper = styled.div`
  width: 357px;
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;
