import styled from "styled-components";

export default function KakaoLoginButton() {
  return <KakaoLoginButtonContainer>kakao</KakaoLoginButtonContainer>;
}

const KakaoLoginButtonContainer = styled.button`
  width: 48px;
  aspect-ratio: 1;
  border-radius: 100%;
  background-color: yellow;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
