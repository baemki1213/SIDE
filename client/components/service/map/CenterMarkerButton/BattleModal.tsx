import React, { useState } from "react";

import Gap from "@/components/common/Gap";
import StyledButton from "@/components/common/StyledButton";
import Text from "@/components/common/Text";

import { PlaceInfo } from "@/types/map";
import createBrackets from "@/utils/functions/map/createBrackets";

import PlaceInfoContent from "../PlaceInfoCard/PlaceInfoContent";

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
      (roundPlace: PlaceInfo) => roundPlace === place,
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
    <div>
      <div className="flex items-center">
        <Text className="text-black-47 font-bold text-lg">
          🏟️ {isFinal ? "마지막" : "이번"} 라운드 {currentRoundIndex + 1}/
          {rounds.length}
        </Text>
        <Gap side={5} />
        <Text className="text-gray-59 text-sm">
          (최종 선택까지 계속 반복됩니다.)
        </Text>
      </div>

      <Gap side={10} />

      <div className="flex items-center gap-[20px]">
        {currentRound.map((round: PlaceInfo, index: number) => (
          <div
            key={index}
            className="min-h-[200px] border border-point rounded-[10px] p-[20px] flex flex-col items-center justify-center"
          >
            <PlaceInfoContent place={round} />
            <Gap side={10} />
            <StyledButton
              buttonType="primary"
              size="medium"
              text={
                isLastRound
                  ? isFinal
                    ? "최종선택 🏆"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleModal;
