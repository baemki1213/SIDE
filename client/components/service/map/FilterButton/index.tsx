import { Dispatch, SetStateAction, useState } from "react";
import { FaFilter } from "react-icons/fa";

import * as S from "./styles";
import BottomSheet from "@/components/common/Layout/BottomSheet";
import QueryFilter from "../Filters/QueryFilter";
import RadiusFilter from "../Filters/RadiusFilter";
import CategoryFilter from "../Filters/CategoryFilter";

import { FilterInfo } from "@/types/map";

interface Props {
  filterInfo: FilterInfo;
  setFilterInfo: Dispatch<SetStateAction<FilterInfo>>;
}

const FilterButton = ({ filterInfo, setFilterInfo }: Props) => {
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
            <QueryFilter
              filterInfo={filterInfo}
              setFilterInfo={setFilterInfo}
            />
            <RadiusFilter
              filterInfo={filterInfo}
              setFilterInfo={setFilterInfo}
            />
            <CategoryFilter
              filterInfo={filterInfo}
              setFilterInfo={setFilterInfo}
            />
          </BottomSheet>
        )}
      </S.FilterContainer>
    </>
  );
};

export default FilterButton;
