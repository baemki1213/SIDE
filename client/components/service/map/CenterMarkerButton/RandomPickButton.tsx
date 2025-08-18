import { useRouter } from "next/router";

import styled from "styled-components";

import Gap from "@/components/common/Gap";
import StyledButton from "@/components/common/StyledButton";

import { AppDispatch } from "@/store";
import { openModal } from "@/store/modalSlice";
import { PlaceInfo } from "@/types/map";

import PlaceInfoCard from "../PlaceInfoCard";

interface Props {
  items: PlaceInfo[];
  isLogin: boolean;
  router: any;
  dispatch: AppDispatch;
}

const getRandomItems = (arr: PlaceInfo[], num: number) => {
  if (arr.length <= num) {
    return arr;
  }
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const RandomPickButton = ({ items, isLogin, router, dispatch }: Props) => {
  const handleRandomPick = () => {
    if (isLogin) {
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
          </ModalInnerWrapper>,
        ),
      );
    } else {
      alert("로그인 해주세요!");
    }
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
