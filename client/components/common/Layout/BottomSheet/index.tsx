import { FaTimes } from "react-icons/fa";
import { Dispatch, ReactNode, SetStateAction } from "react";

import * as S from "./styles";

interface Props {
  isShowing: boolean;
  setIsShowing: Dispatch<SetStateAction<boolean>>;
  toggleBottomSheet: () => void;
  children: ReactNode;
}

const BottomSheet = ({
  isShowing,
  setIsShowing,
  toggleBottomSheet,
  children,
}: Props) => {
  return (
    <>
      <S.BottomSheetBackdrop
        isShowing={isShowing}
        onClick={toggleBottomSheet}
      />
      <S.BottomSheet>
        <S.BottomSheetCloseButton onClick={toggleBottomSheet}>
          <FaTimes />
        </S.BottomSheetCloseButton>
        {children}
      </S.BottomSheet>
    </>
  );
};

export default BottomSheet;
