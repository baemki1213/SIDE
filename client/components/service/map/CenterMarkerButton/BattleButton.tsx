import { useState } from "react";

import * as S from "./styles";
import StyledButton from "@/components/common/StyledButton";

const BattleButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <S.ButtonContainer>
      <StyledButton
        width="120px"
        buttonType="secondary"
        text="대진표 만들기"
        size="small"
        onClick={() => setIsModalOpen(true)}
      />
    </S.ButtonContainer>
  );
};

export default BattleButton;
