import { Dispatch, SetStateAction } from "react";

import * as S from "./styles";
import StyledText from "@/components/common/StyledText";
import StyledButton from "@/components/common/StyledButton";

import { FilterInfo } from "@/types/map";

interface Props {
  filterInfo: FilterInfo;
  setFilterInfo: Dispatch<SetStateAction<FilterInfo>>;
}

const CategoryOptionsMap: { label: string; value: string }[] = [
  { label: "전체", value: "TOTAL" },
  { label: "카페", value: "CE7" },
  { label: "음식점", value: "FD6" },
  { label: "관광명소", value: "AT4" },
  { label: "숙박", value: "AD5" },
];

const CategoryFilter = ({ filterInfo, setFilterInfo }: Props) => {
  const handleCategoryButtonClick = (category: string) => {
    setFilterInfo(prev => ({ ...prev, category }));
  };

  return (
    <S.FilterContainer>
      <StyledText text="카테고리" fontColor="black47" fontWeight="semiBold" />
      <S.FilterWrapper>
        {CategoryOptionsMap.map((categoryOption, index) => (
          <StyledButton
            key={index}
            text={categoryOption.label || "무작위"}
            width="80px"
            size="small"
            borderRadius="25px"
            onClick={() => handleCategoryButtonClick(categoryOption.value)}
            buttonType={
              filterInfo.category === categoryOption.value
                ? "primary"
                : "secondary"
            }
            opacity={filterInfo.category === categoryOption.value ? 1 : 0.7}
          />
        ))}
      </S.FilterWrapper>
    </S.FilterContainer>
  );
};

export default CategoryFilter;
