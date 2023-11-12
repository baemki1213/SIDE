import styled from "styled-components";

import StyledText from "@/components/common/StyledText";

export default function LoginTitle() {
  return (
    <TitleContainer>
      <StyledText text="logo" fontSize="xl4" />
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
