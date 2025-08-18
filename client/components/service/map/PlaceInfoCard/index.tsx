import { useCallback } from "react";

import useSaveSelection from "@/hooks/map/useSaveSelection";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";

import Gap from "@/components/common/Gap";
import StyledButton from "@/components/common/StyledButton";
import Text from "@/components/common/Text";

import { selectAuthState } from "@/store/authSlice";
import { openModal } from "@/store/modalSlice";
import { showToast } from "@/store/toastSlice";
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
          <Text className="text-black-47 font-semibold">
            ✅ 탁월한 선택입니다!
          </Text>
          <Text className="text-black-47 font-semibold">
            선택한 장소들은 나의 기록에서 확인할 수 있어요!
          </Text>
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
    <div className="min-h-[200px] border border-point rounded-[10px] p-[20px] flex flex-col items-center justify-center">
      <PlaceInfoContent place={place} />
      <Gap side={10} />
      <StyledButton
        buttonType="primary"
        text="선택하기"
        onClick={(e) => handleSelectClick(e, place)}
        size="medium"
      />
    </div>
  );
};

export default PlaceInfoCard;
