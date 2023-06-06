import styled from "styled-components";

export default function NaverLoginButton() {
  return <NaverLoginButtonContainer>naver</NaverLoginButtonContainer>;
}

const NaverLoginButtonContainer = styled.button`
  width: 48px;
  aspect-ratio: 1;
  border-radius: 100%;
  background-color: greenyellow;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
