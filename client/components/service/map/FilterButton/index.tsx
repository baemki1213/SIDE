import { Dispatch, SetStateAction, useState } from "react";
import { FaFilter } from "react-icons/fa";

import * as S from "./styles";
import BottomSheet from "@/components/common/Layout/BottomSheet";
import RadiusFilter from "../Filters/RadiusFilter";

interface Props {
  radius: number;
  setRadius: Dispatch<SetStateAction<number>>;
}

const FilterButton = ({ radius, setRadius }: Props) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  return (
    <>
      <S.FilterContainer>
        <S.FilterButton onClick={toggleBottomSheet}>
          <FaFilter />
        </S.FilterButton>
        {isBottomSheetOpen && (
          <BottomSheet
            isShowing={isBottomSheetOpen}
            setIsShowing={setIsBottomSheetOpen}
            toggleBottomSheet={toggleBottomSheet}
          >
            <RadiusFilter radius={radius} setRadius={setRadius} />
          </BottomSheet>
        )}
      </S.FilterContainer>
    </>
  );
};

export default FilterButton;
