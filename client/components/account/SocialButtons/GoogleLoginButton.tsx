import { colors } from "@/styles/assets";
import styled from "styled-components";

export default function GoogleLoginButton() {
  return <GoogleLoginButtonContainer>google</GoogleLoginButtonContainer>;
}
const GoogleLoginButtonContainer = styled.button`
  width: 48px;
  border-radius: 100%;
  aspect-ratio: 1;
  background-color: ${colors.gray130};
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
