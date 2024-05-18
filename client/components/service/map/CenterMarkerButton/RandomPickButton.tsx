import styled from "styled-components";

import StyledButton from "@/components/common/StyledButton";
import Gap from "@/components/common/Gap";
import PlaceInfoCard from "../PlaceInfoCard";

import { openModal } from "@/store/modalSlice";
import { AppDispatch } from "@/store";
import { PlaceInfo } from "@/types/map";

interface Props {
  items: PlaceInfo[];
  dispatch: AppDispatch;
}

const getRandomItems = (arr: PlaceInfo[], num: number) => {
  if (arr.length <= num) {
    return arr;
  }
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const RandomPickButton = ({ items, dispatch }: Props) => {
  const handleRandomPick = () => {
    const randomItems = getRandomItems(items, 2);
    dispatch(
      openModal(
        <ModalInnerWrapper>
          <CardWrapper>
            {randomItems.map((place, index) => (
              <PlaceInfoCard key={index} place={place} />
            ))}
          </CardWrapper>
          <Gap side={20} />
          <StyledButton
            width="200px"
            text="다시 추천 받기"
            onClick={handleRandomPick}
            buttonType="primary"
            size="small"
          />
        </ModalInnerWrapper>
      )
    );
  };

  return (
    <StyledButton
      width="120px"
      buttonType="secondary"
      text="랜덤 추천 받기"
      size="small"
      onClick={handleRandomPick}
    />
  );
};

export default RandomPickButton;

const ModalInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
