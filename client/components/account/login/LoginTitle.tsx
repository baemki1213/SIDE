import Gap from "@/components/common/Gap";
import StyledText from "@/components/common/StyledText";
import styled from "styled-components";

export default function LoginTitle() {
  return (
    <TitleContainer>
      <StyledText text="logo" fontSize="xl4" />
      <Gap side={20} />
      <StyledText text="M.T" fontSize="xl4" textAlign="center" />
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
