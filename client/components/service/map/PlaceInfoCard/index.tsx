import { useCallback } from "react";

import styled from "styled-components";

import useSaveSelection from "@/hooks/map/useSaveSelection";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";

import Gap from "@/components/common/Gap";
import StyledButton from "@/components/common/StyledButton";
import StyledText from "@/components/common/StyledText";

import { selectAuthState } from "@/store/authSlice";
import { openModal } from "@/store/modalSlice";
import { showToast } from "@/store/toastSlice";
import { colors } from "@/styles/assets";
import { PlaceInfo } from "@/types/map";

import PlaceInfoContent from "./PlaceInfoContent";

interface Props {
  place: PlaceInfo;
}

const PlaceInfoCard = ({ place }: Props) => {
  const { userInfo } = useAppSelector(selectAuthState);

  const userId = userInfo.id;
  const dispatch = useAppDispatch();
  const handleSuccess = useCallback(() => {
    dispatch(
      openModal(
        <>
          <StyledText
            text="✅ 탁월한 선택입니다!"
            fontColor="black47"
            fontWeight="semiBold"
          />
          <StyledText
            text="선택한 장소들은 나의 기록에서 확인할 수 있어요!"
            fontColor="black47"
            fontWeight="semiBold"
          />
        </>,
      ),
    );
  }, [dispatch]);

  const handleError = useCallback(
    (error: any) => {
      dispatch(showToast(error.response.data.message));
    },
    [dispatch],
  );

  const { mutate: saveSelection } = useSaveSelection({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleSelectClick = useCallback(
    (e: React.MouseEvent, place: PlaceInfo) => {
      e.stopPropagation();
      saveSelection({ userId, place });
    },
    [saveSelection, userId],
  );

  return (
    <CardWrapper>
      <PlaceInfoContent place={place} />
      <Gap side={10} />
      <StyledButton
        buttonType="primary"
        text="선택하기"
        onClick={(e) => handleSelectClick(e, place)}
        size="medium"
      />
    </CardWrapper>
  );
};

export default PlaceInfoCard;

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
