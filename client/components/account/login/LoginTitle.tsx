import styled from "styled-components";
import Image from "next/image";

import StyledText from "@/components/common/StyledText";

import logoImage from "@/asset/Logo.png";

export default function LoginTitle() {
  return (
    <TitleContainer data-testid="logo-container">
      <LogoContainer>
        <Image src={logoImage} alt="Mapack logo" width={70} height={70} />
      </LogoContainer>
      <StyledText
        text="Mapack"
        fontSize="xl4"
        fontColor="pointColor"
        fontWeight="bold"
      />
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
`;
