import { Dispatch, ReactNode, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";

import { colors } from "@/styles/assets";

import {
  backdropRecipe,
  bottomSheet,
  closeButton,
  contentWrapper,
} from "./styles.css";

interface BottomSheetProps {
  isShowing: boolean;
  setIsShowing: Dispatch<SetStateAction<boolean>>;

  children: ReactNode;
  className?: string;
}

const BottomSheet = ({
  isShowing,
  setIsShowing,
  children,
  className,
}: BottomSheetProps) => {
  const handleBottomSheetClick = () => {
    setIsShowing(!isShowing);
  };
  return (
    <>
      <div
        className={backdropRecipe({ isShowing })}
        onClick={handleBottomSheetClick}
      />
      <div className={`${bottomSheet} ${className || ""}`}>
        <button className={closeButton} onClick={handleBottomSheetClick}>
          <FaTimes color={colors.black47} />
        </button>
        <div className={contentWrapper}>{children}</div>
      </div>
    </>
  );
};

export default BottomSheet;
