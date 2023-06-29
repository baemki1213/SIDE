import styled from "styled-components";

import { colors } from "@/styles/assets";

export default function NaverLoginButton() {
  return <NaverLoginButtonContainer>naver</NaverLoginButtonContainer>;
}

const NaverLoginButtonContainer = styled.button`
  width: 48px;
  aspect-ratio: 1;
  border-radius: 100%;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.mainColor};
`;
