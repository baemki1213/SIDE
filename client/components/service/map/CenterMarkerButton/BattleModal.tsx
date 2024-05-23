import styled from "styled-components";
import React, { useState } from "react";

import createBrackets from "@/utils/functions/map/createBrackets";

import StyledText from "@/components/common/StyledText";
import StyledButton from "@/components/common/StyledButton";
import Gap from "@/components/common/Gap";
import PlaceInfoContent from "../PlaceInfoCard/PlaceInfoContent";

import { colors } from "@/styles/assets";
import { PlaceInfo } from "@/types/map";

interface BattleModalProps {
  places: PlaceInfo[];
  onFinalSelection: (e: React.MouseEvent, place: PlaceInfo) => void;
}

const BattleModal: React.FC<BattleModalProps> = ({
  places,
  onFinalSelection,
}) => {
  const [rounds, setRounds] = useState(createBrackets(places));
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const currentRound = rounds[currentRoundIndex];
  const isLastRound = rounds.length === currentRoundIndex + 1;
  const isFinal = rounds.length === 1 && isLastRound;

  const handleSelect = (place: PlaceInfo) => {
    const selectedPlace = currentRound.filter(
      (roundPlace: PlaceInfo) => roundPlace === place
    );

    setRounds((prev: PlaceInfo[]) => {
      const newArray = [...prev];
      newArray[currentRoundIndex] = selectedPlace;
      return newArray;
    });

    setCurrentRoundIndex(currentRoundIndex + 1);
  };

  const handleLast = (place: PlaceInfo) => {
    handleSelect(place);
    setCurrentRoundIndex(0);
    setRounds(createBrackets(rounds.flat()));
  };
  const handleFinish = (e: React.MouseEvent, round: PlaceInfo) => {
    onFinalSelection(e, round);
  };

  return (
    <Container>
      <TextWrapper>
        <StyledText
          fontColor="black47"
          fontWeight="bold"
          fontSize="lg"
          text={`이번 라운드 ${currentRoundIndex + 1}/${rounds.length}`}
        />
        <Gap side={5} />
        <StyledText
          text={`(최종 선택까지 계속 반복됩니다.)`}
          fontColor="gray59"
        />
      </TextWrapper>
      <Gap side={10} />
      <MatchContainer>
        {currentRound.map((round: PlaceInfo, index: number) => {
          return (
            <CardWrapper key={index}>
              <PlaceInfoContent place={round} />
              <Gap side={10} />
              <StyledButton
                buttonType="primary"
                size="medium"
                text={
                  isLastRound
                    ? isFinal
                      ? "최종선택"
                      : "선택하고 다음 라운드 진행"
                    : "선택"
                }
                onClick={
                  isLastRound
                    ? isFinal
                      ? (e: React.MouseEvent) => handleFinish(e, round)
                      : () => handleLast(round)
                    : () => handleSelect(round)
                }
              />
            </CardWrapper>
          );
        })}
      </MatchContainer>
    </Container>
  );
};

export default BattleModal;

const Container = styled.div``;

const MatchContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

const CardWrapper = styled.div`
  min-height: 200px;
  border: 1px solid ${colors.pointColor};
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;
