import { colors } from "@/styles/assets";
import styled from "styled-components";

export default function GoogleLoginButton() {
  return <GoogleLoginButtonContainer></GoogleLoginButtonContainer>;
}
const GoogleLoginButtonContainer = styled.div`
  width: 48px;
  border-radius: 100%;
  aspect-ratio: 1;
  background-color: ${colors.gray130};
  margin: 0 10px;
`;
