import styled from "styled-components";

import { getLastCategory } from "@/utils/string";

import Gap from "@/components/common/Gap";
import StyledText from "@/components/common/StyledText";

import { colors } from "@/styles/assets";
import { PlaceInfo } from "@/types/map";
import StyledButton from "@/components/common/StyledButton";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { closeModal, openModal } from "@/store/modalSlice";
import { selectAuthState } from "@/store/authSlice";
import useSaveSelection from "@/hooks/map/useSaveSelection";
import { showToast } from "@/store/toastSlice";

interface Props {
  place: PlaceInfo;
}

const PlaceInfoCard = ({ place }: Props) => {
  const { userInfo } = useAppSelector(selectAuthState);
  const userId = userInfo.id;
  const dispatch = useAppDispatch();
  const handleSuccess = () => {
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
        </>
      )
    );
  };
  const handleError = (error: any) => {
    dispatch(showToast(error.response.data.message));
  };

  const { mutate: saveSelection } = useSaveSelection({
    userId,
    place,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleSelectClick = () => {
    dispatch(closeModal());
    saveSelection({ userId, place });
  };

  return (
    <CardWrapper>
      <StyledText text="미리보기" />
      <StyledText
        text="(카카오 맵의 사진을 클릭한 후 왼쪽 또는 오른쪽 영역을 클릭하여 이동할 수 있습니다.)"
        fontSize="xs"
        fontColor="gray130"
        textAlign="center"
      />
      <Gap side={5} />
      <IframeWrapper>
        <Iframe src={place.place_url} allowFullScreen />
      </IframeWrapper>
      <Gap side={5} />
      <StyledText
        text={place.place_name}
        fontWeight="bold"
        fontColor="black47"
        numberOfLines={1}
      />
      <Gap side={5} />
      <StyledText
        text={getLastCategory(place.category_name)}
        fontSize="xs"
        fontColor="black47"
        fontWeight="regular"
        numberOfLines={1}
      />
      <Gap side={5} />
      <StyledText
        text={place.road_address_name}
        fontSize="xs"
        fontColor="gray130"
        fontWeight="regular"
        numberOfLines={1}
      />
      <StyledText
        text={place.phone ? place.phone : "-"}
        fontSize="xs"
        fontColor="gray130"
        numberOfLines={1}
      />
      <Gap side={5} />
      {place.place_url && (
        <Link href={place.place_url} target="_blank" rel="noopener noreferrer">
          <StyledText
            text="카카오 맵에서 자세히 보기"
            fontSize="xs"
            fontColor="pointColor"
            fontWeight="bold"
            numberOfLines={1}
          />
        </Link>
      )}
      <Gap side={10} />
      <StyledButton
        buttonType="primary"
        text="선택하기"
        onClick={handleSelectClick}
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

const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${colors.pointColor};

  &:hover {
    text-decoration: underline;
  }
`;

const IframeWrapper = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid ${colors.grayDisabledColor};
  cursor: pointer;
  :hover {
    border: 1px solid ${colors.black47};
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
`;
