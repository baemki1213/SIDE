import styled from "styled-components";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import NaverLoginButton from "./NaverLoginButton";
import StyledText from "@/components/common/StyledText";
import { colors } from "@/styles/assets";

export default function SocialButtons() {
  return (
    <ButtonsContainer>
      <StyledText
        text="SNS계정으로 간편하게 회원가입"
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
  padding-bottom: 30px;
  border-bottom: 1px solid ${colors.grayEd};
`;

const ButtonsWrapper = styled.div`
  width: 357px;
  display: flex;
  justify-content: center;
`;
