import React from "react";
import * as S from "./styles";
import StyledButton from "@/components/common/StyledButton";
import { PlaceInfo } from "@/types/map";

interface Props {
  places: PlaceInfo[];
  handleBattleClick: (places: PlaceInfo[]) => void;
}

const BattleButton: React.FC<Props> = ({ places, handleBattleClick }) => {
  return (
    <S.ButtonContainer>
      <StyledButton
        width="120px"
        buttonType="secondary"
        text="대진표 만들기"
        size="small"
        onClick={() => handleBattleClick(places)}
      />
    </S.ButtonContainer>
  );
};

export default BattleButton;
