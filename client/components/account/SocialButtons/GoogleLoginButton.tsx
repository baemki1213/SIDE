import styled from "styled-components";

import { colors } from "@/styles/assets";

export default function GoogleLoginButton() {
  return <GoogleLoginButtonContainer>google</GoogleLoginButtonContainer>;
}
const GoogleLoginButtonContainer = styled.button`
  width: 48px;
  border-radius: 100%;
  aspect-ratio: 1;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.mainColor};
`;
